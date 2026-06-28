import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

function getEnvValue(key: string): string | undefined {
  const envPath = path.join(process.cwd(), '.env.local');

  if (fs.existsSync(envPath)) {
    const fileContents = fs.readFileSync(envPath, 'utf8');
    const match = fileContents.match(new RegExp(`^${key}=(.+)$`, 'm'));
    if (match) {
      return match[1].trim().replace(/^['"]|['"]$/g, '');
    }
  }

  return process.env[key];
}

function getAwsConfig() {
  const accessKeyId = getEnvValue('AWS_ACCESS_KEY_ID') || process.env.AWS_ACCESS_KEY_ID || '';
  const secretAccessKey = getEnvValue('AWS_SECRET_ACCESS_KEY') || process.env.AWS_SECRET_ACCESS_KEY || '';
  const region = getEnvValue('AWS_REGION') || process.env.AWS_REGION || 'us-east-1';
  const bucketName = getEnvValue('AWS_S3_BUCKET') || process.env.AWS_S3_BUCKET || 'care4street-images';

  return { accessKeyId, secretAccessKey, region, bucketName };
}

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, userId } = await request.json();
    const { accessKeyId, secretAccessKey, region, bucketName } = getAwsConfig();

    console.log('📤 Upload request:', { fileName, fileType, userId });
    console.log('🔑 AWS Credentials Status:');
    console.log('  Active AWS_ACCESS_KEY_ID:', accessKeyId || 'undefined');
    console.log('  Secret Key:', secretAccessKey ? '✅ Present' : '❌ Missing');
    console.log('  Region:', region);
    console.log('  Bucket:', bucketName);

    if (!fileName || !fileType || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!accessKeyId || !secretAccessKey) {
      console.error('❌ AWS credentials not configured');
      return NextResponse.json(
        { error: 'AWS credentials not configured' },
        { status: 500 }
      );
    }

    if (!bucketName) {
      console.error('❌ S3 bucket not configured');
      return NextResponse.json(
        { error: 'S3 bucket not configured' },
        { status: 500 }
      );
    }

    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Generate unique key
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = fileName.split('.').pop() || 'jpg';
    const key = `reports/${userId}/${timestamp}-${random}.${extension}`;

    console.log('📤 Generating presigned URL for:', key);
    console.log('📤 Using bucket:', bucketName);
    console.log('📤 Using region:', region);

    // Generate presigned URL
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

    console.log('✅ Presigned URL generated successfully');
    console.log('📤 Public URL:', publicUrl);

    return NextResponse.json({
      uploadUrl,
      publicUrl,
      key,
    });
  } catch (error: any) {
    console.error('❌ Upload API error:', error);
    console.error('Error details:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Failed to generate upload URL: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}
