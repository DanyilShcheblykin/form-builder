/**
 * Common validation types and interfaces
 */

export interface ValidationResult {
  valid: boolean
  errors: string[]
  data?: any
}

