import styles from './progress-bar.module.scss'

interface IProps {
  current: number
  total: number
  value: number
  children?: React.ReactNode
}

export const ProgressBar: React.FC<IProps> = (props) => {
  const { value, current, total, children } = props
  const normalizedValue = Number.isFinite(value)
    ? Math.max(0, Math.min(1, value))
    : 0

  return (
    <div className={styles.progressBlock}>
      <div className={styles.progressHeader}>
        <div className={styles.progressHeaderLeft}>{children}</div>

        <div className={styles.counter}>
          <span className={styles.progressCurrent}>{current}</span>
          <span className={styles.progressSlash}>/</span>
          <span className={styles.progressTotal}>{total}</span>
        </div>
      </div>

      <meter
        className={styles.barIndicator}
        min={0}
        max={1}
        value={normalizedValue}
        aria-label={`${current} / ${total}`}
      />
    </div>
  )
}
