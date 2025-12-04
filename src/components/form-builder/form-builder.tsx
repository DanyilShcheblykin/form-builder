'use client'

import StepManager from './step-manager/step-manager'
import FieldEditor from './field-editor/field-editor'
import FormPreview from './form-preview/form-preview'
import { Heading } from '../typography/heading/heading'
import { Text } from '../typography/text/text'
import ButtonFilled from '../ui/button/button-filled'
import styles from './form-builder.module.scss'
import Input from '../ui/input/input'
import { FormBuilderProvider, useFormBuilder } from './context/form-builder-context'

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
  } = useFormBuilder()

  console.log('selectedStep', selectedStep)

  return (
    <div className={styles.container}>
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
              <ButtonFilled onClick={saveForm} disabled={isSaving} isLoading={isSaving}>
                {savedFormId ? 'Update Form' : 'Save Form'}
              </ButtonFilled>
            </>
          )}
          <ButtonFilled onClick={() => setShowPreview(!showPreview)} color="secondary">
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

