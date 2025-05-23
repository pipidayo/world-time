export interface Country {
  code: string
  state?: string
  nameJa: string
  nameEn: string
  pronunciations?: string[]
  timezone: string
  offset: number
}

export interface TimeDifferenceProps {
  difference: number
}

export interface TimeDisplayProps {
  date: Date
}

export interface CountryDisplayProps {
  country: Country
  isReference: boolean
  onSetReference: () => void
  referenceOffset: number
}
