import type { Colord } from 'colord'
import { colord } from 'colord'
import { EColorTheme } from '../types/color'
import type { IModule } from '../types/module'
import { getColorType } from '../utils/wcag'
import { generateTransformersFromJson } from '../utils/color'
import { colorTokenTransformersRaw } from '../constants/color-token-transformers'

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
}

/**
 * Palette module
 * @implements {IPaletteModule}
 */
export class PaletteModule implements IPaletteModule {
  id: string
  accentColor: Colord
  useDarkTheme: boolean

  constructor({ id, accentColor, useDarkTheme }: { id: string; accentColor: Colord; useDarkTheme: boolean }) {
    this.id = id
    this.accentColor = accentColor
    this.useDarkTheme = useDarkTheme

    const accentColorObj = colord(this.accentColor)
    const colorType = getColorType(accentColorObj.toRgb())
    const hslaAccentColor = accentColorObj.toHsl()
    const colorTheme = this.useDarkTheme ? EColorTheme.dark : EColorTheme.light
    const colorTokenTransformers = generateTransformersFromJson(colorTokenTransformersRaw)
    Object.keys(colorTokenTransformers).forEach((colorToken) => {
      const transformedColor = colorTokenTransformers[colorToken][colorTheme][colorType](hslaAccentColor)
      document.documentElement.style.setProperty(
        colorToken,
        colord(transformedColor).toRgbString(),
      )
    })
  }
}
