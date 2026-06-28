'use client';

// S3 upload via presigned URL - S3 ONLY
export async function uploadToS3(file: File, userId: string): Promise<string> {
  try {
    console.log('📤 Requesting presigned URL from API...');
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ API error:', errorData);
      throw new Error(errorData.error || 'Failed to get upload URL');
    }

    const { uploadUrl, publicUrl } = await response.json();
    console.log('✅ Got presigned URL, uploading to S3...');

    // Upload directly to S3 using the presigned URL
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('❌ S3 upload failed:', uploadResponse.status, errorText);
      throw new Error(`S3 upload failed: ${uploadResponse.status}`);
    }

    console.log('✅ S3 upload successful:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('❌ S3 upload error:', error);
    throw error;
  }
}

// Main upload function - S3 only
export async function uploadImage(file: File, userId: string): Promise<string> {
  console.log('📤 Attempting S3 upload...');
  const s3Url = await uploadToS3(file, userId);
  console.log('✅ S3 upload successful:', s3Url);
  return s3Url;
}
