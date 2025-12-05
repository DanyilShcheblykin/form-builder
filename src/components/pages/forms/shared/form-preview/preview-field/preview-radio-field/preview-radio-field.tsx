'use client'

import { FormField } from '@/types/form-builder'
import { Radio } from '@/components/ui/radio/radio'
import FieldLabel from '../field-label/field-label'
import styles from '../preview-field.module.scss'

interface PreviewRadioFieldProps {
  field: FormField
  value: any
  onChange: (value: any) => void
  disabled?: boolean
}

export default function PreviewRadioField({
  field,
  value,
  onChange,
  disabled = false,
}: PreviewRadioFieldProps) {
  return (
    <div key={field.id}>
      <div className={styles.optionsGroup}>
        <FieldLabel label={field.label} required={field.required} />
      </div>
      <div className={styles.optionsList}>
        {field.options?.map((option: string, index: number) => (
          <Radio
            key={index}
            name={field.id}
            label={option}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

