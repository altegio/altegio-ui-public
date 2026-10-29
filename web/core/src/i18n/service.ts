import type { ILocale } from './types'
import type { TYCountryNameMappedById } from '~shared/types/country'
import { defaultCountriesData } from '~shared/utils/countries'
import { getLanguageShortCode } from './language'

/**
 * Country names in any language from Intl, English names where Intl has none
 * @param language BCP 47 language tag
 * @param fallback English country names
 */
const getDisplayCountryNames = (language: string, fallback: TYCountryNameMappedById): TYCountryNameMappedById => {
  let displayNames: Intl.DisplayNames

  try {
    if (!Intl.DisplayNames.supportedLocalesOf(language).length) return fallback

    displayNames = new Intl.DisplayNames(language, { type: 'region', fallback: 'none' })
  } catch {
    return fallback
  }

  return Object.fromEntries(Object.values(defaultCountriesData).map(({ id, iso2 }) => {
    const title = displayNames.of(iso2)

    return [id, title ? { title, fullTitle: title } : fallback[id]]
  }))
}

/**
 * Localization service used by components
 */
export class LocaleService {
  private currentLocale: ILocale

  /**
   * Creates a localization service
   * @param initialLocale Initial locale
   */
  constructor(initialLocale: ILocale) {
    this.currentLocale = initialLocale
  }

  /**
   * Returns the current locale
   */
  public getLocale(): ILocale {
    return this.currentLocale
  }

  /**
   * Sets the locale
   * @param locale New locale
   */
  public setLocale(locale: ILocale): void {
    this.currentLocale = locale
  }

  /**
   * Formats a date with the given format
   * @param date Date to format
   * @param format Date format
   */
  public formatDate(date: Date, format: keyof ILocale['formatters']['date']): string {
    const options = this.currentLocale.formatters.date[format]
    return date.toLocaleString(this.currentLocale.code, options as Intl.DateTimeFormatOptions)
  }

  /**
   * Formats a month name
   * @param date Date
   * @param format Month format
   */
  public formatMonth(date: Date, format: keyof ILocale['formatters']['date']['month'] = 'long'): string {
    const options = this.currentLocale.formatters.date.month[format]
    return date.toLocaleString(this.currentLocale.code, options)
  }

  /**
   * Formats a weekday name
   * @param date Date
   * @param format Weekday format
   */
  public formatWeekday(date: Date, format: keyof ILocale['formatters']['date']['weekday'] = 'short'): string {
    const options = this.currentLocale.formatters.date.weekday[format]
    return date.toLocaleString(this.currentLocale.code, options)
  }

  /**
   * Formats a number
   * @param value Number
   * @param format Number format
   */
  public formatNumber(value: number, format: keyof ILocale['formatters']['number']): string {
    const options = this.currentLocale.formatters.number[format]
    return value.toLocaleString(this.currentLocale.code, options)
  }

  /**
   * Returns the weekday names in the given format
   * @param format Weekday format
   */
  public getWeekDays(format: keyof ILocale['formatters']['date']['weekday'] = 'short'): string[] {
    const days: string[] = []
    const date = new Date()

    // First day of the week for the current locale
    const firstDay = this.currentLocale.formatters.firstDayOfWeek
    const currentDay = date.getDay()

    // Move the date back to the first day of the week
    date.setDate(date.getDate() - (currentDay - firstDay + (currentDay < firstDay ? 7 : 0)))

    // Collect the 7 days
    for (let i = 0; i < 7; i++) {
      days.push(this.formatWeekday(date, format))
      date.setDate(date.getDate() + 1)
    }

    return days
  }

  /**
   * Returns the list of months
   * @param format Month name format
   */
  public getMonths(format: keyof ILocale['formatters']['date']['month'] = 'long'): { id: string; label: string }[] {
    const months = []
    const date = new Date()
    date.setDate(1)

    for (let i = 0; i < 12; i++) {
      date.setMonth(i)
      months.push({
        id: i.toString(),
        label: this.formatMonth(date, format),
      })
    }

    return months
  }

  /**
   * Returns the text direction
   */
  public getDirection(): ILocale['dir'] {
    return this.currentLocale.dir
  }

  /**
   * Returns the language code
   */
  public getLanguageCode(): ILocale['code'] {
    return this.currentLocale.code
  }

  /**
   * Returns the first day of the week
   */
  public getFirstDayOfWeek(): ILocale['formatters']['firstDayOfWeek'] {
    return this.currentLocale.formatters.firstDayOfWeek
  }

  /**
   * Returns the list of countries
   * @param language Language of the names, the locale language by default
   */
  public async getCountries(language: string = this.currentLocale.code): Promise<TYCountryNameMappedById> {
    switch (getLanguageShortCode(language)) {
      case 'ru':
        return (await import('./locale/countries/ru')).countries
      case 'en':
        return (await import('./locale/countries/en')).countries
      default:
        return getDisplayCountryNames(language, (await import('./locale/countries/en')).countries)
    }
  }
}
