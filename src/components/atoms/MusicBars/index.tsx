import styles from './musicbars.module.css'

interface MusicBarsProps {
  active: boolean
}

export const MusicBars = ({
  active
}:MusicBarsProps) => {
  return (
    <div className={styles.icon}>
      <span className={`${active? styles.bar : styles.barS}`} />
      <span className={`${active? styles.bar : styles.barS}`} />
      <span className={`${active? styles.bar : styles.barS}`} />
      <span className={`${active? styles.bar : styles.barS}`} />
    </div>
  )
}