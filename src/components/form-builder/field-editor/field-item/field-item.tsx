'use client'

import { FormField } from '../../../../types/form-builder'
import { Text } from '../../../typography/text/text'
import classNames from 'classnames'
import styles from './field-item.module.scss'

interface FieldItemProps {
  field: FormField
  index: number
  isSelected: boolean
  totalFields: number
  onSelect: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDelete: () => void
}

export default function FieldItem({
  field,
  index,
  isSelected,
  totalFields,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDelete,
}: FieldItemProps) {
  return (
    <div
      onClick={onSelect}
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
              onMoveUp()
            }}
            disabled={index === 0}
            className={styles.actionButton}
          >
            ↑
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMoveDown()
            }}
            disabled={index === totalFields - 1}
            className={styles.actionButton}
          >
            ↓
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
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

