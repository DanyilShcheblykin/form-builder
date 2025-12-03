'use client'

import { FormStep } from '../../../types/form-builder'
import { Heading } from '../../typography/heading/heading'
import StepItem from './step-item/step-item'
import styles from './step-manager.module.scss'

interface StepManagerProps {
  steps: FormStep[]
  selectedStepId: string | null
  onSelectStep: (stepId: string) => void
  onUpdateStep: (stepId: string, updates: Partial<FormStep>) => void
  onDeleteStep: (stepId: string) => void
}

export default function StepManager({
  steps,
  selectedStepId,
  onSelectStep,
  onUpdateStep,
  onDeleteStep,
}: StepManagerProps) {
  return (
    <div className={styles.container}>
      <Heading level={2} size={3} className={styles.title}>
        Steps ({steps.length})
      </Heading>

      <div className={styles.stepsList}>
        {steps.map((step) => (
          <StepItem
            key={step.id}
            step={step}
            isSelected={selectedStepId === step.id}
            canDelete={steps.length > 1}
            onSelect={() => onSelectStep(step.id)}
            onUpdate={(updates) => onUpdateStep(step.id, updates)}
            onDelete={() => onDeleteStep(step.id)}
          />
        ))}
      </div>
    </div>
  )
}

