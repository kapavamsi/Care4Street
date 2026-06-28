import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, status, userId } = body;

    if (!reportId || !status) {
      return NextResponse.json(
        { error: 'Missing reportId or status' },
        { status: 400 }
      );
    }

    const validStatuses = ['submitted', 'assigned', 'in_progress', 'resolved'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Get old status
    const oldStatus = await query(
      `SELECT status FROM reports WHERE id = $1`,
      [reportId]
    );

    // Update status
    const result = await query(
      `UPDATE reports SET status = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [status, reportId]
    );

    // Log to audit
    await query(
      `INSERT INTO audit_log (report_id, action, old_status, new_status, changed_by)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        reportId,
        'status_update',
        oldStatus.rows[0]?.status || 'unknown',
        status,
        userId || 'bbmp_official'
      ]
    );

    return NextResponse.json({
      success: true,
      report: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error updating status:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}
