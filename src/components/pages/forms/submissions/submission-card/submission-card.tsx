'use client'

import { useState } from 'react'
import { FormSubmission, SavedForm } from '@/types/database'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import SubmissionDetailModal from '../submission-detail-modal/submission-detail-modal'
import { formatDate } from '../../utils/date-utils'
import styles from './submission-card.module.scss'

interface SubmissionCardProps {
  submission: FormSubmission
  form: SavedForm
}

export default function SubmissionCard({ submission, form }: SubmissionCardProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  return (
    <>
      <div className={styles.submissionCard}>
        <div className={styles.cardHeader}>
          <div>
            <Heading level={3} size={3}>
              {submission.name}
            </Heading>
            <Text size={4} color="secondary" className={styles.email}>
              {submission.email}
            </Text>
          </div>
        </div>
        <div className={styles.cardMeta}>
          <Text size={4} color="secondary">
            Submitted: {formatDate(submission.submitted_at)}
          </Text>
        </div>
        <div className={styles.cardActions}>
          <ButtonFilled onClick={() => setIsDetailModalOpen(true)} color="secondary">
            View Details
          </ButtonFilled>
        </div>
      </div>

      <SubmissionDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        submission={submission}
        form={form}
      />
    </>
  )
}

