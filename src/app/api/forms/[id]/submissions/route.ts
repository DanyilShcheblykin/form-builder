import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const form = await prisma.form.findUnique({
      where: { id: formId },
    })

    if (!form) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form not found',
        },
        { status: 404 }
      )
    }

    const submission = await prisma.formSubmission.create({
      data: {
        form_id: formId,
        submission_data: submission_data as any,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: submission,
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

    const submissions = await prisma.formSubmission.findMany({
      where: {
        form_id: formId,
      },
      orderBy: {
        submitted_at: 'desc',
      },
    })

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

