import classNames from 'classnames'
import React from 'react'

import styles from './loader.module.scss'

interface IProps {
  children?: React.ReactNode
  className?: string
  description?: string
  open?: boolean
  overlay?: boolean
}

export const Loader: React.FC<IProps> = ({
  children,
  className,
  description,
  open = true,
  overlay = false,
}) => {
  return (
    <div
      role="status"
      aria-busy={open}
      data-open={open}
      data-overlay={overlay}
      className={classNames(
        styles.loader,
        overlay && styles.overlay,
        open ? styles.open : styles.closed,
        className
      )}
      aria-hidden={!open}
    >
      <div className={styles.dorsWrapper}>
        <div className={styles.loaderDot} />
        <div className={styles.loaderDot} />
        <div className={styles.loaderDot} />
      </div>

      {description && <span>{description}</span>}

      {children}
    </div>
  )
}
