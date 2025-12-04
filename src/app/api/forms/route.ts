import { NextRequest } from 'next/server'
import { successResponse, badRequestResponse } from '@/lib/api/response'
import { handleApiError } from '@/lib/api/error-handler'
import { formService } from '@/lib/services/form-service'
import { formValidator } from '@/lib/validators'

export async function GET() {
  try {
    const forms = await formService.getAll()
    return successResponse(forms)
  } catch (error) {
    return handleApiError(error, 'fetch forms')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = formValidator.validateCreate(body)
    if (!validation.valid) {
      return badRequestResponse(validation.errors.join(', '))
    }

    const { name, description, form_data } = validation.data!

    const form = await formService.create({
      name,
      description,
      form_data,
    })

    return successResponse(form, 'Form saved successfully', 201)
  } catch (error) {
    return handleApiError(error, 'save form')
  }
}

