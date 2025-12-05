'use client'

import { useEffect, useState } from 'react'
import { SavedForm } from '@/types/database'
import styles from './forms.module.scss'
import LoadingPage from '@/components/shared/loading-page/loading-page'
import { customToast } from '@/components/shared/custom-toast/custom-toast'
import RemoveFormModal from './remove-form-modal/remove-form-modal'
import FormsHeader from './forms-header/forms-header'
import FormsList from './forms-list/forms-list'
import apiClient from '@/lib/api/client'

export default function FormsPageComponent() {
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

  if (isLoading) return <LoadingPage text="Loading forms..." />

  return (
    <main className={styles.containerBlock}>
      <div className='container'>
        <FormsHeader />
        <FormsList forms={forms} onDeleteClick={handleDeleteClick} />
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
