import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { SavedForm } from '@/types/database'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await sql<SavedForm>`
      SELECT * FROM forms WHERE id = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: result[0],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching form:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch form',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, description, form_data } = body

    let result
    if (form_data) {
      const formDataJson = JSON.stringify(form_data)
      result = await sql`
        UPDATE forms 
        SET 
          name = ${name || null},
          description = ${description || null},
          form_data = ${formDataJson}::jsonb,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `
    } else {
      result = await sql`
        UPDATE forms 
        SET 
          name = ${name || null},
          description = ${description || null},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `
    }

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: 'Form updated successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating form:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update form',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await sql`
      DELETE FROM forms WHERE id = ${id} RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Form deleted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting form:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete form',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

