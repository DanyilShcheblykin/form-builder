'use client'

import { FormSubmission, SavedForm } from '@/types/database'
import Modal from '@/components/shared/modal/modal'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import { formatDate } from '../../utils/date-utils'
import styles from './submission-detail-modal.module.scss'

interface SubmissionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  submission: FormSubmission
  form: SavedForm
}

export default function SubmissionDetailModal({
  isOpen,
  onClose,
  submission,
  form,
}: SubmissionDetailModalProps) {
  const renderFieldValue = (fieldId: string, value: any) => {
    const field = form.form_data.steps
      .flatMap((step) => step.fields)
      .find((f) => f.id === fieldId)

    if (!field) return <Text size={3}>{String(value)}</Text>

    switch (field.type) {
      case 'checkbox':
        if (Array.isArray(value)) {
          return (
            <div className={styles.checkboxValues}>
              {value.map((item: string, index: number) => (
                <Text key={index} size={3}>
                  • {item}
                </Text>
              ))}
            </div>
          )
        }
        return <Text size={3}>{String(value)}</Text>

      case 'radio':
      case 'select':
        return <Text size={3}>{String(value)}</Text>

      case 'textarea':
        return (
          <Text size={3} className={styles.textareaValue}>
            {String(value)}
          </Text>
        )

      default:
        return <Text size={3}>{String(value)}</Text>
    }
  }

  return (
    <Modal
      isOpenModal={isOpen}
      setIsOpenModal={(open) => {
        if (!open) {
          onClose()
        }
      }}
      modalContentStyles={{ maxWidth: '32rem' }}
    >
      <div className={styles.modalContent}>
        <Heading level={2} size={2}>
          Submission Details
        </Heading>

        <div className={styles.userInfo}>
          <div className={styles.infoRow}>
            <Text size={3} color="secondary">
              <strong>Name:</strong> {submission.name}
            </Text>
          </div>
          <div className={styles.infoRow}>
            <Text size={3} color="secondary">
              <strong>Email:</strong> {submission.email}
            </Text>
          </div>
          <div className={styles.infoRow}>
            <Text size={3} color="secondary">
              <strong>Submitted:</strong> {formatDate(submission.submitted_at)}
            </Text>
          </div>
        </div>

        <div className={styles.fieldsSection}>
          <Heading level={3} size={3} className={styles.sectionTitle}>
            Form Responses
          </Heading>
          <div className={styles.fieldsList}>
            {Object.entries(submission.submission_data).map(([fieldId, value]) => {
              const field = form.form_data.steps
                .flatMap((step) => step.fields)
                .find((f) => f.id === fieldId)

              if (!field) return null

              return (
                <div key={fieldId} className={styles.fieldItem}>
                  <Text size={3} className={styles.fieldLabel}>
                    {field.label}
                    {field.required && <span className={styles.required}> *</span>}
                  </Text>
                  <div className={styles.fieldValue}>
                    {renderFieldValue(fieldId, value)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Modal>
  )
}

