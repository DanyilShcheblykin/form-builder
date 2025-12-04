'use client'

import classNames from 'classnames'
import React, { ForwardedRef, useCallback, useState } from 'react'

import styles from './button.module.scss'
import ButtonRaw from './button-raw'

const BACKGROUND_COLOR = {
  main: styles.mainButton,
  secondary: styles.secondaryButton,
}

type BackgroundColor = keyof typeof BACKGROUND_COLOR

const getClassForColor = (color: BackgroundColor) => {
  return BACKGROUND_COLOR[color] || ''
}

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: BackgroundColor
  isLoading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  ref?: ForwardedRef<HTMLButtonElement>
  type?: 'button' | 'submit'
}

const ButtonFilled: React.FC<IProps> = (props) => {
  const {
    children,
    className,
    color = 'main',
    disabled,
    isLoading = false,
    onClick,
    ref,
    type = 'button',
    ...rest
  } = props

  const [isLoadingInner, setLoadingInner] = useState(false)

  const buttonColorClass = getClassForColor(color)

  const isDisabled = disabled || isLoadingInner || isLoading

  const memoizedClickHandler = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (typeof onClick === 'function') {
        const callResult = onClick(event)
        if (callResult && typeof callResult.then === 'function') {
          setLoadingInner(true)
          try {
            await callResult
          } finally {
            setLoadingInner(false)
          }
        }
      }
    },
    [onClick]
  )

  const showLoader = isLoadingInner || isLoading

  return (
    <ButtonRaw
      className={classNames(buttonColorClass, styles.button, className)}
      onClick={memoizedClickHandler}
      disabled={isDisabled}
      type={type}
      ref={ref}
      {...rest}
    >
      <span className={classNames(showLoader && styles.hiddenText)}>
        {children}
      </span>

      {showLoader && (
        <div className={styles.loaderWrapper}>
          <div className={styles.dorsWrapper}>
            <div className={styles.loaderDot} />
            <div className={styles.loaderDot} />
            <div className={styles.loaderDot} />
          </div>
        </div>
      )}
    </ButtonRaw>
  )
}

export default ButtonFilled
