import { dash } from 'radash'

import colors from './colors.json'
import extendedColors from './extended_colours.json'
import sizes from './sizes.json'
import typography from './typography.json'
import effects from './effects.json'
import avatar from './avatar.json'

type TTokenValue = string | number

export interface IToken {
  type: 'COLOR' | 'FLOAT' | 'TEXT' | 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR'
  unit?: 'PIXELS'
  value: TTokenValue
  cssValue: TTokenValue
}

export type TTokensJSON = Record<string, IToken>

export const cssVarPrefix = 'y-core'

export enum ECssVarTokenPrefixes {
  COLOR = 'color',
  SIZE = 'size',
  TYPOGRAPHY = 'typography',
  EFFECTS = 'effects',
  COMPONENT = 'component',
}

export const generateCssVariable = (cssVarPrefix: string, prefix: string, key: string) => `--${cssVarPrefix}-${prefix}-${dash(key)}`

const generateCssVariableWithValue = (cssVarPrefix: string, prefix: string, key: string, cssValue: IToken['cssValue']) => `  ${generateCssVariable(
  cssVarPrefix,
  prefix,
  key,
)}: ${cssValue};`

const extractStylesFromJsonTokens = (tokens: TTokensJSON, prefix: string) => {
  return Object.entries(tokens)
    .map(([
      key,
      { cssValue },
    ]) => generateCssVariableWithValue(
      cssVarPrefix,
      prefix,
      key,
      cssValue,
    ))
    .join('\n')
}

export const COLORS = colors as TTokensJSON
export const EXTENDED_COLORS = extendedColors as TTokensJSON
export const SIZES = sizes as TTokensJSON
export const TYPOGRAPHY = typography as TTokensJSON
export const EFFECTS = effects as TTokensJSON
export const AVATAR = avatar as TTokensJSON

export const ALL_COLORS = {
  ...COLORS,
  ...EXTENDED_COLORS,
} as TTokensJSON

export const cssContent = (() => {
  return `:root{\n${
    extractStylesFromJsonTokens(
      COLORS,
      ECssVarTokenPrefixes.COLOR,
    )
  }\n${
    extractStylesFromJsonTokens(
      EXTENDED_COLORS,
      ECssVarTokenPrefixes.COLOR,
    )
  }\n${
    extractStylesFromJsonTokens(
      SIZES,
      ECssVarTokenPrefixes.SIZE,
    )
  }\n${
    extractStylesFromJsonTokens(
      TYPOGRAPHY,
      ECssVarTokenPrefixes.TYPOGRAPHY,
    )
  }\n${
    extractStylesFromJsonTokens(
      EFFECTS,
      ECssVarTokenPrefixes.EFFECTS,
    )
  }\n${
    extractStylesFromJsonTokens(
      AVATAR,
      ECssVarTokenPrefixes.COMPONENT,
    )
  }\n}`
})()
