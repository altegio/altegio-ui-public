import type { IGlobalProviderPlugin } from '..'
import type { IGlobalContext } from '../../context'
import type { ILocale } from '~core/i18n/types'
import { ru } from '~core/i18n'
import { LocaleModule } from '../../context/modules'

/**
 * ID of the locale module in the context
 */
export const LOCALE_MODULE_ID = 'locale'

/**
 * GlobalProvider plugin that manages the locale
 *
 * Stores the locale data in the global context through a LocaleModule.
 *
 * @example
 * ```typescript
 * // Create the plugin with the English locale
 * const i18nPlugin = new I18nPlugin(en);
 *
 * // Pass the plugin to GlobalProvider
 * <YGlobalProvider :plugins="[i18nPlugin]">
 *   <YourComponent />
 * </YGlobalProvider>
 * ```
 *
 * @example
 * ```typescript
 * // Read the locale module from the context
 * const localeModule = context.getModule(LOCALE_MODULE_ID) as ILocaleModule;
 *
 * // Switch the locale
 * if (localeModule) {
 *   localeModule.setLocale(ru);
 * }
 * ```
 */
export class I18nPlugin implements IGlobalProviderPlugin {
  id = LOCALE_MODULE_ID
  private localeModule?: LocaleModule
  private context?: IGlobalContext

  /**
   * Creates the localization plugin
   *
   * @param locale - Initial locale.
   * Defaults to the Russian locale from '~core/i18n'
   */
  constructor(private locale: ILocale = ru) {}

  /**
   * Sets up localization in the global context
   *
   * Creates the locale module and adds it to the global context.
   *
   * @param context - Global context to add the locale to
   */
  init(context: IGlobalContext): void {
    this.context = context

    // Create the locale module and add it to the context
    this.localeModule = new LocaleModule({
      id: LOCALE_MODULE_ID,
      locale: this.locale,
    })

    this.context.putModule(this.localeModule)
  }

  /**
   * Returns the plugin's current locale
   *
   * @returns Current locale object used by the plugin
   */
  getLocale(): ILocale {
    // Prefer the module's locale; fall back to the one passed to the plugin
    return this.localeModule?.locale || this.locale
  }

  /**
   * Sets a new locale
   *
   * @param locale - New locale object
   */
  setLocale(locale: ILocale): void {
    this.locale = locale

    // Update the module's locale when the module exists
    if (this.localeModule) {
      this.localeModule.setLocale(locale)
    }
  }
}
