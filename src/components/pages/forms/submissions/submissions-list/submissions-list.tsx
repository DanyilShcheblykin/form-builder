'use client'

import { FormSubmission, SavedForm } from '@/types/database'
import { Text } from '@/components/typography/text/text'
import SubmissionCard from '../submission-card/submission-card'
import styles from './submissions-list.module.scss'

interface SubmissionsListProps {
  submissions: FormSubmission[]
  form: SavedForm
}

export default function SubmissionsList({ submissions, form }: SubmissionsListProps) {
  if (submissions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text size={2} color="secondary">
          No submissions yet. Share the form link to collect responses!
        </Text>
      </div>
    )
  }

  return (
    <div className={styles.submissionsList}>
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} form={form} />
      ))}
    </div>
  )
}

