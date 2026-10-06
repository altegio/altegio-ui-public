import type { IGlobalProviderPlugin } from '..'
import type { IGlobalContext } from '../../context'
import type { ILocale } from '~core/i18n/types'
import { ru } from '~core/i18n'
import { LocaleModule } from '../../context/modules'

/**
 * Идентификатор модуля локализации в контексте
 */
export const LOCALE_MODULE_ID = 'locale'

/**
 * Плагин для управления локализацией в GlobalProvider
 *
 * Использует LocaleModule для хранения данных локализации в глобальном контексте.
 *
 * @example
 * ```typescript
 * // Создание экземпляра плагина с русской локализацией
 * const i18nPlugin = new I18nPlugin(ru);
 *
 * // Использование плагина в GlobalProvider
 * <YGlobalProvider :plugins="[i18nPlugin]">
 *   <YourComponent />
 * </YGlobalProvider>
 * ```
 *
 * @example
 * ```typescript
 * // Получение модуля локализации из контекста
 * const localeModule = context.getModule(LOCALE_MODULE_ID) as ILocaleModule;
 *
 * // Переключение локализации
 * if (localeModule) {
 *   localeModule.setLocale(en);
 * }
 * ```
 */
export class I18nPlugin implements IGlobalProviderPlugin {
  id = LOCALE_MODULE_ID
  private localeModule?: LocaleModule
  private context?: IGlobalContext

  /**
   * Создает экземпляр плагина локализации
   *
   * @param locale - Объект локализации для инициализации плагина
   * По умолчанию используется русская локализация из '~core/i18n'
   */
  constructor(private locale: ILocale = ru) {}

  /**
   * Инициализирует локализацию в глобальном контексте
   *
   * Создает модуль локализации и добавляет его в глобальный контекст.
   *
   * @param context - Глобальный контекст для установки локализации
   */
  init(context: IGlobalContext): void {
    this.context = context

    // Создаем и добавляем модуль локализации в контекст
    this.localeModule = new LocaleModule({
      id: LOCALE_MODULE_ID,
      locale: this.locale,
    })

    this.context.putModule(this.localeModule)
  }

  /**
   * Возвращает текущую локализацию плагина
   *
   * @returns Текущий объект локализации, используемый плагином
   */
  getLocale(): ILocale {
    // Если есть модуль, получаем локализацию из него, иначе из плагина
    return this.localeModule?.locale || this.locale
  }

  /**
   * Устанавливает новую локализацию
   *
   * @param locale - Новый объект локализации для установки
   */
  setLocale(locale: ILocale): void {
    this.locale = locale

    // Если модуль существует, обновляем локализацию в нем
    if (this.localeModule) {
      this.localeModule.setLocale(locale)
    }
  }
}
