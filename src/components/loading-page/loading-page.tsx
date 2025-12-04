import { LoadingSpinner } from '../ui/loaders/loaders'
import styles from './loading-page.module.scss'

const LoadingPage = ({ text }: { text: string }) => {
  return (
    <div className={styles.container}>
      <LoadingSpinner size="xl" color="blue" text={text} />
    </div>
  )
}

export default LoadingPage