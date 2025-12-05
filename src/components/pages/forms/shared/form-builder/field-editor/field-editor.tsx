'use client'

import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import AddFieldSection from './add-field-section/add-field-section'
import FieldsList from './fields-list/fields-list'
import FieldConfiguration from './field-configuration/field-configuration'
import styles from './field-editor.module.scss'
import { useFormBuilder } from '../context/form-builder-context'

export default function FieldEditor() {
  const { selectedStep, selectedFieldId } = useFormBuilder()

  if (!selectedStep) {
    return null
  }

  const selectedField = selectedStep.fields.find((field) => field.id === selectedFieldId)

  return (
    <div className={styles.containerBlock}>
      <div className={styles.header}>
        <Heading level={2} size={2}>
          {selectedStep.title} - Fields
        </Heading>
        <Text size={3} color="secondary">
          {selectedStep.fields.length} field{selectedStep.fields.length !== 1 ? 's' : ''}
        </Text>
      </div>

      <AddFieldSection />
      <FieldsList />
      {selectedField && (
        <FieldConfiguration />
      )}
    </div>
  )
}

