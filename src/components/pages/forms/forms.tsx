'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heading } from '../../typography/heading/heading'
import { Text } from '../../typography/text/text'
import ButtonFilled from '../../ui/button/button-filled'
import { SavedForm } from '../../../types/database'
import styles from './forms.module.scss'
import LoadingPage from '@/components/shared/loading-page/loading-page'

export default function FormsPageComponent() {
  const router = useRouter()
  const [forms, setForms] = useState<SavedForm[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/forms')
      if (!response.ok) {
        throw new Error('Failed to fetch forms')
      }
      const data = await response.json()
      setForms(data.data || [])
    } catch (err) {
      console.error('Error fetching forms:', err)
      setError('Failed to load forms')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (formId: string) => {
    if (!confirm('Are you sure you want to delete this form?')) {
      return
    }

    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete form')
      }

      setForms(forms.filter((form) => form.id !== formId))
    } catch (err) {
      console.error('Error deleting form:', err)
      alert('Failed to delete form')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) return <LoadingPage text="Loading forms..." />

  return (
    <main className={styles.main}>
      <div className='container'>
        <div className={styles.header}>
          <Heading level={1} size={1}>
            My Forms:
          </Heading>
          <ButtonFilled onClick={() => router.push('/create')}>
            Create Form
          </ButtonFilled>
        </div>

        {forms.length === 0 ? (
          <div className={styles.emptyState}>
            <Text size={2} color="secondary">
              No forms yet. Create your first form!
            </Text>
          </div>
        ) : (
          <div className={styles.formsList}>
            {forms.map((form) => (
              <div key={form.id} className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div>
                    <Heading level={3} size={3}>
                      {form.name}
                    </Heading>
                    {form.description && (
                      <Text size={3} color="secondary" className={styles.description}>
                        {form.description}
                      </Text>
                    )}
                  </div>
                  <div className={styles.formCardActions}>
                    <ButtonFilled
                      onClick={() => router.push(`/forms/${form.id}`)}
                      color="secondary"
                    >
                      View
                    </ButtonFilled>
                    <ButtonFilled
                      onClick={() => handleDelete(form.id)}
                      color="secondary"
                      className={styles.deleteButton}
                    >
                      Delete
                    </ButtonFilled>
                  </div>
                </div>
                <div className={styles.formCardMeta}>
                  <Text size={4} color="secondary">
                    {form.form_data.steps.length} step{form.form_data.steps.length !== 1 ? 's' : ''}
                  </Text>
                  <Text size={4} color="secondary">
                    Created: {formatDate(form.created_at)}
                  </Text>
                  {form.updated_at !== form.created_at && (
                    <Text size={4} color="secondary">
                      Updated: {formatDate(form.updated_at)}
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
