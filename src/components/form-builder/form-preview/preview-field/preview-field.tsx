'use client'

import { FormField } from '../../../../types/form-builder'
import { Text } from '../../../typography/text/text'
import Input from '../../../ui/input/input'
import { Checkbox } from '../../../ui/checkbox/checkbox'
import { Radio } from '../../../ui/radio/radio'
import styles from './preview-field.module.scss'

interface PreviewFieldProps {
  field: FormField
  value: any
  onChange: (value: any) => void
}

export default function PreviewField({ field, value, onChange }: PreviewFieldProps) {
  switch (field.type) {
    case 'input':
      return (
        <Input
          key={field.id}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )

    case 'textarea':
      return (
        <div key={field.id}>
          <label className={styles.fieldLabel}>
            <Text size={3} bold>
              {field.label}
              {field.required && <span className={styles.requiredIndicator}> *</span>}
            </Text>
          </label>
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={styles.textarea}
          />
        </div>
      )

    case 'checkbox':
      if (field.options && field.options.length > 0) {
        return (
          <div key={field.id}>
            <div className={styles.optionsGroup}>
              <Text size={3} bold>
                {field.label}
                {field.required && <span className={styles.requiredIndicator}> *</span>}
              </Text>
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
                />
              ))}
            </div>
          </div>
        )
      }
      return (
        <Checkbox
          key={field.id}
          label={field.label}
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
        />
      )

    case 'radio':
      return (
        <div key={field.id}>
          <div className={styles.optionsGroup}>
            <Text size={3} bold>
              {field.label}
              {field.required && <span className={styles.requiredIndicator}> *</span>}
            </Text>
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
              />
            ))}
          </div>
        </div>
      )

    case 'select':
      return (
        <div key={field.id}>
          <label className={styles.fieldLabel}>
            <Text size={3} bold>
              {field.label}
              {field.required && <span className={styles.requiredIndicator}> *</span>}
            </Text>
          </label>
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className={styles.select}
          >
            <option value="">Select an option</option>
            {field.options?.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )

    default:
      return null
  }
}

