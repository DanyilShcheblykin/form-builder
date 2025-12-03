'use client'

import ButtonFilled from '../../../ui/button/button-filled'
import styles from './form-actions.module.scss'

interface FormActionsProps {
  currentStepIndex: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
}

export default function FormActions({
  currentStepIndex,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
}: FormActionsProps) {
  return (
    <div className={styles.formActions}>
      <ButtonFilled
        onClick={onPrevious}
        disabled={currentStepIndex === 0}
        color="secondary"
      >
        Previous
      </ButtonFilled>
      {currentStepIndex < totalSteps - 1 ? (
        <ButtonFilled onClick={onNext}>Next</ButtonFilled>
      ) : (
        <ButtonFilled onClick={onSubmit}>Submit</ButtonFilled>
      )}
    </div>
  )
}

