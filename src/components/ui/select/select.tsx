import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './select.module.scss'
import { ErrorMessage } from '../error-message/error-message'
import ReactSelect, {
  GroupBase,
  Props as ReactSelectProps,
  SelectInstance,
  StylesConfig,
  CSSObjectWithLabel,
} from 'react-select'

type Option = unknown
type IsMulti = boolean
type Group = GroupBase<Option>

interface IProps extends ReactSelectProps<Option, IsMulti, Group> {
  error?: string
  label?: string
  noOptionsText?: string
  className?: string
}

const Select = React.forwardRef<SelectInstance<Option, IsMulti, Group>, IProps>(
  ({ label, error, noOptionsText, className, ...props }, ref) => {
    const [isClient, setIsClient] = useState(false)

    const customStyles: StylesConfig<Option, IsMulti, Group> = {
      control: (provided: CSSObjectWithLabel, state: any) => ({
        ...provided,
        minHeight: 'var(--input-height)',
        borderRadius: '8.25rem',
        backgroundColor: 'var(--input-background)',
        fontSize: 'var(--input-font-size)',
        fontFamily: 'Poppins',
        fontWeight: 400,
        lineHeight: 'normal',
        color: 'var(--color-text)',
        transition: 'all 0.3s ease',
        boxShadow: 'none',
        padding: '0 0.5rem 0 1rem',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        opacity: state.isDisabled ? 0.6 : 1,
        border: error
          ? '0.0625rem solid var(--input-error-border-color)'
          : state.menuIsOpen
            ? '0.0625rem solid var(--input-border-active)'
            : '0.0625rem solid var(--input-border)',

        '&:hover': {
          borderColor: 'var(--input-border-hover)',
        },
        '&:focus': {
          borderColor: 'var(--input-border-active)',
        },
      }),

      valueContainer: (provided: CSSObjectWithLabel) => ({
        ...provided,
        padding: 0,
        fontFamily: 'Poppins',
      }),

      placeholder: (provided: CSSObjectWithLabel) => ({
        ...provided,
        color: 'var(--input-placeholder)',
        fontSize: 'var(--input-font-size)',
        fontFamily: 'Poppins',
      }),

      input: (provided: CSSObjectWithLabel) => ({
        ...provided,
        margin: 0,
        padding: 0,
        fontFamily: 'Poppins',
        color: 'var(--color-text)',
      }),

      dropdownIndicator: (provided: CSSObjectWithLabel, state: any) => ({
        ...provided,
        padding: '0 0.5rem',
        color: 'var(--color-text-secondary)',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
        transition: 'transform var(--transition-base)',
      }),

      indicatorSeparator: () => ({
        display: 'none',
      }),

      option: (provided: CSSObjectWithLabel, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused || state.isSelected
          ? 'var(--color-surface-hover)'
          : 'var(--color-background)',
        fontFamily: 'Poppins',
        fontWeight: 400,
        padding: '0.6rem 1.25rem',
        fontSize: 'var(--input-font-size)',
        color: state.isDisabled ? 'var(--color-text-muted)' : 'var(--color-text)',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      }),

      menu: (provided: CSSObjectWithLabel) => ({
        ...provided,
        zIndex: 999999,
        borderRadius: '0.75rem',
        boxShadow: 'var(--card-shadow-elevated)',
        overflow: 'hidden',
        fontFamily: 'Poppins',
      }),

      menuPortal: (provided: CSSObjectWithLabel) => ({
        ...provided,
        zIndex: 999999,
      }),

      multiValue: (provided: CSSObjectWithLabel) => ({
        ...provided,
        backgroundColor: 'var(--color-background)',
        borderRadius: '0.5rem',
        padding: '0',
        fontFamily: 'Poppins',
      }),

      multiValueLabel: (provided: CSSObjectWithLabel) => ({
        ...provided,
        fontSize: '0.8rem',
        fontFamily: 'Poppins',
        padding: '0',
      }),

      multiValueRemove: (provided: CSSObjectWithLabel) => ({
        ...provided,
        display: 'none',
      }),

      loadingIndicator: (provided: CSSObjectWithLabel) => ({
        ...provided,
        padding: '0 4px',
        transform: 'scale(0.6)',
        marginRight: 4,
      }),

      indicatorsContainer: (provided: CSSObjectWithLabel) => ({
        ...provided,
        gap: 4,
      }),

      singleValue: (provided: CSSObjectWithLabel) => ({
        ...provided,
        gap: 4,
        borderRadius: '0',
        padding: '0',
      }),

      noOptionsMessage: (provided: CSSObjectWithLabel) => ({
        ...provided,
        fontFamily: 'Poppins',
        fontSize: '0.8rem',
      }),
    }

    const noOptionsMessage = () => noOptionsText ?? `No options or loading...`
    const placeholder = (props as any).placeholder ?? `Select...`

    useEffect(() => {
      setIsClient(true)
    }, [])

    return (
      <div className={classNames(styles.selectWrapper, className)}>
        {!!label && <span className={styles.labelContent}>{label}</span>}

        {isClient ? (
          <ReactSelect
            key="select"
            styles={customStyles}
            menuShouldScrollIntoView={false}
            menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
            placeholder={placeholder}
            noOptionsMessage={noOptionsMessage}
            ref={ref}
            className={className}
            {...props}
          />
        ) : (
          <span className={styles.fakeInput} />
        )}

        {!!error && <ErrorMessage errorMessage={error} />}
      </div>
    )
  })

export default Select
