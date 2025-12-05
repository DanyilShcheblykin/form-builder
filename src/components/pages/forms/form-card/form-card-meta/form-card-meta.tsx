'use client'

import { SavedForm } from '@/types/database'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import { Copy } from 'lucide-react'
import { customToast } from '@/components/shared/custom-toast/custom-toast'
import styles from './form-card-meta.module.scss'
import { formatDate } from '../../utils/date-utils'

interface FormCardMetaProps {
  form: SavedForm
}

export default function FormCardMeta({ form }: FormCardMetaProps) {
  const handleCopyLink = async () => {
    const formUrl = `${window.location.origin}/forms/${form.id}`

    try {
      await navigator.clipboard.writeText(formUrl)
      customToast('Link copied to clipboard!', 'success')
    } catch (err) {
      customToast('Failed to copy link', 'error')
    }
  }

  return (
    <div className={styles.formCardMetaContainer}>
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
      <ButtonFilled
        onClick={handleCopyLink}
        color="secondary"
        className={styles.copyButton}
        title="Copy link"
      >
        <Copy size={16} />
        <span>Copy link</span>
      </ButtonFilled>
    </div>

  )
}

