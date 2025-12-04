import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { FormBuilderData } from '@/types/form-builder'
import { SavedForm } from '@/types/database'

const sql = neon(process.env.DATABASE_URL!)

// Initialize database tables if they don't exist
async function initializeTables() {
  try {
    // Create forms table
    await sql`
      CREATE TABLE IF NOT EXISTS forms (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        form_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create form_submissions table
    await sql`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id TEXT PRIMARY KEY,
        form_id TEXT NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
        submission_data JSONB NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
  } catch (error) {
    console.error('Error initializing tables:', error)
  }
}

export async function GET() {
  try {
    await initializeTables()

    const forms = await sql`
      SELECT * FROM forms 
      ORDER BY created_at DESC
    ` as SavedForm[]

    return NextResponse.json(
      {
        success: true,
        data: forms,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch forms',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeTables()

    const body = await request.json()
    const { name, description, form_data }: { name: string; description?: string; form_data: FormBuilderData } = body

    if (!name || !form_data) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and form_data are required',
        },
        { status: 400 }
      )
    }

    const formId = `form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const formDataJson = JSON.stringify(form_data)
    const result = await sql`
      INSERT INTO forms (id, name, description, form_data, created_at, updated_at)
      VALUES (${formId}, ${name}, ${description || null}, ${formDataJson}::jsonb, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: 'Form saved successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving form:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to save form',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

