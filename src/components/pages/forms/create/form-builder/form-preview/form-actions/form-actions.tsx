'use client'

import ButtonFilled from '@/components/ui/button/button-filled'
import styles from './form-actions.module.scss'

interface FormActionsProps {
  currentStepIndex: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  isSubmitting?: boolean
}

export default function FormActions({
  currentStepIndex,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
}: FormActionsProps) {
  return (
    <div className={styles.formActions}>
      <ButtonFilled
        onClick={onPrevious}
        disabled={currentStepIndex === 0 || isSubmitting}
        color="secondary"
      >
        Previous
      </ButtonFilled>
      {currentStepIndex < totalSteps - 1 ? (
        <ButtonFilled onClick={onNext} disabled={isSubmitting}>
          Next
        </ButtonFilled>
      ) : (
        <ButtonFilled onClick={onSubmit} disabled={isSubmitting} isLoading={isSubmitting}>
          Submit
        </ButtonFilled>
      )}
    </div>
  )
}

