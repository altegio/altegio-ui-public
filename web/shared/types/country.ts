export type TYCountry = {
  id: number
  title: string
  fullTitle: string
  iso2: string
  code: string
  mask: string
}

export type TYCountryData = Omit<TYCountry, 'title' | 'fullTitle'>
export type TYCountryName = Pick<TYCountry, 'title' | 'fullTitle'>

export type TYCountryMappedById = Record<TYCountry['id'], TYCountry>
export type TYCountryDataMappedById = Record<TYCountry['id'], TYCountryData>
export type TYCountryNameMappedById = Record<TYCountry['id'], TYCountryName>
