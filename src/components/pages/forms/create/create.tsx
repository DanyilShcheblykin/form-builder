'use client'

import FormBuilder from '../shared/form-builder/form-builder'
import { useRouter } from 'next/navigation'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from './create.module.scss'

export default function CreateFormPageComponent() {
  const router = useRouter()

  return (
    <main className={styles.containerBlock}>
      <div className={styles.header}>
        <ButtonFilled onClick={() => router.push('/forms')} color="secondary">
          ← Back to Forms
        </ButtonFilled>
      </div>
      <div className={styles.contentWrapper}>
        <FormBuilder />
      </div>
    </main>
  )
}

