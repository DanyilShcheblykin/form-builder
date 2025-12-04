import { NextRequest } from 'next/server'
import { successResponse, badRequestResponse, notFoundResponse } from '@/lib/api/response'
import { handleApiError } from '@/lib/api/error-handler'
import { formService } from '@/lib/services/form-service'
import { submissionService } from '@/lib/services/submission-service'
import { submissionValidator } from '@/lib/validators'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: formId } = params
    const body = await request.json()

    // Validate with Zod (automatically validates and types the data)
    const validation = submissionValidator.validate(body)
    if (!validation.valid) {
      return badRequestResponse(validation.errors.join(', '))
    }

    const formExists = await formService.exists(formId)
    if (!formExists) {
      return notFoundResponse('Form not found')
    }

    // Use validated data (already typed and validated by Zod)
    const { submission_data } = validation.data!

    // Create submission using service
    const submission = await submissionService.create({
      form_id: formId,
      submission_data,
    })

    return successResponse(submission, 'Form submission saved successfully', 201)
  } catch (error) {
    return handleApiError(error, 'save form submission')
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: formId } = params

    const formExists = await formService.exists(formId)
    if (!formExists) {
      return notFoundResponse('Form not found')
    }

    const submissions = await submissionService.getByFormId(formId)

    return successResponse(submissions)
  } catch (error) {
    return handleApiError(error, 'fetch form submissions')
  }
}

