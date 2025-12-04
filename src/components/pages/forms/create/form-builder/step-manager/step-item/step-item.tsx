'use client'

import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import * as LucideIcons from 'lucide-react'
import IconSelector from '../icon-selector/icon-selector'
import classNames from 'classnames'
import styles from './step-item.module.scss'
import { useFormBuilder } from '../../context/form-builder-context'

interface StepItemProps {
  stepId: string
}

export default function StepItem({ stepId }: StepItemProps) {
  const { steps, selectedStepId, setSelectedStepId, updateStep, deleteStep } = useFormBuilder()
  
  const step = steps.find((s) => s.id === stepId)
  if (!step) return null
  
  const isSelected = selectedStepId === step.id
  const canDelete = steps.length > 1
  
  const handleSelect = () => {
    setSelectedStepId(step.id)
  }
  
  const handleUpdate = (updates: Partial<typeof step>) => {
    updateStep(step.id, updates)
  }
  
  const handleDelete = () => {
    deleteStep(step.id)
  }
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] as React.ComponentType<{ size?: number }>
    return IconComponent ? <IconComponent size={20} /> : <LucideIcons.FileText size={20} />
  }

  return (
    <div
      onClick={handleSelect}
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
        onChange={(e) => handleUpdate({ title: e.target.value })}
        onClick={(e) => e.stopPropagation()}
        className={styles.stepTitleInput}
        placeholder="Step title"
      />
      <div className={styles.stepActions}>
        <IconSelector
          currentIcon={step.icon}
          onSelectIcon={(icon) => handleUpdate({ icon })}
        />
        {canDelete && (
          <ButtonFilled
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
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

