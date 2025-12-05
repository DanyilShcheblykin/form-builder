'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { FormBuilderData, FormStep, FormField } from '@/types/form-builder'
import { customToast } from '@/components/shared/custom-toast/custom-toast'
import apiClient from '@/lib/api/client'
import {
  DEFAULT_STEP_ICON,
  DEFAULT_FIELD_LABEL_PREFIX,
  DEFAULT_RADIO_OPTIONS,
  DEFAULT_CHECKBOX_OPTIONS,
  DEFAULT_SELECT_OPTIONS,
} from './data'

interface FormBuilderContextType {
  // State
  formData: FormBuilderData
  selectedStepId: string | null
  selectedFieldId: string | null
  showPreview: boolean
  savedFormId: string | null
  formName: string
  isSaving: boolean

  // Computed
  selectedStep: FormStep | undefined
  steps: FormStep[]

  // Actions
  setSelectedStepId: (stepId: string | null) => void
  setSelectedFieldId: (fieldId: string | null) => void
  setShowPreview: (show: boolean) => void
  setFormName: (name: string) => void
  addStep: () => void
  updateStep: (stepId: string, updates: Partial<FormStep>) => void
  deleteStep: (stepId: string) => void
  addField: (stepId: string, fieldType: FormField['type']) => void
  updateField: (stepId: string, fieldId: string, updates: Partial<FormField>) => void
  deleteField: (stepId: string, fieldId: string) => void
  moveField: (stepId: string, fieldId: string, direction: 'up' | 'down') => void
  saveForm: (clearAfterSave?: boolean) => Promise<void>
  setSavedFormId: (formId: string | null) => void
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined)

interface FormBuilderProviderProps {
  children: ReactNode
  initialData?: FormBuilderData
  initialFormId?: string | null
  initialFormName?: string
  initialShowPreview?: boolean
}

export function FormBuilderProvider(props: FormBuilderProviderProps) {
  const { 
    children,
    initialData,
    initialFormId,
    initialFormName,
    initialShowPreview = false,
  } = props
  const router = useRouter()
  const [formData, setFormData] = useState<FormBuilderData>(initialData || { steps: [] })
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(initialShowPreview)
  const [savedFormId, setSavedFormId] = useState<string | null>(initialFormId || null)
  const [formName, setFormName] = useState(initialFormName || '')
  const [isSaving, setIsSaving] = useState(false)

  const selectedStep = formData.steps.find((step) => step.id === selectedStepId)
  const steps = formData.steps

  // Update formData when initialData changes (e.g., when editing existing form)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  // Auto-select first step when form data is loaded
  useEffect(() => {
    if (formData?.steps && formData.steps.length > 0) {
      if (!selectedStepId) {
        setSelectedStepId(formData.steps[0].id)
      }
    }
  }, [formData, selectedStepId])

  const addStep = () => {
    const newStep: FormStep = {
      id: `step-${Date.now()}`,
      title: `Step ${formData.steps.length + 1}`,
      icon: DEFAULT_STEP_ICON,
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
    const getDefaultOptions = () => {
      if (fieldType === 'radio') return DEFAULT_RADIO_OPTIONS
      if (fieldType === 'checkbox') return DEFAULT_CHECKBOX_OPTIONS
      if (fieldType === 'select') return DEFAULT_SELECT_OPTIONS
      return undefined
    }

    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `${DEFAULT_FIELD_LABEL_PREFIX} ${fieldType}`,
      required: false,
      // Add default options for radio, checkbox, and select
      ...(fieldType === 'radio' || fieldType === 'checkbox' || fieldType === 'select'
        ? { options: getDefaultOptions() }
        : {}),
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

  const resetForm = () => {
    setFormData({ steps: [] })
    setFormName('')
    setSelectedStepId(null)
    setSelectedFieldId(null)
    setSavedFormId(null)
    setShowPreview(false)
  }

  const saveForm = async (clearAfterSave: boolean = false) => {
    if (formData.steps.length === 0) {
      customToast('Please add at least one step to save the form', 'error')
      return
    }

    if (!formName.trim()) {
      customToast('Please enter a form name', 'error')
      return
    }

    // Check that all steps have fields
    const stepWithoutFields = formData.steps.find((step) => !step.fields || step.fields.length === 0)
    if (stepWithoutFields) {
      customToast('Every step has to have fields', 'error')
      setSelectedStepId(stepWithoutFields.id)
      setShowPreview(false)
      return
    }

    setIsSaving(true)
    try {
      const isNewForm = !savedFormId
      const url = savedFormId ? `/forms/${savedFormId}` : '/forms'
      
      const response = savedFormId
        ? await apiClient.put(url, {
            name: formName,
            form_data: formData,
          })
        : await apiClient.post(url, {
            name: formName,
            form_data: formData,
          })

      setSavedFormId(response.data.data.id)
      customToast('Form saved successfully!', 'success')

      // Redirect to forms list when updating existing form
      if (!isNewForm) {
        router.push('/forms')
        return
      }

      // Clear form data after saving new form from main page (not in preview mode)
      if (clearAfterSave && isNewForm) {
        resetForm()
      }
    } catch (error) {
      console.error('Error saving form:', error)
      customToast('Failed to save form. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  console.log('formData', formData)
  console.log('steps', steps)


  const value: FormBuilderContextType = {
    formData,
    selectedStepId,
    selectedFieldId,
    showPreview,
    savedFormId,
    formName,
    isSaving,
    selectedStep,
    steps,
    setSelectedStepId,
    setSelectedFieldId,
    setShowPreview,
    setFormName,
    addStep,
    updateStep,
    deleteStep,
    addField,
    updateField,
    deleteField,
    moveField,
    saveForm,
    setSavedFormId,
  }

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  )
}

export function useFormBuilder() {
  const context = useContext(FormBuilderContext)
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider')
  }
  return context
}

