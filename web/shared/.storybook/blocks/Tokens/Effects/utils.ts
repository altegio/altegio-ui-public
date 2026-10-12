import type { CSSProperties } from 'react'
import type { IToken } from '~tokens/index'

export const getStylesByType = (effect: IToken): CSSProperties | undefined => {
  switch (effect.type) {
    case 'DROP_SHADOW':
    case 'INNER_SHADOW':
      return { boxShadow: effect.cssValue.toString() }
    case 'BACKGROUND_BLUR':
      return { backdropFilter: `blur(${effect.cssValue})`, backgroundColor: 'transparent' }
    case 'LAYER_BLUR':
      return { filter: `blur(${effect.cssValue})` }
  }
}
