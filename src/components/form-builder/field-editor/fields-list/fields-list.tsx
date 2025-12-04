'use client'

import { Text } from '../../../typography/text/text'
import FieldItem from '../field-item/field-item'
import styles from './fields-list.module.scss'
import { useFormBuilder } from '../../context/form-builder-context'

export default function FieldsList(): JSX.Element | null {
  const { selectedStep } = useFormBuilder()

  if (!selectedStep) {
    return null
  }

  const fields = selectedStep.fields
  
  if (fields.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text size={3}>No fields yet. Add a field to get started.</Text>
      </div>
    )
  }

  return (
    <div className={styles.fieldsList}>
      {fields.map((field, index) => (
        <FieldItem
          key={field.id}
          stepId={selectedStep.id}
          fieldId={field.id}
          index={index}
        />
      ))}
    </div>
  )
}

