import type { ILocale } from './types'
import type { TYCountryNameMappedById } from '~shared/types/country'

/**
 * Сервис локализации для использования в компонентах
 */
export class LocaleService {
  private currentLocale: ILocale

  /**
   * Создать новый экземпляр сервиса локализации
   * @param initialLocale Начальная локализация
   */
  constructor(initialLocale: ILocale) {
    this.currentLocale = initialLocale
  }

  /**
   * Получить текущую локализацию
   */
  public getLocale(): ILocale {
    return this.currentLocale
  }

  /**
   * Установить локализацию
   * @param locale Новая локализация
   */
  public setLocale(locale: ILocale): void {
    this.currentLocale = locale
  }

  /**
   * Форматировать дату согласно указанному формату
   * @param date Дата для форматирования
   * @param format Формат даты
   */
  public formatDate(date: Date, format: keyof ILocale['formatters']['date']): string {
    const options = this.currentLocale.formatters.date[format]
    return date.toLocaleString(this.currentLocale.code, options as Intl.DateTimeFormatOptions)
  }

  /**
   * Форматировать месяц
   * @param date Дата
   * @param format Формат месяца
   */
  public formatMonth(date: Date, format: keyof ILocale['formatters']['date']['month'] = 'long'): string {
    const options = this.currentLocale.formatters.date.month[format]
    return date.toLocaleString(this.currentLocale.code, options)
  }

  /**
   * Форматировать день недели
   * @param date Дата
   * @param format Формат дня недели
   */
  public formatWeekday(date: Date, format: keyof ILocale['formatters']['date']['weekday'] = 'short'): string {
    const options = this.currentLocale.formatters.date.weekday[format]
    return date.toLocaleString(this.currentLocale.code, options)
  }

  /**
   * Форматировать число
   * @param value Число
   * @param format Формат числа
   */
  public formatNumber(value: number, format: keyof ILocale['formatters']['number']): string {
    const options = this.currentLocale.formatters.number[format]
    return value.toLocaleString(this.currentLocale.code, options)
  }

  /**
   * Получить дни недели в нужном формате
   * @param format Формат дней недели
   */
  public getWeekDays(format: keyof ILocale['formatters']['date']['weekday'] = 'short'): string[] {
    const days: string[] = []
    const date = new Date()

    // Устанавливаем на первый день недели согласно локализации
    const firstDay = this.currentLocale.formatters.firstDayOfWeek
    const currentDay = date.getDay()

    // Устанавливаем дату на первый день недели
    date.setDate(date.getDate() - (currentDay - firstDay + (currentDay < firstDay ? 7 : 0)))

    // Получаем 7 дней
    for (let i = 0; i < 7; i++) {
      days.push(this.formatWeekday(date, format))
      date.setDate(date.getDate() + 1)
    }

    return days
  }

  /**
   * Получить список месяцев
   * @param format Формат названия месяца
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
   * Получить направление текста
   */
  public getDirection(): ILocale['dir'] {
    return this.currentLocale.dir
  }

  /**
   * Получить код языка
   */
  public getLanguageCode(): ILocale['code'] {
    return this.currentLocale.code
  }

  /**
   * Получить первый день недели
   */
  public getFirstDayOfWeek(): ILocale['formatters']['firstDayOfWeek'] {
    return this.currentLocale.formatters.firstDayOfWeek
  }

  /**
   * Получить список стран
   */
  public async getCountries(): Promise<TYCountryNameMappedById> {
    const shortCode = this.currentLocale.shortCode
    switch (shortCode) {
      case 'en':
        return (await import('./locale/countries/en')).countries
      case 'ru':
      default:
        return (await import('./locale/countries/ru')).countries
    }
  }
}
