'use client'

import { Text } from '@/components/typography/text/text'
import Input from '@/components/ui/input/input'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from '../field-configuration.module.scss'
import { useFormBuilder } from '../../../context/form-builder-context'

export default function FieldOptionsEditor() {
  const { selectedStep, selectedFieldId, updateField } = useFormBuilder()

  if (!selectedStep || !selectedFieldId) {
    return null
  }

  const field = selectedStep.fields.find((f) => f.id === selectedFieldId)
  if (!field) {
    return null
  }

  // Only show options editor for radio, checkbox, and select fields
  if (field.type !== 'radio' && field.type !== 'checkbox' && field.type !== 'select') {
    return null
  }

  const getOptionsLabel = () => {
    switch (field.type) {
      case 'radio':
        return 'Answer Options:'
      case 'checkbox':
        return 'Checkbox Options:'
      case 'select':
        return 'Select Options:'
      default:
        return 'Options:'
    }
  }

  const getPlaceholder = (index: number) => {
    return field.type === 'radio' ? `Answer ${index + 1}` : `Option ${index + 1}`
  }

  const getAddButtonLabel = () => {
    return field.type === 'radio' ? '+ Add Answer' : '+ Add Option'
  }

  const getNewOptionLabel = () => {
    const count = (field.options?.length || 0) + 1
    return field.type === 'radio' ? `Answer ${count}` : `Option ${count}`
  }

  return (
    <div>
      <Text size={3} className={styles.optionsLabel}>
        {getOptionsLabel()}
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
              placeholder={getPlaceholder(index)}
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
            const newOptions = [...(field.options || []), getNewOptionLabel()]
            updateField(selectedStep.id, field.id, {
              options: newOptions,
            })
          }}
          color="secondary"
          className={styles.addOptionButton}
        >
          {getAddButtonLabel()}
        </ButtonFilled>
      </div>
    </div>
  )
}

