'use client'

import { FormField } from '@/types/form-builder'
import Input from '@/components/ui/input/input'

interface PreviewInputFieldProps {
  field: FormField
  value: any
  onChange: (value: any) => void
  disabled?: boolean
}

export default function PreviewInputField({
  field,
  value,
  onChange,
  disabled = false,
}: PreviewInputFieldProps) {
  return (
    <Input
      key={field.id}
      label={field.label}
      placeholder={field.placeholder}
      required={field.required}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  )
}

