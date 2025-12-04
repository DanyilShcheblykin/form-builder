import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const form = await prisma.form.findUnique({
      where: { id },
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

    return NextResponse.json(
      {
        success: true,
        data: form,
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

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description || null
    if (form_data !== undefined) updateData.form_data = form_data

    const form = await prisma.form.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(
      {
        success: true,
        data: form,
        message: 'Form updated successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update does not exist')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form not found',
        },
        { status: 404 }
      )
    }

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

    await prisma.form.delete({
      where: { id },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Form deleted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form not found',
        },
        { status: 404 }
      )
    }

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

