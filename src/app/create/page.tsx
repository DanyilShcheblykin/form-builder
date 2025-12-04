'use client'

import FormBuilder from '../../components/form-builder/form-builder'
import { useRouter } from 'next/navigation'
import ButtonFilled from '../../components/ui/button/button-filled'
import styles from './create.module.scss'

export default function CreateFormPage() {
  const router = useRouter()

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <ButtonFilled onClick={() => router.push('/forms')} color="secondary">
          ← Back to Forms
        </ButtonFilled>
      </div>
      <FormBuilder />
    </main>
  )
}

