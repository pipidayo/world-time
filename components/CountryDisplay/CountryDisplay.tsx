'use client'

import { CountryDisplayProps } from '@/types/country'
import TimeDisplay from '@/components/TimeDisplay/TimeDisplay'
import TimeDifference from '@/components/TimeDifference/TimeDifference'
import styles from './CountryDisplay.module.scss'
import { Button } from '@/components/ui/button'

export default function CountryDisplay({
  country,
  isReference,
  onSetReference,
  referenceOffset,
}: CountryDisplayProps) {
  const currentDate = new Date()
  const localOffset = currentDate.getTimezoneOffset()
  const targetOffset = (country.offset - -localOffset / 60) * 60 * 60 * 1000
  const targetDate = new Date(currentDate.getTime() + targetOffset)

  const timeDifference = country.offset - referenceOffset

  return (
    <div className={`${styles.root} ${styles.countryCard}`}>
      <h2>
        <span>{country.nameJa}</span>
        <span>({country.nameEn})</span>
      </h2>
      <TimeDisplay date={targetDate} />
      <div className={styles.reference}>
        {!isReference && <TimeDifference difference={timeDifference} />}
        <Button
          variant={isReference ? 'secondary' : 'default'}
          onClick={onSetReference}
          className={`${styles.referenceButton} ${isReference ? styles.isReference : ''}`}
        >
          {isReference ? '基準国' : '基準国に設定'}
        </Button>
      </div>
    </div>
  )
}
