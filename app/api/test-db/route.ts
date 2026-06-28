import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    console.log('🔍 Testing database connection...');
    const result = await query('SELECT NOW() as time, PostGIS_Version() as postgis');
    return NextResponse.json({ 
      success: true, 
      time: result.rows[0].time,
      postgis: result.rows[0].postgis,
      message: '✅ Database connection successful!' 
    });
  } catch (error: any) {
    console.error('❌ DB Test Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
