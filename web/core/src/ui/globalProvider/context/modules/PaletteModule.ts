import type { Colord } from 'colord'
import { colord } from 'colord'
import { EColorTheme } from '../types/color'
import type { IModule } from '../types/module'
import { getColorType } from '../utils/wcag'
import { generateTransformersFromJson } from '../utils/color'
import { colorTokenTransformersRaw } from '../constants/color-token-transformers'

/**
 * Интерфейс модуля палитры
 */
export interface IPaletteModule extends IModule {

  /**
   * Основной цвет, используемый для генерации палитры
   */
  accentColor: Colord

  /**
   * Флаг для включения тёмной темы
   */
  useDarkTheme: boolean
}

/**
 * Модуль локализации
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
