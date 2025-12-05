'use client'

import { FormField } from '@/types/form-builder'
import PreviewInputField from './preview-input-field/preview-input-field'
import PreviewTextareaField from './preview-textarea-field/preview-textarea-field'
import PreviewCheckboxField from './preview-checkbox-field/preview-checkbox-field'
import PreviewRadioField from './preview-radio-field/preview-radio-field'
import PreviewSelectField from './preview-select-field/preview-select-field'

interface PreviewFieldProps {
  field: FormField
  value: any
  onChange: (value: any) => void
  disabled?: boolean
}

export default function PreviewField({ field, value, onChange, disabled = false }: PreviewFieldProps) {
  switch (field.type) {
    case 'input':
      return (
        <PreviewInputField
          field={field}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'textarea':
      return (
        <PreviewTextareaField
          field={field}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'checkbox':
      return (
        <PreviewCheckboxField
          field={field}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'radio':
      return (
        <PreviewRadioField
          field={field}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'select':
      return (
        <PreviewSelectField
          field={field}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )

    default:
      return null
  }
}

