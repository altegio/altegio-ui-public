import { colord } from 'colord'
import { generatePalette } from '~tokens/palette'
import type { TColorTokenTransformersRaw, TColorTypeRaw } from '../types/color'
import { colorTokens, rawColorTheme, rawColorTypes } from '../types/color'

const sampleExpressions = (palette: Record<string, string>, token: string) => {
  const { h, s, l, a } = colord(palette[token.split('-').join('_')]).toHsl()
  const expression = `${h},${s},${l},${a}`
  return { light: expression, lighter: expression, bright: expression, dark: expression }
}

/** The expression editor derives samples from the same semantic palette as CSS and PaletteModule. */
export function createColorTokenTransformersRaw(accentColor?: string): TColorTokenTransformersRaw {
  const lightPalette = generatePalette(accentColor)
  const darkPalette = generatePalette(accentColor, true)
  return Object.fromEntries(colorTokens.map((token) => [
    token, {
      lightMode: sampleExpressions(lightPalette, token),
      darkMode: sampleExpressions(darkPalette, token),
    },
  ])) as TColorTokenTransformersRaw
}

export const colorTokenTransformersRaw = createColorTokenTransformersRaw()

function preserveOverrides(resolved: Record<TColorTypeRaw, string>, overrides: Record<TColorTypeRaw, string>, defaults: Record<TColorTypeRaw, string>) {
  for (const type of rawColorTypes) {
    if (overrides[type] !== defaults[type]) resolved[type] = overrides[type]
  }
}

/** Unedited samples follow the current accent; explicit expressions remain overrides. */
export function resolveColorTokenTransformersRaw(overrides: TColorTokenTransformersRaw, accentColor?: string): TColorTokenTransformersRaw {
  const resolved = createColorTokenTransformersRaw(accentColor)
  for (const token of colorTokens) {
    for (const theme of rawColorTheme) {
      preserveOverrides(resolved[token][theme], overrides[token][theme], colorTokenTransformersRaw[token][theme])
    }
  }
  return resolved
}
