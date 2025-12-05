'use client'

import { Text } from '@/components/typography/text/text'
import styles from '../preview-field.module.scss'

interface FieldLabelProps {
  label: string
  required?: boolean
}

export default function FieldLabel({ label, required }: FieldLabelProps) {
  return (
    <Text size={3} bold>
      {label}
      {required && <span className={styles.requiredIndicator}> *</span>}
    </Text>
  )
}

