import type { Colord } from 'colord'
import type { IModule } from '../types/module'
import { generatePalette } from '~tokens/palette'

/**
 * Palette module interface
 */
export interface IPaletteModule extends IModule {

  /**
   * Accent color the palette is generated from
   */
  accentColor: Colord

  /**
   * Enables the dark theme
   */
  useDarkTheme: boolean

  /** Explicit theme boundary. Omitting it preserves document-wide theming in a browser. */
  readonly target?: HTMLElement
}

/**
 * Palette module
 * @implements {IPaletteModule}
 */
export class PaletteModule implements IPaletteModule {
  id: string
  accentColor: Colord
  useDarkTheme: boolean
  readonly target?: HTMLElement

  constructor({ id, accentColor, useDarkTheme, target }: { id: string; accentColor: Colord; useDarkTheme: boolean; target?: HTMLElement }) {
    this.id = id
    this.accentColor = accentColor
    this.useDarkTheme = useDarkTheme
    this.target = target ?? (typeof document === 'undefined' ? undefined : document.documentElement)

    if (!accentColor.isValid()) throw new TypeError('Invalid accent color')
    const palette = generatePalette(this.accentColor.toRgbString(), this.useDarkTheme)
    for (const [name, value] of Object.entries(palette)) {
      this.target?.style.setProperty(`--alt-core-color-${name.split('_').join('-')}`, value)
    }
  }
}
