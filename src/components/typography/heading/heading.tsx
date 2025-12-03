import classNames from 'classnames'
import React, { JSX } from 'react'

import styles from './heading.module.scss'

interface IProps {
  center?: boolean
  children?: React.ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  uppercase?: boolean
  bold?: boolean
}

export const Heading: React.FC<IProps> = (props) => {
  const {
    center,
    children,
    className,
    level = 1,
    size,
    uppercase,
    bold,
  } = props

  const TagName = `h${level}` as keyof JSX.IntrinsicElements

  const classes = classNames(
    styles.heading,
    styles[`h${level}`],
    !!size && styles[`size${size}`],
    center && styles.textCenter,
    uppercase && styles.uppercase,
    bold && styles.bold,
    className
  )
  return <TagName className={classes}>{children}</TagName>
}
