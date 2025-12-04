'use client'

import { useState } from 'react'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar'
import * as LucideIcons from 'lucide-react'
import PreviewField from './preview-field/preview-field'
import FormActions from './form-actions/form-actions'
import styles from './form-preview.module.scss'
import { useFormBuilder } from '../context/form-builder-context'

export default function FormPreview(): JSX.Element {
  const { formData, savedFormId, formName, setSavedFormId } = useFormBuilder()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

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

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      let currentFormId = savedFormId

      // If form doesn't have an ID, save it first
      if (!currentFormId) {
        const saveFormResponse = await fetch('/api/forms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formName || `Form ${new Date().toLocaleDateString()}`,
            form_data: formData,
          }),
        })

        if (!saveFormResponse.ok) {
          throw new Error('Failed to save form')
        }

        const saveFormData = await saveFormResponse.json()
        currentFormId = saveFormData.data.id
        setSavedFormId(currentFormId)
      }

      // Submit form data
      const submitResponse = await fetch(`/api/forms/${currentFormId}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submission_data: formValues,
        }),
      })

      if (!submitResponse.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitMessage('Form submitted successfully!')
      setFormValues({}) // Clear form values
      setCurrentStepIndex(0) // Reset to first step
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
    <div className={styles.containerBlock}>
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

        {submitMessage && (
          <div className={styles.submitMessage}>
            <Text size={3} color={submitMessage.includes('success') ? 'default' : 'secondary'}>
              {submitMessage}
            </Text>
          </div>
        )}

        <FormActions
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}

