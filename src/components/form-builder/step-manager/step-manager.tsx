'use client'

import { Heading } from '../../typography/heading/heading'
import StepItem from './step-item/step-item'
import styles from './step-manager.module.scss'
import { useFormBuilder } from '../context/form-builder-context'

export default function StepManager(): JSX.Element {
  const { steps } = useFormBuilder()

  return (
    <div className={styles.container}>
      <Heading level={2} size={3} className={styles.title}>
        Steps ({steps.length})
      </Heading>

      <div className={styles.stepsList}>
        {steps.map((step) => (
          <StepItem key={step.id} stepId={step.id} />
        ))}
      </div>
    </div>
  )
}

