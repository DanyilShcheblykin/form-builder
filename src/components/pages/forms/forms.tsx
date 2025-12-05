'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import { SavedForm } from '@/types/database'
import styles from './forms.module.scss'
import LoadingPage from '@/components/shared/loading-page/loading-page'
import { customToast } from '@/components/shared/custom-toast/custom-toast'
import RemoveFormModal from './remove-form-modal/remove-form-modal'
import apiClient from '@/lib/api/client'

export default function FormsPageComponent() {
  const router = useRouter()
  const [forms, setForms] = useState<SavedForm[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formIdToDelete, setFormIdToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.get('/forms')
      setForms(response.data.data || [])
    } catch (err) {
      console.error('Error fetching forms:', err)
      setError('Failed to load forms')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (formId: string) => {
    setFormIdToDelete(formId)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!formIdToDelete) return

    try {
      await apiClient.delete(`/forms/${formIdToDelete}`)
      setForms(forms.filter((form) => form.id !== formIdToDelete))
      setIsDeleteModalOpen(false)
      setFormIdToDelete(null)
      customToast('Form deleted successfully', 'success')
    } catch (err) {
      console.error('Error deleting form:', err)
      customToast('Failed to delete form', 'error')
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setFormIdToDelete(null)
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
    <main className={styles.containerBlock}>
      <div className='container'>
        <div className={styles.header}>
          <Heading level={1} size={1}>
            My Forms:
          </Heading>
          <ButtonFilled onClick={() => router.push('/forms/create')}>
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
                      onClick={() => handleDeleteClick(form.id)}
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

      {isDeleteModalOpen && (
        <RemoveFormModal
          isOpenModal={isDeleteModalOpen}
          setIsOpenModal={setIsDeleteModalOpen}
          handleDeleteConfirm={handleDeleteConfirm}
          handleDeleteCancel={handleDeleteCancel}
        />
      )}
    </main>
  )
}
