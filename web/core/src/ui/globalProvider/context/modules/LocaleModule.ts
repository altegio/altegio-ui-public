import type { IModule } from '../types/module'
import type { ILocale } from '~core/i18n/types'
import type { THandler } from '../types'
import { executeHandlers } from '../utils'

/**
 * Locale module interface
 */
export interface ILocaleModule extends IModule {

  /**
   * Current locale
   */
  locale: ILocale


  /**
   * Locale change handlers
   */
  updatedHandlers: THandler<ILocale>[]

  /**
   * Sets the locale
   * @param locale Locale object
   */
  setLocale: (locale: ILocale) => void

  /**
   * Subscribes to locale changes
   * @param handler Locale change handler
   */
  onUpdated: (handler: THandler<ILocale>) => void

  /**
   * Removes a handler
   * @param handler Locale change handler
   */
  clearHandler: (handler: THandler<ILocale>) => void
}

/**
 * Locale module
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
   * Sets the locale
   * @param locale Locale object
   */
  setLocale(locale: ILocale): void {
    this.locale = locale

    // Notify the subscribers
    this.update(locale)
  }

  /**
   * Subscribes to locale changes
   * @param handler Locale change handler
   */
  onUpdated(handler: THandler<ILocale>): void {
    this.updatedHandlers.push(handler)
  }

  /**
   * Removes a handler
   * @param handler Locale change handler
   */
  clearHandler(handler: THandler<ILocale>) {
    const handlerIndex = this.updatedHandlers.indexOf(handler)
    if (handlerIndex >= 0) {
      this.updatedHandlers.splice(handlerIndex, 1)
    }
  }

  /**
   * Notifies all subscribers about the locale change
   * @private
   */
  update(locale: ILocale): void {
    executeHandlers(
      this.updatedHandlers,
      locale,
    )
  }
}
