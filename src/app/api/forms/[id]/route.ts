import { NextRequest } from 'next/server'
import { successResponse, notFoundResponse, badRequestResponse } from '@/lib/api/response'
import { handleApiError } from '@/lib/api/error-handler'
import { formService } from '@/lib/services/form-service'
import { formValidator } from '@/lib/validators'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const form = await formService.getById(id)

    if (!form) {
      return notFoundResponse('Form not found')
    }

    return successResponse(form)
  } catch (error) {
    return handleApiError(error, 'fetch form')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    const formExists = await formService.exists(id)
    if (!formExists) {
      return notFoundResponse('Form not found')
    }

    const validation = formValidator.validateUpdate(body)
    if (!validation.valid) {
      return badRequestResponse(validation.errors.join(', '))
    }

    const { name, description, form_data } = validation.data!

    const form = await formService.update(id, { name, description, form_data })

    return successResponse(form, 'Form updated successfully')
  } catch (error) {
    return handleApiError(error, 'update form')
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const formExists = await formService.exists(id)
    if (!formExists) {
      return notFoundResponse('Form not found')
    }

    await formService.delete(id)

    return successResponse(null, 'Form deleted successfully')
  } catch (error) {
    return handleApiError(error, 'delete form')
  }
}
