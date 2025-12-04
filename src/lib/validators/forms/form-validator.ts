import { z } from 'zod'
import { ValidationResult } from '../types'

/**
 * Zod schemas for form validation
 * No need to write validation manually - Zod does it automatically!
 */

// Field type schema
const fieldTypeSchema = z.enum(['input', 'textarea', 'checkbox', 'radio', 'select'])

// Form field schema
const formFieldSchema = z.object({
  id: z.string().min(1, 'Field ID is required'),
  type: fieldTypeSchema,
  label: z.string().min(1, 'Field label is required'),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  defaultValue: z.union([z.string(), z.boolean()]).optional(),
})

// Form step schema
const formStepSchema = z.object({
  id: z.string().min(1, 'Step ID is required'),
  title: z.string().min(1, 'Step title is required'),
  icon: z.string().min(1, 'Step icon is required'),
  fields: z.array(formFieldSchema).min(1, 'Step must have at least one field'),
})

// Form builder data schema
const formBuilderDataSchema = z.object({
  steps: z.array(formStepSchema).min(1, 'Form must have at least one step'),
})

// Create form schema
export const createFormSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().optional().nullable(),
  form_data: formBuilderDataSchema,
})

// Update form schema (all fields optional)
export const updateFormSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty').trim().optional(),
  description: z.string().optional().nullable(),
  form_data: formBuilderDataSchema.optional(),
})

// Type inference from schemas
export type CreateFormInput = z.infer<typeof createFormSchema>
export type UpdateFormInput = z.infer<typeof updateFormSchema>

/**
 * Form validator using Zod
 * Automatically validates and returns typed data
 */
export const formValidator = {
  /**
   * Validate form creation data
   */
  validateCreate(data: unknown): ValidationResult {
    try {
      const validatedData = createFormSchema.parse(data)
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
        errors: ['Invalid form data'],
      }
    }
  },

  /**
   * Validate form update data
   */
  validateUpdate(data: unknown): ValidationResult {
    try {
      const validatedData = updateFormSchema.parse(data)
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
        errors: ['Invalid form data'],
      }
    }
  },
}

