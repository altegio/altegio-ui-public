import { colord } from 'colord'
import type { IGlobalProviderPlugin } from '..'
import type { IGlobalContext } from '../../context'
import { PaletteModule } from '../../context/modules/PaletteModule'

/**
 * ID of the palette module in the context
 */
export const PALETTE_MODULE_ID = 'palette'

/**
 * GlobalProvider plugin that manages the color palette
 *
 * Stores the palette data in the global context through a PaletteModule.
 *
 * @example
 * ```typescript
 * // Create the plugin with a yellow accent color and the light theme
 * const palettePlugin = new PalettePlugin('#ffcb00', false);
 *
 * // Pass the plugin to GlobalProvider
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
   * Creates the palette plugin
   *
   * @param accentColor - Accent color the palette is generated from
   * @param useDarkTheme - Enables the dark theme
   */
  constructor(private accentColor: string, private useDarkTheme = false) {}

  /**
   * Sets up the palette in the global context
   *
   * Creates the palette module and adds it to the global context.
   *
   * @param context - Global context to add the palette to
   */
  init(context: IGlobalContext): void {
    this.context = context

    // Create the palette module and add it to the context
    this.paletteModule = new PaletteModule({
      id: PALETTE_MODULE_ID,
      accentColor: colord(this.accentColor),
      useDarkTheme: this.useDarkTheme,
    })

    this.context.putModule(this.paletteModule)
  }
}
