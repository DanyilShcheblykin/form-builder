import classNames from 'classnames'
import React from 'react'
import styles from './button-loader.module.scss'

interface LoaderInterface {
  className?: string
  description?: string
  children?: React.ReactNode
  isBlured?: boolean
}

const ButtonLoader: React.FC<LoaderInterface> = ({
  children,
  className,
  description,
  isBlured = true,
}) => {
  return (
    <div
      className={classNames(
        styles.loader,
        isBlured && styles.blured,
        className
      )}
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

export default ButtonLoader
