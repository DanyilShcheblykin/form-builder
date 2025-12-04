import { NextRequest, NextResponse } from 'next/server'
import { FormBuilderData } from '@/types/form-builder'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const forms = await prisma.form.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })

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

    const form = await prisma.form.create({
      data: {
        name,
        description: description || null,
        form_data: form_data as any,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: form,
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

