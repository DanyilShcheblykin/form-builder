'use client'

import { FormStep, FormField, FieldType } from '../../../types/form-builder'
import { Heading } from '../../typography/heading/heading'
import { Text } from '../../typography/text/text'
import AddFieldSection from './add-field-section/add-field-section'
import FieldsList from './fields-list/fields-list'
import FieldConfiguration from './field-configuration/field-configuration'
import styles from './field-editor.module.scss'

interface FieldEditorProps {
  step: FormStep
  selectedFieldId: string | null
  onSelectField: (fieldId: string) => void
  onAddField: (stepId: string, fieldType: FieldType) => void
  onUpdateField: (stepId: string, fieldId: string, updates: Partial<FormField>) => void
  onDeleteField: (stepId: string, fieldId: string) => void
  onMoveField: (stepId: string, fieldId: string, direction: 'up' | 'down') => void
}

export default function FieldEditor({
  step,
  selectedFieldId,
  onSelectField,
  onAddField,
  onUpdateField,
  onDeleteField,
  onMoveField,
}: FieldEditorProps) {
  const selectedField = step.fields.find((field) => field.id === selectedFieldId)

  const handleAddField = (fieldType: FieldType) => {
    onAddField(step.id, fieldType)
  }

  const handleMoveField = (fieldId: string, direction: 'up' | 'down') => {
    onMoveField(step.id, fieldId, direction)
  }

  const handleDeleteField = (fieldId: string) => {
    onDeleteField(step.id, fieldId)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading level={2} size={2}>
          {step.title} - Fields
        </Heading>
        <Text size={3} color="secondary">
          {step.fields.length} field{step.fields.length !== 1 ? 's' : ''}
        </Text>
      </div>

      <AddFieldSection onAddField={handleAddField} />

      <FieldsList
        fields={step.fields}
        selectedFieldId={selectedFieldId}
        onSelectField={onSelectField}
        onMoveField={handleMoveField}
        onDeleteField={handleDeleteField}
        stepId={step.id}
      />

      {selectedField && (
        <FieldConfiguration
          field={selectedField}
          stepId={step.id}
          onUpdateField={onUpdateField}
        />
      )}
    </div>
  )
}

