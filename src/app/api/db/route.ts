import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const DATABASE_URL = process.env.DATABASE_URL

    if (!DATABASE_URL) {
      return NextResponse.json(
        {
          success: false,
          message: 'DATABASE_URL environment variable is not set',
        },
        { status: 500 }
      )
    }

    // Create Neon database connection
    const sql = neon(DATABASE_URL)

    // Test connection with a simple query
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully connected to Neon database',
        data: {
          connected: true,
          timestamp: result[0]?.current_time,
          version: result[0]?.pg_version,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to database',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
