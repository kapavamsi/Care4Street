import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, userId } = body;

    if (!reportId || !userId) {
      return NextResponse.json(
        { error: 'Missing reportId or userId' },
        { status: 400 }
      );
    }

    // Check if already upvoted
    const existing = await query(
      `SELECT * FROM upvotes WHERE report_id = $1 AND user_id = $2`,
      [reportId, userId]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'Already upvoted this report' },
        { status: 409 }
      );
    }

    // Insert upvote
    await query(
      `INSERT INTO upvotes (report_id, user_id) VALUES ($1, $2)`,
      [reportId, userId]
    );

    // Increment upvote count
    const result = await query(
      `UPDATE reports SET upvote_count = upvote_count + 1 
       WHERE id = $1 
       RETURNING upvote_count`,
      [reportId]
    );

    return NextResponse.json({
      success: true,
      upvoteCount: result.rows[0].upvote_count
    });
  } catch (error) {
    console.error('❌ Error upvoting:', error);
    return NextResponse.json(
      { error: 'Failed to upvote' },
      { status: 500 }
    );
  }
}
