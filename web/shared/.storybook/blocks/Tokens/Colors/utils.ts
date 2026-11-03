import { cssVarPrefix, ECssVarTokenPrefixes, generateCssVariable } from '~tokens/index'
import type { IColorToken, TColorsByCategories } from './models/types'
import type { IToken, TTokensJSON } from '~tokens/index'
import { colord } from 'colord'

const getCategoryAndColorName = (name: string): Pick<IColorToken, 'category' | 'name'> => {
  const [
    category,
    ...str
  ] = name.split('_')

  return { category, name: str.join('-') }
}

const parseColor = (tokenName: string, tokenData: IToken): IColorToken => {
  const { r, g, b, a } = colord(String(tokenData.value)).toRgb()
  const hex = `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}`
  return {
    ...getCategoryAndColorName(tokenName),
    colorHex: `${hex}, ${a * 100}%`,
    color: String(tokenData.value),
    token: generateCssVariable(
      cssVarPrefix,
      ECssVarTokenPrefixes.COLOR,
      tokenName,
    ),
  }
}

const setColorsByCategories = (colorTokens: IColorToken[]): TColorsByCategories => {
  return colorTokens.reduce<TColorsByCategories>(
    (acc: TColorsByCategories, colorToken) => {
      if (!Array.isArray(acc[colorToken.category])) {
        acc[colorToken.category] = []
      }

      acc[colorToken.category].push(colorToken)

      return acc
    },
    {},
  )
}

const getColorsWithCategoriesAndNames = (tokensJson: TTokensJSON): IColorToken[] => {
  return Object.entries(tokensJson).map(([
    colorName,
    colorData,
  ]) => parseColor(
    colorName,
    colorData,
  ))
}

export const getColorCategoriesHtml = (colorsJson: TTokensJSON) => {
  const colorsWithCategoriesAndNames = getColorsWithCategoriesAndNames(colorsJson)
  const colorsByCategories = setColorsByCategories(colorsWithCategoriesAndNames)

  return Object.entries(colorsByCategories)
}
