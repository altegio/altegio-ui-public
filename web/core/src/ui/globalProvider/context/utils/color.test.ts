import { describe, expect, it } from 'vitest'
import { colorTokenTransformersRaw } from '../constants/color-token-transformers'
import { EColorTheme, EColorType } from '../types/color'
import { generateTransformersFromJson } from './color'

describe('palette expressions', () => {
  it('evaluates the arithmetic used by the published color tokens', () => {
    const transformers = generateTransformersFromJson(colorTokenTransformersRaw)
    const accent = { h: 120, s: 40, l: 25, a: 1 }

    expect(transformers['--y-core-color-surface-accent-low'][EColorTheme.dark][EColorType.dark](accent))
      .toEqual({ h: 120, s: 40, l: 75, a: 0.15 })
    expect(transformers['--y-core-color-surface-accent-high'][EColorTheme.light][EColorType.light](accent))
      .toEqual({ h: 120, s: 40, l: 5, a: 1 })
  })

  it('accepts whitespace around color arithmetic', () => {
    const raw = {
      ...colorTokenTransformersRaw,
      'text-accent': {
        ...colorTokenTransformersRaw['text-accent'],
        lightMode: {
          ...colorTokenTransformersRaw['text-accent'].lightMode,
          light: ' h , s , l + 5 , 1 ',
        },
      },
    }
    const transformers = generateTransformersFromJson(raw)

    expect(transformers['--y-core-color-text-accent'][EColorTheme.light][EColorType.light]({ h: 120, s: 40, l: 25, a: 1 }))
      .toEqual({ h: 120, s: 40, l: 30, a: 1 })
  })
})
