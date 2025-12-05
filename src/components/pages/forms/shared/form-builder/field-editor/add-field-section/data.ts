import { FieldType } from '@/types/form-builder'

export const fieldTypes: { type: FieldType; label: string }[] = [
  { type: 'input', label: 'Text Input' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'radio', label: 'Radio Button' },
  { type: 'select', label: 'Select Dropdown' },
]

