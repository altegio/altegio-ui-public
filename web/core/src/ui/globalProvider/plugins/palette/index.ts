import { colord } from 'colord'
import type { IGlobalProviderPlugin } from '..'
import type { IGlobalContext } from '../../context'
import { PaletteModule } from '../../context/modules/PaletteModule'

/**
 * Идентификатор модуля палитры в контексте
 */
export const PALETTE_MODULE_ID = 'palette'

/**
 * Плагин для управления палитрой в GlobalProvider
 *
 * Использует PaletteModule для хранения данных локализации в глобальном контексте.
 *
 * @example
 * ```typescript
 * // Создание экземпляра плагина с русской локализацией
 * const palettePlugin = new PalettePlugin('#ffcb00', false);
 *
 * // Использование плагина в GlobalProvider
 * <YGlobalProvider :plugins="[palettePlugin]">
 *   <YourComponent />
 * </YGlobalProvider>
 * ```
 */
export class PalettePlugin implements IGlobalProviderPlugin {
  id = PALETTE_MODULE_ID
  private paletteModule?: PaletteModule
  private context?: IGlobalContext

  /**
   * Создает экземпляр плагина палитры
   *
   * @param accentColor - Основной цвет, используемый для генерации палитры
   * @param useDarkTheme - Флаг для включения тёмной темы
   */
  constructor(private accentColor: string, private useDarkTheme = false) {}

  /**
   * Инициализирует палитру в глобальном контексте
   *
   * Создает модуль палитры и добавляет его в глобальный контекст.
   *
   * @param context - Глобальный контекст для установки палитры
   */
  init(context: IGlobalContext): void {
    this.context = context

    // Создаем и добавляем модуль локализации в контекст
    this.paletteModule = new PaletteModule({
      id: PALETTE_MODULE_ID,
      accentColor: colord(this.accentColor),
      useDarkTheme: this.useDarkTheme,
    })

    this.context.putModule(this.paletteModule)
  }
}
