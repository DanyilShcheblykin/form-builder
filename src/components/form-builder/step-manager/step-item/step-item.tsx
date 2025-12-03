'use client'

import { FormStep } from '../../../../types/form-builder'
import { Text } from '../../../typography/text/text'
import ButtonFilled from '../../../ui/button/button-filled'
import * as LucideIcons from 'lucide-react'
import IconSelector from '../icon-selector/icon-selector'
import classNames from 'classnames'
import styles from './step-item.module.scss'

interface StepItemProps {
  step: FormStep
  isSelected: boolean
  canDelete: boolean
  onSelect: () => void
  onUpdate: (updates: Partial<FormStep>) => void
  onDelete: () => void
}

export default function StepItem({
  step,
  isSelected,
  canDelete,
  onSelect,
  onUpdate,
  onDelete,
}: StepItemProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] as React.ComponentType<{ size?: number }>
    return IconComponent ? <IconComponent size={20} /> : <LucideIcons.FileText size={20} />
  }

  return (
    <div
      onClick={onSelect}
      className={classNames(styles.stepItem, {
        [styles.selected]: isSelected,
      })}
    >
      <div className={styles.stepHeader}>
        {getIcon(step.icon)}
        <div className={styles.stepContent}>
          <Text size={3} bold>
            {step.title}
          </Text>
          <Text size={4} color="secondary">
            {step.fields.length} field{step.fields.length !== 1 ? 's' : ''}
          </Text>
        </div>
      </div>
      <input
        type="text"
        value={step.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        onClick={(e) => e.stopPropagation()}
        className={styles.stepTitleInput}
        placeholder="Step title"
      />
      <div className={styles.stepActions}>
        <IconSelector
          currentIcon={step.icon}
          onSelectIcon={(icon) => onUpdate({ icon })}
        />
        {canDelete && (
          <ButtonFilled
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            color="secondary"
            className={styles.deleteStepButton}
          >
            Delete
          </ButtonFilled>
        )}
      </div>
    </div>
  )
}

