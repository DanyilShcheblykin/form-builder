import { forwardRef, type InputHTMLAttributes } from 'react'
import styles from './checkbox.module.scss'
import classNames from 'classnames'
import { ErrorMessage } from '../error-message/error-message'

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children?: React.ReactNode
  error?: string
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, IProps>(
  ({ children, label, error, ...props }, ref) => {
    return (
      <div className={styles.checkboxBlock}>
        <label className={styles.checkboxLabel}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              className={styles.input}
              ref={ref}
              {...props}
            />

            <span
              className={classNames(
                styles.checkmark,
                props.disabled && styles.disabled
              )}
            />
          </div>

          {!!label && (
            <span className={classNames(styles.labelContent)}>{label}</span>
          )}
        </label>

        {children}

        {!!error && <ErrorMessage errorMessage={error} />}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
