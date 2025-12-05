'use client'

import { useRouter } from 'next/navigation'
import { Heading } from '@/components/typography/heading/heading'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from '../forms.module.scss'

export default function FormsHeader() {
  const router = useRouter()

  return (
    <div className={styles.header}>
      <Heading level={1} size={1}>
        My Forms:
      </Heading>
      <ButtonFilled color="main" onClick={() => router.push('/forms/create')}>
        Create Form
      </ButtonFilled>
    </div>
  )
}

