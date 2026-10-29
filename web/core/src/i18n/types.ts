/**
 * Text direction (left to right or right to left)
 */
export type TDirectionType = 'ltr' | 'rtl'

/**
 * Localized text messages
 */
export type TMessages = Record<string, string>

/**
 * Date and number formatters
 */
export interface IFormatters {
  date: {
    short: Intl.DateTimeFormatOptions
    medium: Intl.DateTimeFormatOptions
    long: Intl.DateTimeFormatOptions
    monthYear: Intl.DateTimeFormatOptions
    monthOnly: Intl.DateTimeFormatOptions
    yearOnly: Intl.DateTimeFormatOptions
    dayOfWeek: Intl.DateTimeFormatOptions
    weekday: {
      narrow: Intl.DateTimeFormatOptions
      short: Intl.DateTimeFormatOptions
      long: Intl.DateTimeFormatOptions
    }
    month: {
      numeric: Intl.DateTimeFormatOptions
      narrow: Intl.DateTimeFormatOptions
      short: Intl.DateTimeFormatOptions
      long: Intl.DateTimeFormatOptions
    }
  }
  number: {
    decimal: Intl.NumberFormatOptions
    currency: Intl.NumberFormatOptions
    percent: Intl.NumberFormatOptions
  }
  firstDayOfWeek: 0 | 1 // 0 - Sunday, 1 - Monday
}

/**
 * Locale definition
 */
export interface ILocale {

  /** Language name */
  name: string

  /** Language code (ISO) */
  code: string

  /** Short language code (ISO) */
  shortCode: string

  /** Text direction */
  dir: TDirectionType

  /** Text messages */
  messages: TMessages

  /** Date and number formatters */
  formatters: IFormatters
}
