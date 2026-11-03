
import type { IToken } from '~tokens/index'

export interface IColorToken {
  category: string
  name: string
  colorHex: IToken['value']
  color: string
  token: string
}

export type TColorsByCategories = Record<string, IColorToken[]>
