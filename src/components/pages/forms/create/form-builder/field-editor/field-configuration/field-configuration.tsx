'use client'

import { Heading } from '@/components/typography/heading/heading'
import styles from './field-configuration.module.scss'
import { useFormBuilder } from '../../context/form-builder-context'
import FieldLabelInput from './field-label-input/field-label-input'
import FieldPlaceholderInput from './field-placeholder-input/field-placeholder-input'
import FieldOptionsEditor from './field-options-editor/field-options-editor'
import FieldRequiredToggle from './field-required-toggle/field-required-toggle'

export default function FieldConfiguration(): JSX.Element | null {
  const { selectedStep, selectedFieldId } = useFormBuilder()

  if (!selectedStep || !selectedFieldId) {
    return null
  }

  const field = selectedStep.fields.find((f) => f.id === selectedFieldId)
  if (!field) {
    return null
  }

  return (
    <div className={styles.fieldConfiguration}>
      <Heading level={3} size={3} className={styles.fieldConfigurationTitle}>
        Field Configuration
      </Heading>

      <div className={styles.fieldConfigurationForm}>
        <FieldLabelInput />
        <FieldPlaceholderInput />
        <FieldOptionsEditor />
        <FieldRequiredToggle />
      </div>
    </div>
  )
}

