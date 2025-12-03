'use client'

import { useState } from 'react'
import { FormBuilderData, FormStep, FormField } from '../../types/form-builder'
import StepManager from './step-manager/step-manager'
import FieldEditor from './field-editor/field-editor'
import FormPreview from './form-preview/form-preview'
import { Heading } from '../typography/heading/heading'
import { Text } from '../typography/text/text'
import ButtonFilled from '../ui/button/button-filled'
import styles from './form-builder.module.scss'

export default function FormBuilder() {
  const [formData, setFormData] = useState<FormBuilderData>({ steps: [] })
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const selectedStep = formData.steps.find((step) => step.id === selectedStepId)

  const addStep = () => {
    const newStep: FormStep = {
      id: `step-${Date.now()}`,
      title: `Step ${formData.steps.length + 1}`,
      icon: 'FileText',
      fields: [],
    }
    setFormData({ steps: [...formData.steps, newStep] })
    setSelectedStepId(newStep.id)
  }

  const updateStep = (stepId: string, updates: Partial<FormStep>) => {
    setFormData({
      steps: formData.steps.map((step) =>
        step.id === stepId ? { ...step, ...updates } : step
      ),
    })
  }

  const deleteStep = (stepId: string) => {
    const newSteps = formData.steps.filter((step) => step.id !== stepId)
    setFormData({ steps: newSteps })
    if (selectedStepId === stepId) {
      setSelectedStepId(newSteps.length > 0 ? newSteps[0].id : null)
    }
  }

  const addField = (stepId: string, fieldType: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `New ${fieldType}`,
      required: false,
    }

    setFormData({
      steps: formData.steps.map((step) =>
        step.id === stepId
          ? { ...step, fields: [...step.fields, newField] }
          : step
      ),
    })
    setSelectedFieldId(newField.id)
  }

  const updateField = (stepId: string, fieldId: string, updates: Partial<FormField>) => {
    setFormData({
      steps: formData.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map((field) =>
                field.id === fieldId ? { ...field, ...updates } : field
              ),
            }
          : step
      ),
    })
  }

  const deleteField = (stepId: string, fieldId: string) => {
    setFormData({
      steps: formData.steps.map((step) =>
        step.id === stepId
          ? { ...step, fields: step.fields.filter((field) => field.id !== fieldId) }
          : step
      ),
    })
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null)
    }
  }

  const moveField = (stepId: string, fieldId: string, direction: 'up' | 'down') => {
    const step = formData.steps.find((s) => s.id === stepId)
    if (!step) return

    const fieldIndex = step.fields.findIndex((f) => f.id === fieldId)
    if (fieldIndex === -1) return

    const newIndex = direction === 'up' ? fieldIndex - 1 : fieldIndex + 1
    if (newIndex < 0 || newIndex >= step.fields.length) return

    const newFields = [...step.fields]
    ;[newFields[fieldIndex], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[fieldIndex],
    ]

    setFormData({
      steps: formData.steps.map((s) =>
        s.id === stepId ? { ...s, fields: newFields } : s
      ),
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading level={1} size={1}>
          Form Builder
        </Heading>
        <div className={styles.headerActions}>
          <ButtonFilled onClick={() => setShowPreview(!showPreview)} color="secondary">
            {showPreview ? 'Edit Form' : 'Preview Form'}
          </ButtonFilled>
          <ButtonFilled onClick={addStep}>
            Add Step
          </ButtonFilled>
        </div>
      </div>

      {showPreview ? (
        <FormPreview formData={formData} />
      ) : (
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <StepManager
              steps={formData.steps}
              selectedStepId={selectedStepId}
              onSelectStep={setSelectedStepId}
              onUpdateStep={updateStep}
              onDeleteStep={deleteStep}
            />
          </div>

          <div className={styles.mainContent}>
            {selectedStep ? (
              <FieldEditor
                step={selectedStep}
                selectedFieldId={selectedFieldId}
                onSelectField={setSelectedFieldId}
                onAddField={addField}
                onUpdateField={updateField}
                onDeleteField={deleteField}
                onMoveField={moveField}
              />
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

