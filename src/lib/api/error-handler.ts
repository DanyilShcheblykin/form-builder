import { NextResponse } from 'next/server'
import { errorResponse, serverErrorResponse } from './response'

/**
 * Centralized error handling for API routes
 */

export function handleApiError(error: unknown, context: string): NextResponse {
  console.error(`Error in ${context}:`, error)

  // Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; message: string }
    
    if (prismaError.code === 'P2025') {
      // Record not found
      return errorResponse('Resource not found', 404)
    }
    
    if (prismaError.code === 'P2002') {
      // Unique constraint violation
      return errorResponse('Duplicate entry', 409)
    }
  }

  // Standard Error objects
  if (error instanceof Error) {
    if (error.message.includes('not found')) {
      return errorResponse(error.message, 404)
    }
    
    if (error.message.includes('Record to') && error.message.includes('does not exist')) {
      return errorResponse('Resource not found', 404)
    }
  }

  // Generic server error
  return serverErrorResponse(`Failed to ${context}`, error)
}

/**
 * Wrapper for API route handlers with automatic error handling
 */
export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>,
  context: string
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleApiError(error, context)
    }
  }
}

