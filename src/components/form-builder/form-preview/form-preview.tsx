'use client'

import { useState } from 'react'
import { FormBuilderData } from '../../../types/form-builder'
import { Heading } from '../../typography/heading/heading'
import { Text } from '../../typography/text/text'
import { ProgressBar } from '../../ui/progress-bar/progress-bar'
import * as LucideIcons from 'lucide-react'
import PreviewField from './preview-field/preview-field'
import FormActions from './form-actions/form-actions'
import styles from './form-preview.module.scss'

interface FormPreviewProps {
  formData: FormBuilderData
}

export default function FormPreview({ formData }: FormPreviewProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formValues, setFormValues] = useState<Record<string, any>>({})

  const currentStep = formData.steps[currentStepIndex]
  const totalSteps = formData.steps.length

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] as React.ComponentType<{ size?: number }>
    return IconComponent ? <IconComponent size={24} /> : <LucideIcons.FileText size={24} />
  }

  const updateFieldValue = (fieldId: string, value: any) => {
    setFormValues({ ...formValues, [fieldId]: value })
  }

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formValues)
    alert('Form submitted! Check console for values.')
  }

  if (totalSteps === 0) {
    return (
      <div className={styles.emptyState}>
        <Text size={2} color="secondary">
          No steps in form. Add steps to preview.
        </Text>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <ProgressBar
        current={currentStepIndex + 1}
        total={totalSteps}
        value={(currentStepIndex + 1) / totalSteps}
      />

      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <div className={styles.formIcon}>{getIcon(currentStep.icon)}</div>
          <Heading level={2} size={2}>
            {currentStep.title}
          </Heading>
        </div>

        <div className={styles.formFields}>
          {currentStep.fields.map((field) => (
            <PreviewField
              key={field.id}
              field={field}
              value={formValues[field.id]}
              onChange={(value) => updateFieldValue(field.id, value)}
            />
          ))}
        </div>

        <FormActions
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

