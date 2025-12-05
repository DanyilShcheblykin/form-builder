'use client'

import StepManager from './step-manager/step-manager'
import FieldEditor from './field-editor/field-editor'
import FormPreview from '../../shared/form-preview/form-preview'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from './form-builder.module.scss'
import Input from '@/components/ui/input/input'
import { FormBuilderProvider, useFormBuilder } from './context/form-builder-context'
import { customToast } from '@/components/shared/custom-toast/custom-toast'

function FormBuilderContent() {
  const {
    formData,
    selectedStep,
    showPreview,
    formName,
    savedFormId,
    isSaving,
    setShowPreview,
    setFormName,
    addStep,
    saveForm,
    setSelectedStepId,
  } = useFormBuilder()

  const validateAllStepsHaveFields = (): boolean => {
    const stepWithoutFields = formData.steps.find((step) => !step.fields || step.fields.length === 0)
    
    if (stepWithoutFields) {
      customToast('Every step has to have fields', 'error')
      setSelectedStepId(stepWithoutFields.id)
      return false
    }
    
    return true
  }

  const handlePreviewToggle = () => {
    if (!showPreview) {
      // When switching to preview, check if form name is filled
      if (!formName || formName.trim() === '') {
        customToast('Please enter the form name', 'error')
        return
      }
      
      // Check that all steps have fields
      if (!validateAllStepsHaveFields()) {
        return
      }
    }
    setShowPreview(!showPreview)
  }

  const handleSaveForm = async () => {
    // Check that all steps have fields before saving
    if (!validateAllStepsHaveFields()) {
      return
    }
    await saveForm(true)
  }

  return (
    <div className={styles.containerBlock}>
      <div className={styles.header}>
        <Heading level={1} size={1}>
          Form Builder
        </Heading>
        <div className={styles.headerActions}>
          {!showPreview && (
            <>
              <Input
                type="text"
                placeholder="Form name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className={styles.formNameInput}
              />
              <ButtonFilled 
                onClick={handleSaveForm} 
                disabled={isSaving} 
                isLoading={isSaving}
              >
                {savedFormId ? 'Update Form' : 'Save Form'}
              </ButtonFilled>
            </>
          )}
          <ButtonFilled onClick={handlePreviewToggle} color="secondary">
            {showPreview ? 'Back to form' : 'Preview Form'}
          </ButtonFilled>
          {!showPreview && (
            <ButtonFilled onClick={addStep}>
              Add Step
            </ButtonFilled>
          )}
        </div>
      </div>

      {showPreview ? (
        <FormPreview />
      ) : (
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <StepManager />
          </div>

          <div className={styles.mainContent}>
            {selectedStep ? (
              <FieldEditor />
            ) : (
              <div className={styles.emptyState}>
                <Text size={2} color="secondary">
                  {formData.steps.length === 0
                    ? 'Click "Add Step" to start building your form'
                    : 'Select a step to edit its fields'}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FormBuilder() {
  return (
    <FormBuilderProvider>
      <FormBuilderContent />
    </FormBuilderProvider>
  )
}

