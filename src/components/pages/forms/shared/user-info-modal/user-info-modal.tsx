'use client'

import { useState } from 'react'
import Modal from '@/components/shared/modal/modal'
import Input from '@/components/ui/input/input'
import ButtonFilled from '@/components/ui/button/button-filled'
import { Heading } from '@/components/typography/heading/heading'
import styles from './user-info-modal.module.scss'

interface UserInfoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, email: string) => void
}

export default function UserInfoModal({ isOpen, onClose, onSubmit }: UserInfoModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { name?: string; email?: string } = {}
    
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onSubmit(name.trim(), email.trim())
    setName('')
    setEmail('')
    setErrors({})
  }

  const handleClose = () => {
    setName('')
    setEmail('')
    setErrors({})
    onClose()
  }

  return (
    <Modal 
      isOpenModal={isOpen} 
      setIsOpenModal={(open) => {
        if (!open) {
          handleClose()
        }
      }}
      shouldCloseOnOverlayClick={false}
    >
      <div className={styles.modalContent}>
        <Heading level={2} size={2}>
          Please enter your information
        </Heading>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors({ ...errors, name: undefined })
            }}
            error={errors.name}
            required
            autoFocus
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors({ ...errors, email: undefined })
            }}
            error={errors.email}
            required
          />
          <div className={styles.actions}>
            <ButtonFilled type="submit">
              Continue
            </ButtonFilled>
          </div>
        </form>
      </div>
    </Modal>
  )
}

