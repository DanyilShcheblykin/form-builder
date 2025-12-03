import { LucideIcon } from 'lucide-react'

export type FieldType = 'input' | 'textarea' | 'checkbox' | 'radio' | 'select'

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required?: boolean
  options?: string[] // For radio, checkbox groups, and select
  defaultValue?: string | boolean
}

export interface FormStep {
  id: string
  title: string
  icon: string // Icon name from lucide-react
  fields: FormField[]
}

export interface FormBuilderData {
  steps: FormStep[]
}

