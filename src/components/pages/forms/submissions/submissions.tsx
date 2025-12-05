'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FormSubmission, SavedForm } from '@/types/database'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import LoadingPage from '@/components/shared/loading-page/loading-page'
import apiClient from '@/lib/api/client'
import SubmissionsList from './submissions-list/submissions-list'
import styles from './submissions.module.scss'

export default function SubmissionsPageComponent() {
  const router = useRouter()
  const params = useParams()
  const formId = params.id as string

  const [form, setForm] = useState<SavedForm | null>(null)
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (formId) {
      fetchData()
    }
  }, [formId])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [formResponse, submissionsResponse] = await Promise.all([
        apiClient.get(`/forms/${formId}`),
        apiClient.get(`/forms/${formId}/submissions`),
      ])
      setForm(formResponse.data.data)
      setSubmissions(submissionsResponse.data.data || [])
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingPage text="Loading submissions..." />
  }

  if (error || !form) {
    return (
      <div className={styles.containerBlock}>
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
    <main className={styles.containerBlock}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <Heading level={1} size={1}>
              Submissions: {form.name}
            </Heading>
            <Text size={3} color="secondary" className={styles.subtitle}>
              {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
            </Text>
          </div>
          <div className={styles.actions}>
            <ButtonFilled onClick={() => router.push(`/forms/${formId}`)} color="secondary">
              View Form
            </ButtonFilled>
            <ButtonFilled onClick={() => router.push('/forms')} color="secondary">
              Back to Forms
            </ButtonFilled>
          </div>
        </div>

        <SubmissionsList submissions={submissions} form={form} />
      </div>
    </main>
  )
}

