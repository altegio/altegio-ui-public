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
import { resolveLanguage, resolveLocale } from './language'
import { parseDate } from '~shared/utils/dateTime'
import dayjs from 'dayjs'

/**
 * Base class for components that support localization
 *
 * Subscribes to locale changes automatically and provides helpers for working with the locale
 */
export class LocalizedElement extends LitElement {
  @property({ type: Object, attribute: false }) locale: ILocale | undefined = undefined

  /**
   * Current locale
   */
  @state() protected currentLocale: ILocale | null = null
  @state() protected currentLocaleService: LocaleService | null = null

  /**
   * Global context
   */
  @consume({ context: globalContextCreated, subscribe: true })
  @state() protected globalContext!: IGlobalContext

  /**
   * Current date
   */
  @state() protected currentDate = parseDate()

  /**
   * Handler for Global Provider updates
   */
  @state() protected globalContextUpdateHandler: (() => void) | null = null

  /**
   * Handler for locale module updates
   */
  @state() protected moduleUpdateHandler: (() => void) | null = null

  /**
   * Returns the locale module from the context
   */
  protected getLocaleModule(): ILocaleModule | undefined {
    return this.getGlobalContext()?.getModule(LOCALE_MODULE_ID) as ILocaleModule | undefined
  }

  /**
   * Returns the current locale
   */
  protected getLocale(): ILocale {
    // Resolution order:
    // 1. The locale set through the component property
    // 2. The component's current locale
    // 3. The locale from the module
    // 4. The built-in locale for the content language
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

    return resolveLocale(this.getLanguage())
  }

  /**
   * Content language: the configured locale, otherwise the nearest `lang` attribute or the browser language
   */
  protected getLanguage(): string {
    return (this.locale ?? this.getLocaleModule()?.locale)?.code ?? resolveLanguage(this)
  }

  /**
   * Returns the global context
   */
  protected getGlobalContext(): IGlobalContext | undefined {
    return this.globalContext
  }

  /**
   * Returns the localization service
   */
  protected getLocaleService(): LocaleService | null {
    return this.currentLocaleService
  }

  private updateCurrentDate(): void {
    this.currentDate = parseDate()
  }

  /**
   * Subscribes to locale changes
   */
  private subscribeToLocaleChanges(): void {
    this.clearGlobalContextHandler()
    const globalContext = this.getGlobalContext()
    if (!globalContext) return

    this.globalContextUpdateHandler = () => {
      this.clearLocaleModuleHandler()
      const localeModule = this.getLocaleModule()
      if (!localeModule) return

      // Apply the initial locale
      this.updateLocalFromModule(localeModule)

      this.moduleUpdateHandler = () => {
        this.updateLocalFromModule(localeModule)

        this.requestUpdate()
      }
      // Listen for updates
      localeModule.onUpdated(this.moduleUpdateHandler)
    }
    globalContext.onUpdated(this.globalContextUpdateHandler)
  }

  /**
   * Updates the locale state and the localization service
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
   * Updates the current locale from the module
   */
  private updateLocalFromModule(localeModule: ILocaleModule): void {
    // An explicit locale property takes precedence over the module
    if (this.locale) return

    // Use the module's locale
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
   * Handles changes to the locale property
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
