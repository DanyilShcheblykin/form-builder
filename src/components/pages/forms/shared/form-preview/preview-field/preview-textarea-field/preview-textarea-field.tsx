'use client'

import { FormField } from '@/types/form-builder'
import FieldLabel from '../field-label/field-label'
import styles from '../preview-field.module.scss'

interface PreviewTextareaFieldProps {
  field: FormField
  value: any
  onChange: (value: any) => void
  disabled?: boolean
}

export default function PreviewTextareaField({
  field,
  value,
  onChange,
  disabled = false,
}: PreviewTextareaFieldProps) {
  return (
    <div key={field.id}>
      <label className={styles.fieldLabel}>
        <FieldLabel label={field.label} required={field.required} />
      </label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        disabled={disabled}
        className={styles.textarea}
      />
    </div>
  )
}

