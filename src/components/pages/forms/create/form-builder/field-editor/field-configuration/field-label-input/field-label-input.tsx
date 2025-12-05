'use client'

import Input from '@/components/ui/input/input'
import { useFormBuilder } from '../../../context/form-builder-context'

export default function FieldLabelInput() {
  const { selectedStep, selectedFieldId, updateField } = useFormBuilder()

  if (!selectedStep || !selectedFieldId) {
    return null
  }

  const field = selectedStep.fields.find((f) => f.id === selectedFieldId)
  if (!field) {
    return null
  }

  return (
    <Input
      label="Label"
      value={field.label}
      onChange={(e) =>
        updateField(selectedStep.id, field.id, { label: e.target.value })
      }
    />
  )
}

