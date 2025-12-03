import classNames from 'classnames'
import React from 'react'

import styles from './text.module.scss'

const COLOR = {
  default: styles.colorDefault,
  secondary: styles.colorSecondary,
} as const

type Color = keyof typeof COLOR

const getClassForColor = (color: Color) => {
  return COLOR[color] || ''
}

interface IProps {
  bold?: boolean
  center?: boolean
  children?: React.ReactNode
  className?: string
  color?: Color
  size?: 1 | 2 | 3 | 4
  uppercase?: boolean
}

export const Text: React.FC<IProps> = (props) => {
  const {
    bold,
    center,
    children,
    className,
    color = 'default',
    size = 1,
    uppercase = false,
  } = props

  const colorClass = getClassForColor(color)

  const classes = classNames(
    styles.text,
    styles[`p${size}`],
    center && styles.textCenter,
    bold && styles.textBold,
    uppercase && styles.uppercase,
    colorClass,
    className
  )
  return <p className={classes}>{children}</p>
}
