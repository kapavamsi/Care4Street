import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId, issueType, lat, lng, description, imageUrl,
      city = 'Bangalore', 
      country = 'India', 
      cityCommittee = 'BBMP' 
    } = body;

    if (!issueType || !lat || !lng) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const location = `POINT(${lng} ${lat})`;

    const result = await query(
      `INSERT INTO reports (
        user_id, issue_type, location, description, image_url,
        city, country, city_committee
       )
       VALUES ($1, $2, ST_GeogFromText($3), $4, $5, $6, $7, $8)
       RETURNING id, created_at`,
      [userId || 'anonymous', issueType, location, description || '', imageUrl || '', city, country, cityCommittee]
    );

    await query(
      `INSERT INTO audit_log (report_id, action, new_status, changed_by)
       VALUES ($1, $2, $3, $4)`,
      [result.rows[0].id, 'create', 'submitted', userId || 'anonymous']
    );

    return NextResponse.json({
      success: true,
      reportId: result.rows[0].id,
      createdAt: result.rows[0].created_at
    });
  } catch (error) {
    console.error('Error submitting report:', error);
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city') || null;
    
    let queryText = `
      SELECT id, issue_type, description, status, upvote_count,
             ST_X(location::geometry) as lng,
             ST_Y(location::geometry) as lat,
             image_url, created_at,
             city, country, city_committee
      FROM reports
    `;
    
    const params: any[] = [];
    
    if (city) {
      queryText += ` WHERE city = $1`;
      params.push(city);
    }
    
    queryText += ` ORDER BY created_at DESC LIMIT 50`;
    
    const result = await query(queryText, params);
    return NextResponse.json({ reports: result.rows });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}
