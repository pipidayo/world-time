'use client'

import { useDroppable } from '@dnd-kit/core'
import { Country } from '@/types/country'
import styles from './DeletionZone.module.scss'

interface DeletionZoneProps {
  onRemoveCountry: (country: Country) => void
}

const DeletionZone = ({ onRemoveCountry }: DeletionZoneProps) => {
  const { setNodeRef } = useDroppable({
    id: 'deletion-zone',
  })

  return (
    <div ref={setNodeRef} className={styles.deletionZone}>
      <span>ここに国をドラッグして削除</span>
    </div>
  )
}

export default DeletionZone
