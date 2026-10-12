import type { PropertyValues } from 'lit'
import { LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import type { ILocale } from './types'
import { LocaleService } from './service'
import type { IGlobalContext } from '~core/ui/globalProvider/context'
import type { ILocaleModule } from '~core/ui/globalProvider/context/modules'
import { globalContextCreated } from '~core/ui/globalProvider/context'
import { LOCALE_MODULE_ID } from '~core/ui/globalProvider/plugins/i18n'
import { consume } from '@lit/context'
import { ru as defaultLocale } from './locale'
import { parseDate } from '~shared/utils/dateTime'
import dayjs from 'dayjs'

/**
 * Базовый класс для компонентов с поддержкой локализации
 *
 * Автоматически подписывается на изменения локали и предоставляет методы для работы с ней
 */
export class LocalizedElement extends LitElement {
  @property({ type: Object, attribute: false }) locale: ILocale | undefined = defaultLocale

  /**
   * Текущая локализация
   */
  @state() protected currentLocale: ILocale | null = null
  @state() protected currentLocaleService: LocaleService | null = null

  /**
   * Глобальный контекст
   */
  @consume({ context: globalContextCreated, subscribe: true })
  @state() protected globalContext!: IGlobalContext

  /**
   * Текущая дата
   */
  @state() protected currentDate = parseDate()

  /**
   * Обработчик для обновления Global Provider
   */
  @state() protected globalContextUpdateHandler: (() => void) | null = null

  /**
   * Обработчик для обновления модуля локализации
   */
  @state() protected moduleUpdateHandler: (() => void) | null = null

  /**
   * Получить модуль локализации из контекста
   */
  protected getLocaleModule(): ILocaleModule | undefined {
    return this.getGlobalContext()?.getModule(LOCALE_MODULE_ID) as ILocaleModule | undefined
  }

  /**
   * Получить текущую локаль
   */
  protected getLocale(): ILocale {
    // Приоритеты:
    // 1. Локаль заданная через свойство компонента
    // 2. Текущая локаль компонента
    // 3. Локаль из модуля
    // 4. Дефолтная локаль
    if (this.locale) {
      return this.locale
    }

    if (this.currentLocale) {
      return this.currentLocale
    }

    const localeModule = this.getLocaleModule()
    if (localeModule?.locale) {
      return localeModule.locale
    }

    return defaultLocale
  }

  /**
   * Получить глобальный контекст
   */
  protected getGlobalContext(): IGlobalContext | undefined {
    return this.globalContext
  }

  /**
   * Получить сервис локализации
   */
  protected getLocaleService(): LocaleService | null {
    return this.currentLocaleService
  }

  private updateCurrentDate(): void {
    this.currentDate = parseDate()
  }

  /**
   * Подписаться на изменения локали
   */
  private subscribeToLocaleChanges(): void {
    this.clearGlobalContextHandler()
    const globalContext = this.getGlobalContext()
    if (!globalContext) return

    this.globalContextUpdateHandler = () => {
      this.clearLocaleModuleHandler()
      const localeModule = this.getLocaleModule()
      if (!localeModule) return

      // Инициализируем начальное значение локали
      this.updateLocalFromModule(localeModule)

      this.moduleUpdateHandler = () => {
        this.updateLocalFromModule(localeModule)

        this.requestUpdate()
      }
      // Подписываемся на обновления
      localeModule.onUpdated(this.moduleUpdateHandler)
    }
    globalContext.onUpdated(this.globalContextUpdateHandler)
  }

  /**
   * Обновляет состояние локали и сервиса локализации
   */
  private updateLocaleState(locale: ILocale) {
    this.currentLocale = locale
    if (this.currentLocaleService) {
      this.currentLocaleService.setLocale(locale)
    } else {
      this.currentLocaleService = new LocaleService(locale)
    }
    dayjs.locale(locale.shortCode)
    this.updateCurrentDate()
  }

  /**
   * Обновляет текущую локаль на основе модуля
   */
  private updateLocalFromModule(localeModule: ILocaleModule): void {
    // Не обновляем локаль, если она задана явно через свойство компонента
    if (this.locale) return

    // Используем локаль из модуля
    this.updateLocaleState(localeModule.locale)
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.subscribeToLocaleChanges()
    this.updateLocaleState(this.getLocale())
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.clearGlobalContextHandler()
    this.clearLocaleModuleHandler()
  }

  /**
   * Обработка изменения свойства locale
   */
  private handleLocaleChange(): void {
    if (this.locale) {
      this.updateLocaleState(this.locale)
    } else {
      const moduleLocale = this.getLocaleModule()?.locale
      if (moduleLocale) {
        this.updateLocaleState(moduleLocale)
      }
    }
  }

  updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    if (changedProperties.has('locale')) {
      this.handleLocaleChange()
    }
  }

  private clearGlobalContextHandler() {
    const globalContext = this.getGlobalContext()
    if (this.globalContextUpdateHandler && globalContext) {
      globalContext.clearHandler(this.globalContextUpdateHandler)
    }
    this.globalContextUpdateHandler = null
  }

  private clearLocaleModuleHandler() {
    const localeModule = this.getLocaleModule()
    if (this.moduleUpdateHandler && localeModule) {
      localeModule.clearHandler(this.moduleUpdateHandler)
    }
    this.moduleUpdateHandler = null
  }
}
