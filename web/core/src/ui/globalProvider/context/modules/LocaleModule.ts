import type { IModule } from '../types/module'
import type { ILocale } from '~core/i18n/types'
import type { THandler } from '../types'
import { executeHandlers } from '../utils'

/**
 * Интерфейс модуля локализации
 */
export interface ILocaleModule extends IModule {

  /**
   * Текущая локализация
   */
  locale: ILocale


  /**
   * Обработчики изменения локализации
   */
  updatedHandlers: THandler<ILocale>[]

  /**
   * Установить локализацию
   * @param locale Объект локализации
   */
  setLocale: (locale: ILocale) => void

  /**
   * Подписаться на изменение локализации
   * @param handler Обработчик изменения локализации
   */
  onUpdated: (handler: THandler<ILocale>) => void

  /**
   * Удалить обработчик
   * @param handler Обработчик изменения локализации
   */
  clearHandler: (handler: THandler<ILocale>) => void
}

/**
 * Модуль локализации
 * @implements {ILocaleModule}
 */
export class LocaleModule implements ILocaleModule {
  id: string
  locale: ILocale
  updatedHandlers: THandler<ILocale>[] = []

  constructor({ id, locale }: { id: string; locale: ILocale }) {
    this.id = id
    this.locale = locale
  }

  /**
   * Установить локализацию
   * @param locale Объект локализации
   */
  setLocale(locale: ILocale): void {
    this.locale = locale

    // Уведомляем подписчиков
    this.update(locale)
  }

  /**
   * Подписаться на изменение локализации
   * @param handler Обработчик изменения локализации
   */
  onUpdated(handler: THandler<ILocale>): void {
    this.updatedHandlers.push(handler)
  }

  /**
   * Удалить обработчик
   * @param handler Обработчик изменения локализации
   */
  clearHandler(handler: THandler<ILocale>) {
    const handlerIndex = this.updatedHandlers.indexOf(handler)
    if (handlerIndex >= 0) {
      this.updatedHandlers.splice(handlerIndex, 1)
    }
  }

  /**
   * Уведомляет всех подписчиков об изменении локализации
   * @private
   */
  update(locale: ILocale): void {
    executeHandlers(
      this.updatedHandlers,
      locale,
    )
  }
}
