'use client'

import { SavedForm } from '@/types/database'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from '../../forms.module.scss'

interface FormCardHeaderProps {
  form: SavedForm
  onViewClick: () => void
  onEditClick: () => void
  onDeleteClick: () => void
}

export default function FormCardHeader({
  form,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: FormCardHeaderProps) {
  return (
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
        <ButtonFilled onClick={onViewClick} color="secondary">
          View
        </ButtonFilled>
        <ButtonFilled onClick={onEditClick} color="secondary">
          Edit
        </ButtonFilled>
        <ButtonFilled
          onClick={onDeleteClick}
          color="secondary"
          className={styles.deleteButton}
        >
          Delete
        </ButtonFilled>
      </div>
    </div>
  )
}

