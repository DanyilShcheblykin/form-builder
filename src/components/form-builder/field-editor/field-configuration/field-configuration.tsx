'use client'

import { Heading } from '../../../typography/heading/heading'
import { Text } from '../../../typography/text/text'
import Input from '../../../ui/input/input'
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
              Options (one per line):
            </Text>
            <textarea
              value={field.options?.join('\n') || ''}
              onChange={(e) =>
                updateField(selectedStep.id, field.id, {
                  options: e.target.value
                    .split('\n')
                    .filter((opt) => opt.trim() !== ''),
                })
              }
              className={styles.optionsTextarea}
              placeholder="Option 1&#10;Option 2&#10;Option 3"
            />
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

