'use client'

import { useRouter } from 'next/navigation'
import { SavedForm } from '@/types/database'

import styles from './form-card.module.scss'
import FormCardHeader from './form-card-header/form-card-header'
import FormCardMeta from './form-card-meta/form-card-meta'

interface FormCardProps {
  form: SavedForm
  onDeleteClick: (formId: string) => void
}

export default function FormCard({ form, onDeleteClick }: FormCardProps) {
  const router = useRouter()

  return (
    <div className={styles.formCard}>
      <FormCardHeader
        form={form}
        onViewClick={() => router.push(`/forms/${form.id}`)}
        onEditClick={() => router.push(`/forms/${form.id}/edit`)}
        onDeleteClick={() => onDeleteClick(form.id)}
      />
      <FormCardMeta 
        form={form} 
        onSubmissionsClick={() => router.push(`/forms/${form.id}/submissions`)}
      />
    </div>
  )
}

