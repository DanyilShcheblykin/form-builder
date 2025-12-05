'use client'

import { FormField } from '@/types/form-builder'
import Select from '@/components/ui/select/select'

interface PreviewSelectFieldProps {
  field: FormField
  value: any
  onChange: (value: any) => void
  disabled?: boolean
}

export default function PreviewSelectField({
  field,
  value,
  onChange,
  disabled = false,
}: PreviewSelectFieldProps) {
  const selectOptions = field.options?.map((option: string) => ({ label: option, value: option })) || []
  const selectedOption = value ? selectOptions.find((opt) => opt.value === value) : null

  return (
    <Select
      key={field.id}
      label={field.label}
      onChange={(selectedOption: any) => {
        onChange(selectedOption ? selectedOption.value : null)
      }}
      options={selectOptions}
      value={selectedOption}
      placeholder="Select an option"
      isDisabled={disabled}
      required={field.required}
    />
  )
}

