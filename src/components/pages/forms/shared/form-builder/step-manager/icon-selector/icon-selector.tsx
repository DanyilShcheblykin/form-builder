'use client'

import { useState } from 'react'
import ButtonFilled from '@/components/ui/button/button-filled'
import * as LucideIcons from 'lucide-react'
import classNames from 'classnames'
import styles from './icon-selector.module.scss'
import { popularIcons } from './data'

interface IconSelectorProps {
  currentIcon: string
  onSelectIcon: (icon: string) => void
}

export default function IconSelector({
  currentIcon,
  onSelectIcon,
}: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] as React.ComponentType<{ size?: number }>
    return IconComponent ? <IconComponent size={16} /> : null
  }

  return (
    <div className={styles.iconSelector}>
      <ButtonFilled
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        color="secondary"
        className={styles.iconSelectorButton}
      >
        {getIcon(currentIcon)} Icon
      </ButtonFilled>

      {isOpen && (
        <>
          <div
            className={styles.iconSelectorOverlay}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={styles.iconSelectorDropdown}
            onClick={(e) => e.stopPropagation()}
          >
            {popularIcons.map((iconName: string) => (
              <button
                key={iconName}
                onClick={() => {
                  onSelectIcon(iconName)
                  setIsOpen(false)
                }}
                className={classNames(styles.iconButton, {
                  [styles.selected]: currentIcon === iconName,
                })}
              >
                {getIcon(iconName)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

