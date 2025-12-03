'use client'

import { FieldType } from '../../../../types/form-builder'
import { Text } from '../../../typography/text/text'
import ButtonFilled from '../../../ui/button/button-filled'
import styles from './add-field-section.module.scss'

interface AddFieldSectionProps {
  onAddField: (fieldType: FieldType) => void
}

const fieldTypes: { type: FieldType; label: string }[] = [
  { type: 'input', label: 'Text Input' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'radio', label: 'Radio Button' },
  { type: 'select', label: 'Select Dropdown' },
]

export default function AddFieldSection({ onAddField }: AddFieldSectionProps) {
  return (
    <div className={styles.addFieldSection}>
      <Text size={3} bold className={styles.addFieldLabel}>
        Add Field:
      </Text>
      <div className={styles.addFieldButtons}>
        {fieldTypes.map(({ type, label }) => (
          <ButtonFilled
            key={type}
            onClick={() => onAddField(type)}
            color="secondary"
            className={styles.addFieldButton}
          >
            + {label}
          </ButtonFilled>
        ))}
      </div>
    </div>
  )
}

