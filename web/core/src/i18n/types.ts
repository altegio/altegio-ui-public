/**
 * Тип направления текста (слева направо или справа налево)
 */
export type TDirectionType = 'ltr' | 'rtl'

/**
 * Интерфейс с текстовыми сообщениями для локализации
 */
export type TMessages = Record<string, string>

/**
 * Форматтеры для работы с датами и числами
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
  firstDayOfWeek: 0 | 1 // 0 - Воскресенье, 1 - Понедельник
}

/**
 * Интерфейс локализации
 */
export interface ILocale {

  /** Название языка */
  name: string

  /** Код языка (ISO) */
  code: string

  /** Короткий код языка (ISO) */
  shortCode: string

  /** Направление текста */
  dir: TDirectionType

  /** Текстовые сообщения */
  messages: TMessages

  /** Форматтеры для дат и чисел */
  formatters: IFormatters
}
