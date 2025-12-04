'use client'

import { X } from 'lucide-react'
import React, { CSSProperties, ReactNode, useEffect } from 'react'
import ReactModal from 'react-modal'
import styles from './modal.module.scss'
import useLockBodyScroll from '@/hooks/use-lock-body-scroll'
import classNames from 'classnames'

interface IProps {
  buttonText?: string
  children: ReactNode
  childrenContainerStyles?: CSSProperties
  closePosition?: string
  isFetching?: boolean
  isOpenModal: boolean
  modalContentStyles?: CSSProperties
  paddingForMainContainer?: string
  setIsOpenModal: (isOpen: boolean) => void
  shouldCloseOnOverlayClick?: boolean
  showCrossForClose?: boolean
}

const CustomModal: React.FC<IProps> = ({
  children,
  childrenContainerStyles,
  isOpenModal,
  modalContentStyles,
  setIsOpenModal,
  shouldCloseOnOverlayClick = true,
  showCrossForClose = true,
}) => {
  const closeModal = () => {
    setIsOpenModal(false)
  }

  useLockBodyScroll(isOpenModal)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      ReactModal.setAppElement(document.body)
    }
  }, [])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      isOpen={isOpenModal}
      className={styles.reactModal}
      style={{
        content: modalContentStyles,
      }}
      closeTimeoutMS={100}
      onRequestClose={closeModal}
      overlayClassName={{
        afterOpen: styles.overlayEnter,
        base: styles.overlay,
        beforeClose: styles.overlayExit,
      }}
    >
      {showCrossForClose && (
        <button onClick={closeModal} className={styles.closeButton}>
          <X size={20} color="#41424a" />
        </button>
      )}

      <div
        style={childrenContainerStyles}
        className={classNames(styles.modal, 'scrollable')}
      >
        {children}
      </div>
    </ReactModal>
  )
}

export default CustomModal
