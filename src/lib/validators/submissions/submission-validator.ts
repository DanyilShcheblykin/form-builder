import { z } from 'zod'
import { ValidationResult } from '../types'

/**
 * Zod schemas for submission validation
 */

// Submission schema
export const submissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  submission_data: z.unknown().refine((data: unknown) => data !== undefined && data !== null, {
    message: 'Submission data is required',
  }),
})

// Type inference from schema
export type SubmissionInput = z.infer<typeof submissionSchema>

/**
 * Submission validator using Zod
 */
export const submissionValidator = {
  /**
   * Validate submission data
   */
  validate(data: unknown): ValidationResult {
    try {
      const validatedData = submissionSchema.parse(data)
      return {
        valid: true,
        errors: [],
        data: validatedData,
      }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: (error as z.ZodError).errors.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`),
        }
      }
      return {
        valid: false,
        errors: ['Invalid submission data'],
      }
    }
  },
}

