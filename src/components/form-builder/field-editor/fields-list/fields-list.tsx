'use client'

import { FormField } from '../../../../types/form-builder'
import { Text } from '../../../typography/text/text'
import FieldItem from '../field-item/field-item'
import styles from './fields-list.module.scss'

interface FieldsListProps {
  fields: FormField[]
  selectedFieldId: string | null
  onSelectField: (fieldId: string) => void
  onMoveField: (fieldId: string, direction: 'up' | 'down') => void
  onDeleteField: (fieldId: string) => void
  stepId: string
}

export default function FieldsList({
  fields,
  selectedFieldId,
  onSelectField,
  onMoveField,
  onDeleteField,
  stepId,
}: FieldsListProps) {
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
          field={field}
          index={index}
          isSelected={selectedFieldId === field.id}
          totalFields={fields.length}
          onSelect={() => onSelectField(field.id)}
          onMoveUp={() => onMoveField(field.id, 'up')}
          onMoveDown={() => onMoveField(field.id, 'down')}
          onDelete={() => onDeleteField(field.id)}
        />
      ))}
    </div>
  )
}

