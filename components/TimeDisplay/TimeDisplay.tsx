'use client'

import { TimeDisplayProps } from '@/types/country'
import styles from './TimeDisplay.module.scss'

export default function TimeDisplay({ date }: TimeDisplayProps) {
  const format24h = date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const format12h = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div className={`${styles.root} ${styles.timeDisplay}`}>
      <div className={styles.time}>{format24h}</div>
      <div className={styles.format}>{format12h}</div>
    </div>
  )
}
