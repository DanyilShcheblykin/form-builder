'use client'

import { Text } from '@/components/typography/text/text'
import classNames from 'classnames'
import styles from './field-item.module.scss'
import { useFormBuilder } from '../../context/form-builder-context'

interface FieldItemProps {
  stepId: string
  fieldId: string
  index: number
}

export default function FieldItem({ stepId, fieldId, index }: FieldItemProps) {
  const { selectedStep, selectedFieldId, setSelectedFieldId, moveField, deleteField } = useFormBuilder()
  
  if (!selectedStep || selectedStep.id !== stepId) return null
  
  const field = selectedStep.fields.find((f) => f.id === fieldId)
  if (!field) return null
  
  const isSelected = selectedFieldId === field.id
  const totalFields = selectedStep.fields.length
  
  const handleSelect = () => {
    setSelectedFieldId(field.id)
  }
  
  const handleMoveUp = () => {
    moveField(stepId, fieldId, 'up')
  }
  
  const handleMoveDown = () => {
    moveField(stepId, fieldId, 'down')
  }
  
  const handleDelete = () => {
    deleteField(stepId, fieldId)
  }
  return (
    <div
      onClick={handleSelect}
      className={classNames(styles.fieldItem, {
        [styles.selected]: isSelected,
      })}
    >
      <div className={styles.fieldItemHeader}>
        <Text size={3} bold>
          {field.label || `Field ${index + 1}`} ({field.type})
        </Text>
        <div className={styles.fieldActions}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleMoveUp()
            }}
            disabled={index === 0}
            className={styles.actionButton}
          >
            ↑
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleMoveDown()
            }}
            disabled={index === totalFields - 1}
            className={styles.actionButton}
          >
            ↓
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className={classNames(styles.actionButton, styles.deleteButton)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

