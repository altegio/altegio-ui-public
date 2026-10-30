export type TAltCountry = {
  id: number
  title: string
  fullTitle: string
  iso2: string
  code: string
  mask: string
}

export type TAltCountryData = Omit<TAltCountry, 'title' | 'fullTitle'>
export type TAltCountryName = Pick<TAltCountry, 'title' | 'fullTitle'>

export type TAltCountryMappedById = Record<TAltCountry['id'], TAltCountry>
export type TAltCountryDataMappedById = Record<TAltCountry['id'], TAltCountryData>
export type TAltCountryNameMappedById = Record<TAltCountry['id'], TAltCountryName>
