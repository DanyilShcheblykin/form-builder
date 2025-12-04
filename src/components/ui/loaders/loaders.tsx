import React from 'react'
import classNames from 'classnames'
import styles from './loaders.module.scss'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ripple' | 'wave' | 'cube'
  text?: string
  className?: string
  fullScreen?: boolean
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'gray'
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  text = 'Loading...',
  className = '',
  fullScreen = false,
  color = 'blue',
}) => {
  const sizeClassMap = {
    sm: styles.spinnerSm,
    md: styles.spinnerMd,
    lg: styles.spinnerLg,
    xl: styles.spinnerXl,
  }

  const textSizeClassMap = {
    sm: styles.textSm,
    md: styles.textMd,
    lg: styles.textLg,
    xl: styles.textXl,
  }

  const renderSpinner = () => {
    const colorClassMap = {
      blue: styles.spinnerBlue,
      green: styles.spinnerGreen,
      purple: styles.spinnerPurple,
      orange: styles.spinnerOrange,
      gray: styles.spinnerGray,
    }

    return (
      <div
        className={classNames(
          styles.spinner,
          sizeClassMap[size],
          colorClassMap[color]
        )}
      />
    )
  }

  const renderDots = () => {
    const colorClassMap = {
      blue: styles.dotBlue,
      green: styles.dotGreen,
      purple: styles.dotPurple,
      orange: styles.dotOrange,
      gray: styles.dotGray,
    }

    const dotSizeClassMap = {
      sm: styles.dotSm,
      md: styles.dotMd,
      lg: styles.dotLg,
      xl: styles.dotXl,
    }

    return (
      <div className={styles.dotsContainer}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={classNames(
              styles.dot,
              dotSizeClassMap[size],
              colorClassMap[color]
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    )
  }

  const renderPulse = () => {
    const colorClassMap = {
      blue: styles.pulseBlue,
      green: styles.pulseGreen,
      purple: styles.pulsePurple,
      orange: styles.pulseOrange,
      gray: styles.pulseGray,
    }

    const pulseSizeClassMap = {
      sm: styles.pulseSm,
      md: styles.pulseMd,
      lg: styles.pulseLg,
      xl: styles.pulseXl,
    }

    return (
      <div
        className={classNames(
          styles.pulse,
          pulseSizeClassMap[size],
          colorClassMap[color]
        )}
      />
    )
  }

  const renderBars = () => {
    const colorClassMap = {
      blue: styles.barBlue,
      green: styles.barGreen,
      purple: styles.barPurple,
      orange: styles.barOrange,
      gray: styles.barGray,
    }

    const barSizeClassMap = {
      sm: styles.barSm,
      md: styles.barMd,
      lg: styles.barLg,
      xl: styles.barXl,
    }

    return (
      <div className={styles.barsContainer}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={classNames(
              styles.bar,
              barSizeClassMap[size],
              colorClassMap[color]
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    )
  }

  const renderRipple = () => {
    const rippleSizeClassMap = {
      sm: styles.rippleSm,
      md: styles.rippleMd,
      lg: styles.rippleLg,
      xl: styles.rippleXl,
    }

    return (
      <div className={styles.rippleContainer}>
        <div
          className={classNames(
            styles.rippleOuter,
            rippleSizeClassMap[size]
          )}
        />
        <div
          className={classNames(
            styles.rippleInner,
            rippleSizeClassMap[size]
          )}
        />
      </div>
    )
  }

  const renderWave = () => {
    const colorClassMap = {
      blue: styles.waveBarBlue,
      green: styles.waveBarGreen,
      purple: styles.waveBarPurple,
      orange: styles.waveBarOrange,
      gray: styles.waveBarGray,
    }

    const waveSizeClassMap = {
      sm: styles.waveBarSm,
      md: styles.waveBarMd,
      lg: styles.waveBarLg,
      xl: styles.waveBarXl,
    }

    return (
      <div className={styles.waveContainer}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={classNames(
              styles.waveBar,
              waveSizeClassMap[size],
              colorClassMap[color]
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s',
            }}
          />
        ))}
      </div>
    )
  }

  const renderCube = () => {
    const cubeSizeClassMap = {
      sm: styles.cubeSm,
      md: styles.cubeMd,
      lg: styles.cubeLg,
      xl: styles.cubeXl,
    }

    return (
      <div className={classNames(styles.cubeContainer, cubeSizeClassMap[size])}>
        <div
          className={classNames(
            styles.cubeLayer,
            styles.cubeLayer1,
            cubeSizeClassMap[size]
          )}
        />
        <div
          className={classNames(
            styles.cubeLayer,
            styles.cubeLayer2,
            cubeSizeClassMap[size]
          )}
          style={{ animationDelay: '0.2s' }}
        />
        <div
          className={classNames(
            styles.cubeLayer,
            styles.cubeLayer3,
            cubeSizeClassMap[size]
          )}
          style={{ animationDelay: '0.4s' }}
        />
      </div>
    )
  }

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'bars':
        return renderBars()
      case 'ripple':
        return renderRipple()
      case 'wave':
        return renderWave()
      case 'cube':
        return renderCube()
      default:
        return renderSpinner()
    }
  }

  const content = (
    <div className={classNames(styles.containerBlock, className)}>
      {renderLoader()}
      {text && (
        <p className={classNames(styles.text, textSizeClassMap[size])}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return <div className={styles.fullScreen}>{content}</div>
  }

  return content
}

// Convenience components for common use cases
export const LoadingSpinner: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
    <Loading variant="spinner" {...props} />
);

export const LoadingDots: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
    <Loading variant="dots" {...props} />
);

export const LoadingPulse: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
    <Loading variant="pulse" {...props} />
);

export const LoadingBars: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
    <Loading variant="bars" {...props} />
);

export const LoadingRipple: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
    <Loading variant="ripple" {...props} />
);

export const LoadingWave: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
    <Loading variant="wave" {...props} />
);

export const LoadingCube: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
    <Loading variant="cube" {...props} />
);

export default Loading;
