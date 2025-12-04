'use client'

import CustomModal from '@/components/shared/modal/modal'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import ButtonFilled from '@/components/ui/button/button-filled'
import styles from './remove-form-modal.module.scss'

interface RemoveFormModalProps {
  isOpenModal: boolean
  setIsOpenModal: (isOpen: boolean) => void
  handleDeleteConfirm: () => void
  handleDeleteCancel: () => void
}

const RemoveFormModal = ({
  isOpenModal,
  setIsOpenModal,
  handleDeleteConfirm,
  handleDeleteCancel,
}: RemoveFormModalProps) => {
  return (
    <CustomModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      shouldCloseOnOverlayClick={true}
      showCrossForClose={false}
    >
      <div className={styles.deleteModalContent}>
        <Heading level={2} size={2}>
          Delete Form
        </Heading>
        <Text size={3} color="secondary">
          Do you want to delete this form? This action cannot be undone.
        </Text>
        <div className={styles.deleteModalActions}>
          <ButtonFilled onClick={handleDeleteCancel} color="secondary">
            Cancel
          </ButtonFilled>
          <ButtonFilled onClick={handleDeleteConfirm} className={styles.deleteButton}>
            Delete
          </ButtonFilled>
        </div>
      </div>
    </CustomModal>
  )
}

export default RemoveFormModal