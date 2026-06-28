import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Aurora PostgreSQL
  }
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('📊 Query executed:', { 
      text: text.substring(0, 50), 
      duration, 
      rows: result.rowCount 
    });
    return result;
  } catch (error) {
    console.error('❌ Database error:', error);
    throw error;
  }
}

export default pool;
