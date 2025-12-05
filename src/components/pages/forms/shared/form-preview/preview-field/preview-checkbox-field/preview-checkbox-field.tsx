'use client'

import { FormField } from '@/types/form-builder'
import { Checkbox } from '@/components/ui/checkbox/checkbox'
import FieldLabel from '../field-label/field-label'
import styles from '../preview-field.module.scss'

interface PreviewCheckboxFieldProps {
  field: FormField
  value: any
  onChange: (value: any) => void
  disabled?: boolean
}

export default function PreviewCheckboxField({
  field,
  value,
  onChange,
  disabled = false,
}: PreviewCheckboxFieldProps) {
  // Checkbox group (multiple options)
  if (field.options && field.options.length > 0) {
    return (
      <div key={field.id}>
        <div className={styles.optionsGroup}>
          <FieldLabel label={field.label} required={field.required} />
        </div>
        <div className={styles.optionsList}>
          {field.options.map((option: string, index: number) => (
            <Checkbox
              key={index}
              label={option}
              checked={value?.includes(option) || false}
              onChange={(e) => {
                const currentValues = value || []
                const newValues = e.target.checked
                  ? [...currentValues, option]
                  : currentValues.filter((v: string) => v !== option)
                onChange(newValues)
              }}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    )
  }

  // Single checkbox
  return (
    <Checkbox
      key={field.id}
      label={field.label}
      checked={value || false}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
    />
  )
}

