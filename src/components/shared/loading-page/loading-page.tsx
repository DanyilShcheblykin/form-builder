import { LoadingSpinner } from '@/components/ui/loaders/loaders'
import styles from './loading-page.module.scss'

const LoadingPage = ({ text }: { text: string }) => {
  return (
    <div className={styles.containerBlock}>
      <LoadingSpinner size="xl" color="blue" text={text} />
    </div>
  )
}

export default LoadingPage