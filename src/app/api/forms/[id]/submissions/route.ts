import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { FormSubmission } from '@/types/database'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: formId } = params
    const body = await request.json()
    const { submission_data } = body

    if (!submission_data) {
      return NextResponse.json(
        {
          success: false,
          message: 'submission_data is required',
        },
        { status: 400 }
      )
    }

    // Verify form exists
    const formCheck = await sql`
      SELECT id FROM forms WHERE id = ${formId}
    `

    if (formCheck.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form not found',
        },
        { status: 404 }
      )
    }

    const submissionId = `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const submissionDataJson = JSON.stringify(submission_data)
    const result = await sql`
      INSERT INTO form_submissions (id, form_id, submission_data, submitted_at)
      VALUES (${submissionId}, ${formId}, ${submissionDataJson}::jsonb, CURRENT_TIMESTAMP)
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: 'Form submission saved successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving form submission:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to save form submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: formId } = params

    const submissions = await sql`
      SELECT * FROM form_submissions 
      WHERE form_id = ${formId}
      ORDER BY submitted_at DESC
    ` as FormSubmission[]

    return NextResponse.json(
      {
        success: true,
        data: submissions,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching form submissions:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch form submissions',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

