import type { HslaColor } from 'colord'
import type { TColorTokenTransformers, TColorTokenTransformersRaw } from '../types/color'
import { EColorTheme, EColorType } from '../types/color'
const variablePattern = /^[hsla]$/
const numberPattern = /^\d+(?:\.\d+)?$/

function isColorTerm(value: string): boolean {
  return variablePattern.test(value) || numberPattern.test(value)
}

function parseColorParts(expression: string): string[] | null {
  const parts = expression.trim().split(/([+-])/).map((part) => part.trim())
  if (parts.length === 1 && isColorTerm(parts[0])) return parts
  if (parts.length === 3 && isColorTerm(parts[0]) && isColorTerm(parts[2])) return parts
  return null
}

function evaluateColorExpression(expression: string, accentColor: HslaColor): number {
  const parts = parseColorParts(expression)
  if (!parts) {
    console.warn(`Invalid color expression: ${expression}`)
    return 0
  }

  const readValue = (value: string) => value in accentColor
    ? accentColor[value as keyof HslaColor]
    : Number(value)
  const first = readValue(parts[0])
  if (parts.length === 1) return first
  const second = readValue(parts[2])
  return parts[1] === '+' ? first + second : first - second
}

function parseColorExpressions(accentColor: HslaColor, colorTypeExpressions: string): HslaColor {
  const [h, s, l, a] = colorTypeExpressions.split(',').map((expression) => evaluateColorExpression(expression, accentColor))
  return { h, s, l, a }
}

export function generateTransformersFromJson(colorTokenTransformersJson: TColorTokenTransformersRaw): TColorTokenTransformers {
  const transformer: Partial<TColorTokenTransformers> = {}
  Object.entries(colorTokenTransformersJson).forEach(([colorToken, colorTokenExpressions]) => {
    transformer[`--y-core-color-${colorToken}`] = {
      [EColorTheme.light]: {
        [EColorType.light]: (accentColor: HslaColor): HslaColor => {
          return parseColorExpressions(accentColor, colorTokenExpressions.lightMode.light)
        },
        [EColorType.lighter]: (accentColor: HslaColor): HslaColor => {
          return parseColorExpressions(accentColor, colorTokenExpressions.lightMode.lighter)
        },
        [EColorType.bright]: (accentColor: HslaColor): HslaColor => {
          return parseColorExpressions(accentColor, colorTokenExpressions.lightMode.bright)
        },
        [EColorType.dark]: (accentColor: HslaColor): HslaColor => {
          return parseColorExpressions(accentColor, colorTokenExpressions.lightMode.dark)
        },
      },
      [EColorTheme.dark]: {
        [EColorType.light]: (accentColor: HslaColor): HslaColor => {
          return parseColorExpressions(accentColor, colorTokenExpressions.darkMode.light ? colorTokenExpressions.darkMode.light : colorTokenExpressions.lightMode.light)
        },
        [EColorType.lighter]: (accentColor: HslaColor): HslaColor => {
          return parseColorExpressions(accentColor, colorTokenExpressions.darkMode.lighter ? colorTokenExpressions.darkMode.lighter : colorTokenExpressions.lightMode.lighter)
        },
        [EColorType.bright]: (accentColor: HslaColor): HslaColor => {
          return parseColorExpressions(accentColor, colorTokenExpressions.darkMode.bright ? colorTokenExpressions.darkMode.bright : colorTokenExpressions.lightMode.bright)
        },
        [EColorType.dark]: (accentColor: HslaColor): HslaColor => {
          return parseColorExpressions(accentColor, colorTokenExpressions.darkMode.dark ? colorTokenExpressions.darkMode.dark : colorTokenExpressions.lightMode.dark)
        },
      },
    }
  })
  return transformer as TColorTokenTransformers
}
