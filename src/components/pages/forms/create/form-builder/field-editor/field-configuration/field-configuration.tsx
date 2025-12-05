'use client'

import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import Input from '@/components/ui/input/input'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from './field-configuration.module.scss'
import { useFormBuilder } from '../../context/form-builder-context'

export default function FieldConfiguration(): JSX.Element | null {
  const { selectedStep, selectedFieldId, updateField } = useFormBuilder()

  if (!selectedStep || !selectedFieldId) {
    return null
  }

  const field = selectedStep.fields.find((f) => f.id === selectedFieldId)
  if (!field) {
    return null
  }
  return (
    <div className={styles.fieldConfiguration}>
      <Heading level={3} size={3} className={styles.fieldConfigurationTitle}>
        Field Configuration
      </Heading>

      <div className={styles.fieldConfigurationForm}>
        <Input
          label="Label"
          value={field.label}
          onChange={(e) =>
            updateField(selectedStep.id, field.id, { label: e.target.value })
          }
        />

        {(field.type === 'input' || field.type === 'textarea') && (
          <Input
            label="Placeholder"
            value={field.placeholder || ''}
            onChange={(e) =>
              updateField(selectedStep.id, field.id, {
                placeholder: e.target.value,
              })
            }
          />
        )}

        {(field.type === 'radio' ||
          field.type === 'checkbox' ||
          field.type === 'select') && (
          <div>
            <Text size={3} className={styles.optionsLabel}>
              {field.type === 'radio'
                ? 'Answer Options:'
                : field.type === 'checkbox'
                ? 'Checkbox Options:'
                : 'Select Options:'}
            </Text>
            <div className={styles.radioOptionsList}>
              {field.options?.map((option: string, index: number) => (
                <div key={index} className={styles.radioOptionItem}>
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])]
                      newOptions[index] = e.target.value
                      updateField(selectedStep.id, field.id, {
                        options: newOptions,
                      })
                    }}
                    placeholder={
                      field.type === 'radio'
                        ? `Answer ${index + 1}`
                        : `Option ${index + 1}`
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newOptions = field.options?.filter((_, i) => i !== index) || []
                      updateField(selectedStep.id, field.id, {
                        options: newOptions,
                      })
                    }}
                    className={styles.removeOptionButton}
                    disabled={(field.options?.length || 0) <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <ButtonFilled
                type="button"
                onClick={() => {
                  const optionLabel =
                    field.type === 'radio'
                      ? `Answer ${(field.options?.length || 0) + 1}`
                      : `Option ${(field.options?.length || 0) + 1}`
                  const newOptions = [...(field.options || []), optionLabel]
                  updateField(selectedStep.id, field.id, {
                    options: newOptions,
                  })
                }}
                color="secondary"
                className={styles.addOptionButton}
              >
                {field.type === 'radio' ? '+ Add Answer' : '+ Add Option'}
              </ButtonFilled>
            </div>
          </div>
        )}

        <label className={styles.requiredCheckbox}>
          <input
            type="checkbox"
            checked={field.required || false}
            onChange={(e) =>
              updateField(selectedStep.id, field.id, {
                required: e.target.checked,
              })
            }
          />
          <Text size={3}>Required field</Text>
        </label>
      </div>
    </div>
  )
}

