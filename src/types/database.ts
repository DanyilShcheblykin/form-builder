import { FormBuilderData } from './form-builder'

export interface SavedForm {
  id: string
  name: string
  description?: string
  form_data: FormBuilderData
  created_at: string
  updated_at: string
}

export interface FormSubmission {
  id: string
  form_id: string
  name: string
  email: string
  submission_data: Record<string, any>
  submitted_at: string
}
