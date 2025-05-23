'use client'

import { TimeDifferenceProps } from '@/types/country'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import styles from './TimeDifference.module.scss'

export default function TimeDifference({ difference }: TimeDifferenceProps) {
  const isPositive = difference > 0
  const absoluteDifference = Math.abs(difference)

  return (
    <div
      className={`${styles.root} ${styles.timeDifference} ${isPositive ? styles.positive : styles.negative}`}
    >
      {isPositive ? (
        <>
          <ArrowRight className={styles.arrow} />+{absoluteDifference}:00
        </>
      ) : (
        <>
          <ArrowLeft className={styles.arrow} />-{absoluteDifference}:00
        </>
      )}
    </div>
  )
}
