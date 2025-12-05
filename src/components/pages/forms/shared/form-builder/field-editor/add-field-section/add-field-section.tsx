'use client'

import { FieldType } from '@/types/form-builder'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from './add-field-section.module.scss'
import { useFormBuilder } from '../../context/form-builder-context'
import { fieldTypes } from './data'

export default function AddFieldSection(): JSX.Element | null {
  const { selectedStep, addField } = useFormBuilder()
  
  if (!selectedStep) {
    return null
  }
  
  const handleAddField = (fieldType: FieldType) => {
    addField(selectedStep.id, fieldType)
  }
  return (
    <div className={styles.addFieldSection}>
      <Text size={3} bold className={styles.addFieldLabel}>
        Add Field:
      </Text>
      <div className={styles.addFieldButtons}>
        {fieldTypes.map(({ type, label }) => (
          <ButtonFilled
            key={type}
            onClick={() => handleAddField(type)}
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

