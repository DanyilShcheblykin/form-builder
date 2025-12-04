'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import FormPreview from '../../../components/form-builder/form-preview/form-preview'
import { SavedForm } from '../../../types/database'
import { FormBuilderData } from '../../../types/form-builder'
import { Heading } from '../../../components/typography/heading/heading'
import { Text } from '../../../components/typography/text/text'
import ButtonFilled from '../../../components/ui/button/button-filled'
import styles from './form-view.module.scss'
import LoadingPage from '@/components/loading-page/loading-page'

export default function FormViewPage() {
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
      const response = await fetch(`/api/forms/${formId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch form')
      }
      const data = await response.json()
      setForm(data.data)
    } catch (err) {
      console.error('Error fetching form:', err)
      setError('Failed to load form')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <LoadingPage text="Loading form..." />
    )
  }

  if (error || !form) {
    return (
      <div className={styles.container}>
        <Text size={2} color="secondary">
          {error || 'Form not found'}
        </Text>
        <ButtonFilled onClick={() => router.push('/forms')} className={styles.backButton}>
          Back to Forms
        </ButtonFilled>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      <div className='container'>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <div>
              <Heading level={1} size={1}>
                {form.name}
              </Heading>
              {form.description && (
                <Text size={3} color="secondary" className={styles.description}>
                  {form.description}
                </Text>
              )}
            </div>
            <ButtonFilled onClick={() => router.push('/forms')} color="secondary">
              Back to Forms
            </ButtonFilled>
          </div>

          <FormPreview
            formData={form.form_data as FormBuilderData}
            formId={form.id}
            formName={form.name}
          />
        </div>

      </div>
    </main>

  )
}

