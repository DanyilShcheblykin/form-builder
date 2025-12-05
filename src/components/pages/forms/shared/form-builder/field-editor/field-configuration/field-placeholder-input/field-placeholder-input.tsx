'use client'

import Input from '@/components/ui/input/input'
import { useFormBuilder } from '../../../context/form-builder-context'

export default function FieldPlaceholderInput() {
  const { selectedStep, selectedFieldId, updateField } = useFormBuilder()

  if (!selectedStep || !selectedFieldId) {
    return null
  }

  const field = selectedStep.fields.find((f) => f.id === selectedFieldId)
  if (!field) {
    return null
  }

  // Only show placeholder input for input and textarea fields
  if (field.type !== 'input' && field.type !== 'textarea') {
    return null
  }

  return (
    <Input
      label="Placeholder"
      value={field.placeholder || ''}
      onChange={(e) =>
        updateField(selectedStep.id, field.id, {
          placeholder: e.target.value,
        })
      }
    />
  )
}

