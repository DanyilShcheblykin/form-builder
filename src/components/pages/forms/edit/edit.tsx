'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FormBuilderProvider } from '@/components/pages/forms/create/form-builder/context/form-builder-context'
import { FormBuilderContent } from '@/components/pages/forms/create/form-builder/form-builder'
import { SavedForm } from '@/types/database'
import { FormBuilderData } from '@/types/form-builder'
import LoadingPage from '@/components/shared/loading-page/loading-page'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import apiClient from '@/lib/api/client'
import styles from './edit.module.scss'

export default function EditFormPageComponent() {
  const router = useRouter()
  const params = useParams()
  const formId = params.id as string

  const [form, setForm] = useState<SavedForm | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (formId) {
      fetchForm()
    }
  }, [formId])

  const fetchForm = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.get(`/forms/${formId}`)
      setForm(response.data.data)
    } catch (err) {
      console.error('Error fetching form:', err)
      setError('Failed to load form')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingPage text="Loading form..." />
  }

  if (error || !form) {
    return (
      <div className={styles.errorContainer}>
        <Text size={2} color="secondary">
          {error || 'Form not found'}
        </Text>
        <ButtonFilled onClick={() => router.push('/forms')} className={styles.backButton}>
          Back to Forms
        </ButtonFilled>
      </div>
    )
  }

  // Ensure form_data has the correct structure
  const formData: FormBuilderData = form.form_data && typeof form.form_data === 'object' 
    ? (form.form_data as FormBuilderData)
    : { steps: [] }

  if (!formData.steps || formData.steps.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <Text size={2} color="secondary">
          Form has no steps. Please add steps to edit the form.
        </Text>
        <ButtonFilled onClick={() => router.push('/forms')} className={styles.backButton}>
          Back to Forms
        </ButtonFilled>
      </div>
    )
  }

  return (
    <main className={styles.containerBlock}>
      <div className={styles.header}>
        <ButtonFilled onClick={() => router.push('/forms')} color="secondary">
          ← Back to Forms
        </ButtonFilled>
      </div>
      <div className={styles.contentWrapper}>
        <FormBuilderProvider
          key={form.id} // Force re-render when form changes
          initialData={formData}
          initialFormId={form.id}
          initialFormName={form.name}
          initialShowPreview={false}
        >
          <FormBuilderContent />
        </FormBuilderProvider>
      </div>
    </main>
  )
}

