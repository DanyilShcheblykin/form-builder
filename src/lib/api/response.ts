import { NextResponse } from 'next/server'

/**
 * Standard API response helpers
 * Use these to maintain consistent response format across all API routes
 */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status }
  )
}

export function errorResponse(
  message: string,
  status: number = 500,
  error?: string
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(error && { error }),
    },
    { status }
  )
}

export function notFoundResponse(message: string = 'Resource not found'): NextResponse<ApiResponse> {
  return errorResponse(message, 404)
}

export function badRequestResponse(message: string): NextResponse<ApiResponse> {
  return errorResponse(message, 400)
}

export function serverErrorResponse(
  message: string = 'Internal server error',
  error?: unknown
): NextResponse<ApiResponse> {
  const errorMessage = error instanceof Error ? error.message : undefined
  return errorResponse(message, 500, errorMessage)
}

