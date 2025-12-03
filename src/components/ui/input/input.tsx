import React, { forwardRef } from 'react'
import { InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './input.module.scss'

import { ErrorMessage } from '../error-message/error-message'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={styles.inputBlock}>
        <label className={styles.inputLabel}>
          {!!label && <span className={styles.labelContent}>{label}</span>}

          <input
            ref={ref}
            className={classNames(
              styles.input,
              className,
              !!error && styles.errorInput
            )}
            {...props}
          />

          {!!error && <ErrorMessage errorMessage={error} />}
        </label>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
