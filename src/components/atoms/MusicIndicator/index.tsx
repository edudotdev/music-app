
import styles from './musicIndicator.module.css'

interface MusicIndicatorProps {
  active: boolean
}

export const MusicIndicator = ({
  active
}:MusicIndicatorProps) => {
  return (
    <div className={styles.icon}>
      <span className={`${active? styles.bar : styles.barS}`} />
      <span className={`${active? styles.bar : styles.barS}`} />
      <span className={`${active? styles.bar : styles.barS}`} />
      <span className={`${active? styles.bar : styles.barS}`} />
    </div>
  )
}
