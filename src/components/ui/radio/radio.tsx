import { forwardRef, type InputHTMLAttributes } from 'react'
import styles from './radio.module.scss'
import classNames from 'classnames'
import { ErrorMessage } from '../error-message/error-message'

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children?: React.ReactNode
  error?: string
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, IProps>(
  ({ children, label, error, ...props }, ref) => {
    return (
      <div className={styles.radioBlock}>
        <label className={styles.radioLabel}>
          <div className={styles.radio}>
            <input
              type="radio"
              className={styles.input}
              ref={ref}
              {...props}
            />

            <span
              className={classNames(
                styles.radiomark,
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

Radio.displayName = 'Radio'

