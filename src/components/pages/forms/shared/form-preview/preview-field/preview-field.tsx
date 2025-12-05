'use client'

import { FormField } from '@/types/form-builder'
import { Text } from '@/components/typography/text/text'
import Input from '@/components/ui/input/input'
import { Checkbox } from '@/components/ui/checkbox/checkbox'
import { Radio } from '@/components/ui/radio/radio'
import styles from './preview-field.module.scss'
import Select from '@/components/ui/select/select'

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
            disabled={disabled}
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
                  disabled={disabled}
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
          disabled={disabled}
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
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )

    case 'select':
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

    default:
      return null
  }
}

