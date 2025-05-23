'use client'

import { useState } from 'react'
import { Country } from '@/types/country'
import { Input } from '@/components/ui/input'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  onSearch: (filteredResults: Country[]) => void
  allCountries: Country[]
  onSelect: (country: Country) => void
}

export default function SearchBar({
  onSearch,
  allCountries,
  onSelect,
}: SearchBarProps) {
  const [query, setQuery] = useState('')

  const filterByFirstLetter = (input: string) => {
    return allCountries.filter(
      (country) =>
        country.nameJa.startsWith(input) ||
        country.nameEn.toLowerCase().startsWith(input.toLowerCase())
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(filterByFirstLetter(value))
  }

  const handleSelect = (country: Country) => {
    onSelect(country)
    setQuery('')
    onSearch([]) // 選択後は候補をクリア
  }

  return (
    <div className={`${styles.root} ${styles.searchContainer}`}>
      <Input
        type='text'
        value={query}
        onChange={handleChange}
        placeholder='国名を検索（日本語・英語）'
        className={styles.searchInput}
      />

      {query && (
        <div className={styles.results}>
          {filterByFirstLetter(query).map((country) => (
            <div
              key={country.code}
              className={styles.result}
              onClick={() => handleSelect(country)}
            >
              <div className={styles.name}>
                {country.nameJa} ({country.nameEn})
              </div>
              <div className={styles.subtext}>{country.timezone}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
