'use client'

import { useState, useMemo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Country } from '@/types/country'
import CountryDisplay from '@/components/CountryDisplay/CountryDisplay'
import styles from './CountryList.module.scss'

interface CountryListProps {
  countries: Country[]
  referenceCountry: Country | null
  onSetReference: (country: Country) => void
}

function SortableCountry({
  country,
  isReference,
  onSetReference,
  referenceOffset,
}: {
  country: Country
  isReference: boolean
  onSetReference: () => void
  referenceOffset: number
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: country.code })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.countryItem}
    >
      <CountryDisplay
        country={country}
        isReference={isReference}
        onSetReference={onSetReference}
        referenceOffset={referenceOffset}
      />
    </div>
  )
}

export default function CountryList({
  countries,
  referenceCountry,
  onSetReference,
}: CountryListProps) {
  const [isAutoSort, setIsAutoSort] = useState(true)

  // 時差ごとにグループ化
  const groupedCountries = useMemo(() => {
    if (!referenceCountry || !isAutoSort) return { manual: countries }

    return countries.reduce<{ [key: number]: Country[] }>((acc, country) => {
      const difference = country.offset - referenceCountry.offset
      if (!acc[difference]) acc[difference] = []
      acc[difference].push(country)
      return acc
    }, {})
  }, [countries, referenceCountry, isAutoSort])

  return (
    <div>
      <div className={styles.change}>
        <button onClick={() => setIsAutoSort((prev) => !prev)}>
          {isAutoSort ? '自動' : '手動'}
        </button>
      </div>
      <div className={`${styles.root} ${styles.countryList}`}>
        {isAutoSort
          ? Object.entries(groupedCountries)
              .sort(([a], [b]) => Number(a) - Number(b)) // 時差順に並べる
              .map(([difference, countryGroup]) => {
                // 基準国を最上部に配置
                const reference = countryGroup.find(
                  (c) => c.code === referenceCountry?.code
                )
                const otherCountries = countryGroup.filter(
                  (c) => c.code !== referenceCountry?.code
                )

                return (
                  <div key={difference} className={styles.timeGroup}>
                    {reference && (
                      <SortableCountry
                        key={reference.code}
                        country={reference}
                        isReference={true}
                        onSetReference={() => {}}
                        referenceOffset={referenceCountry?.offset || 0}
                      />
                    )}
                    {otherCountries.map((country) => (
                      <SortableCountry
                        key={country.code}
                        country={country}
                        isReference={false}
                        onSetReference={() => onSetReference(country)}
                        referenceOffset={referenceCountry?.offset || 0}
                      />
                    ))}
                  </div>
                )
              })
          : countries.map((country) => (
              <SortableCountry
                key={country.code}
                country={country}
                isReference={referenceCountry?.code === country.code}
                onSetReference={() => onSetReference(country)}
                referenceOffset={referenceCountry?.offset || 0}
              />
            ))}
      </div>
    </div>
  )
}
