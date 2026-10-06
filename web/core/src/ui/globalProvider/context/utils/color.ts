import type { HslaColor } from 'colord'
import type { TColorTokenTransformers, TColorTokenTransformersRaw } from '../types/color'
import { EColorTheme, EColorType } from '../types/color'


function safeEval(value: string): number {
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval,@typescript-eslint/no-unsafe-return,sonarjs/code-eval,@typescript-eslint/no-unsafe-call
    return Function(`"use strict"; return (${value});`)()
  } catch(error) {
    console.warn(`Invalid expression: ${value}. Error: ${JSON.stringify(error)}`)
    return 0
  }
}

function parseColorExpressions(accentColor: HslaColor, colorTypeExpressions: string): HslaColor {
  const colorExpressions = colorTypeExpressions.split(',').map((colorExpression) => {
    return colorExpression
      .replace('h', accentColor.h.toString())
      .replace('s', accentColor.s.toString())
      .replace('l', accentColor.l.toString())
      .replace('a', accentColor.a.toString())
  })
  return { h: safeEval(colorExpressions[0]), s: safeEval(colorExpressions[1]), l: safeEval(colorExpressions[2]), a: safeEval(colorExpressions[3]) }
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
