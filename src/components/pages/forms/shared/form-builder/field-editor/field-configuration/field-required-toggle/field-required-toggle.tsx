'use client'

import { Text } from '@/components/typography/text/text'
import styles from '../field-configuration.module.scss'
import { useFormBuilder } from '../../../context/form-builder-context'

export default function FieldRequiredToggle() {
  const { selectedStep, selectedFieldId, updateField } = useFormBuilder()

  if (!selectedStep || !selectedFieldId) {
    return null
  }

  const field = selectedStep.fields.find((f) => f.id === selectedFieldId)
  if (!field) {
    return null
  }

  return (
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
  )
}

