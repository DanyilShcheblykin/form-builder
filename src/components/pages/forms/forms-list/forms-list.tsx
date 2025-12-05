'use client'

import { SavedForm } from '@/types/database'
import { Text } from '@/components/typography/text/text'
import styles from '../forms.module.scss'
import FormCard from '../form-card/form-card'

interface FormsListProps {
  forms: SavedForm[]
  onDeleteClick: (formId: string) => void
}

export default function FormsList({ forms, onDeleteClick }: FormsListProps) {
  if (forms.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text size={2} color="secondary">
          No forms yet. Create your first form!
        </Text>
      </div>
    )
  }

  return (
    <div className={styles.formsList}>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  )
}

