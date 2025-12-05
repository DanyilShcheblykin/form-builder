'use client'

import { SavedForm } from '@/types/database'
import { Text } from '@/components/typography/text/text'
import styles from '../../forms.module.scss'
import { formatDate } from '../../utils/date-utils'

interface FormCardMetaProps {
  form: SavedForm
}

export default function FormCardMeta({ form }: FormCardMetaProps) {
  return (
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
  )
}

