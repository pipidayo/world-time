'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import CountryList from '@/components/CountryList/CountryList'
import SearchBar from '@/components/SearchBar/SearchBar'
import { Country } from '@/types/country'
import { defaultCountries } from '@/data/times'

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])
  const [referenceCountry, setReferenceCountry] = useState<Country | null>(null)
  const [searchResults, setSearchResults] = useState<Country[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  useEffect(() => {
    const savedCountries = localStorage.getItem('countries')
    const savedReference = localStorage.getItem('referenceCountry')

    if (savedCountries) {
      setCountries(JSON.parse(savedCountries))
    } else {
      const japan = defaultCountries.find((country) => country.code === 'JP')
      setCountries([japan!])
    }

    if (savedReference) {
      setReferenceCountry(JSON.parse(savedReference))
    } else {
      const japan = defaultCountries.find((country) => country.code === 'JP')
      setReferenceCountry(japan!)
    }
  }, [])

  useEffect(() => {
    if (countries.length > 0) {
      localStorage.setItem('countries', JSON.stringify(countries))
    }
  }, [countries])

  useEffect(() => {
    if (referenceCountry) {
      localStorage.setItem('referenceCountry', JSON.stringify(referenceCountry))
    }
  }, [referenceCountry])

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setCountries((items) => {
        const oldIndex = items.findIndex((item) => item.code === active.id)
        const newIndex = items.findIndex((item) => item.code === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSearch = (query: string) => {
    const results = defaultCountries.filter(
      (country) =>
        !countries.some((c) => c.code === country.code) &&
        (country.nameJa.toLowerCase().includes(query.toLowerCase()) ||
          country.nameEn.toLowerCase().includes(query.toLowerCase()))
    )
    setSearchResults(results)
  }

  const handleAddCountry = (country: Country) => {
    setCountries((prev) => [...prev, country])
    setSearchResults([])
  }

  const handleSetReference = (country: Country) => {
    setReferenceCountry(country)
  }

  return (
    <div className='min-h-screen bg-background p-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>World Clock</h1>

      <SearchBar
        onSearch={setSearchResults}
        allCountries={defaultCountries}
        onSelect={handleAddCountry}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={countries.map((country) => country.code)}
          strategy={horizontalListSortingStrategy}
        >
          <CountryList
            countries={countries}
            referenceCountry={referenceCountry}
            onSetReference={handleSetReference}
          />
        </SortableContext>
      </DndContext>
    </div>
  )
}
