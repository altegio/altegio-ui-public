import type { TTokensJSON } from '~tokens/index'

type TTypographyGroup = Record<string, TTokensJSON>

export const getGroupedTypographyTokens = (typography: TTokensJSON) => {
  const categories: Record<string, TTypographyGroup> = {}

  Object.keys(typography).forEach((key) => {
    const keyChunks = key.split('_')

    const categoryName = keyChunks[0]
    const groupName = [
      keyChunks[1],
      keyChunks[2],
      keyChunks[3],
    ].join('_')

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const group = categories[categoryName]?.[groupName] || {}

    categories[categoryName] = { ...categories[categoryName], [groupName]: { ...group, [key]: typography[key] } }
  })

  return categories
}
