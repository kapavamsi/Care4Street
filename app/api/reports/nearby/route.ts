import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    const radius = parseInt(searchParams.get('radius') || '5000');

    console.log('🔍 Fetching nearby reports:', { lat, lng, radius });

    if (lat === 0 || lng === 0) {
      return NextResponse.json({ reports: [] });
    }

    const result = await query(
      `SELECT id, issue_type, description, status, upvote_count,
              ST_X(location::geometry) as lng,
              ST_Y(location::geometry) as lat,
              ROUND(ST_Distance(
                location,
                ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
              )) as distance_meters,
              image_url, created_at
       FROM reports
       WHERE ST_DWithin(
         location,
         ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
         $3
       )
       AND status != 'resolved'
       ORDER BY distance_meters ASC
       LIMIT 50`,
      [lng, lat, radius]
    );

    console.log('✅ Found', result.rows.length, 'nearby reports');
    return NextResponse.json({ reports: result.rows });
  } catch (error) {
    console.error('❌ Error fetching nearby reports:', error);
    return NextResponse.json({ reports: [] });
  }
}
