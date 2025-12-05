'use client'

import { useState } from 'react'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar'
import * as LucideIcons from 'lucide-react'
import PreviewField from './preview-field/preview-field'
import FormActions from './form-actions/form-actions'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from './form-preview.module.scss'
import { useFormBuilder } from '../../create/form-builder/context/form-builder-context'
import { customToast } from '@/components/shared/custom-toast/custom-toast'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/api/client'

export default function FormPreview(): JSX.Element {
  const router = useRouter()
  const { formData, savedFormId, formName, setSavedFormId, saveForm, isSaving } = useFormBuilder()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentStep = formData.steps[currentStepIndex]
  const totalSteps = formData.steps.length

  // If form is not saved yet, it's preview mode - disable fields
  const isPreviewMode = !savedFormId

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

  const handleSaveForm = async () => {
    try {
      await saveForm()
    } catch (error) {
      console.error('Error saving form:', error)
    }
  }

  const handleSubmit = async () => {
    // If form is not saved yet (preview mode), show info toast
    if (isPreviewMode) {
      customToast('When you create this form, the form will be submitted', 'info')
      return
    }

    setIsSubmitting(true)

    try {
      let currentFormId = savedFormId

      // If form doesn't have an ID, save it first
      if (!currentFormId) {
        const saveFormResponse = await apiClient.post('/forms', {
          name: formName || `Form ${new Date().toLocaleDateString()}`,
          form_data: formData,
        })

        currentFormId = saveFormResponse.data.data.id
        setSavedFormId(currentFormId)
      }

      // Submit form data
      await apiClient.post(`/forms/${currentFormId}/submissions`, {
        submission_data: formValues,
      })

      customToast('Form submitted successfully!', 'success')
      setFormValues({}) // Clear form values
      setCurrentStepIndex(0) // Reset to first step

      if (!isPreviewMode) {
        router.push(`/forms`)
      }

    } catch (error) {
      console.error('Error submitting form:', error)
      customToast('Failed to submit form. Please try again.', 'error')
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
              disabled={isPreviewMode}
            />
          ))}
        </div>

        <FormActions
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {isPreviewMode && (
        <div className={styles.saveFormContainer}>
          <ButtonFilled onClick={handleSaveForm} disabled={isSaving} isLoading={isSaving}>
            Save Form
          </ButtonFilled>
        </div>
      )}
    </div>
  )
}

