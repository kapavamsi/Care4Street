import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, issueType, lat, lng, description, imageUrl } = body;

    console.log('📝 Received report submission:', { issueType, lat, lng, description });

    // Validate required fields
    if (!issueType || !lat || !lng) {
      return NextResponse.json(
        { error: 'Missing required fields: issueType, lat, lng' },
        { status: 400 }
      );
    }

    // Convert lat/lng to PostGIS geography point
    const location = `POINT(${lng} ${lat})`;

    // Insert report
    const result = await query(
      `INSERT INTO reports (user_id, issue_type, location, description, image_url)
       VALUES ($1, $2, ST_GeogFromText($3), $4, $5)
       RETURNING id, created_at`,
      [userId || 'anonymous', issueType, location, description || '', imageUrl || '']
    );

    // Log to audit trail
    await query(
      `INSERT INTO audit_log (report_id, action, new_status, changed_by)
       VALUES ($1, $2, $3, $4)`,
      [result.rows[0].id, 'create', 'submitted', userId || 'anonymous']
    );

    console.log('✅ Report inserted with ID:', result.rows[0].id);

    return NextResponse.json({
      success: true,
      reportId: result.rows[0].id,
      createdAt: result.rows[0].created_at
    });
  } catch (error) {
    console.error('❌ Error submitting report:', error);
    return NextResponse.json(
      { error: 'Failed to submit report: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('📊 Fetching all reports...');
    const result = await query(
      `SELECT id, issue_type, description, status, upvote_count,
              ST_X(location::geometry) as lng,
              ST_Y(location::geometry) as lat,
              image_url, created_at
       FROM reports
       ORDER BY created_at DESC
       LIMIT 50`
    );
    console.log('✅ Found', result.rows.length, 'reports');
    return NextResponse.json({ reports: result.rows });
  } catch (error) {
    console.error('❌ Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}
