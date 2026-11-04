import { describe, expect, it } from 'vitest'
import { colord } from 'colord'
import { generatePalette } from '~tokens/palette'
import { colorTokenTransformersRaw, resolveColorTokenTransformersRaw } from '../constants/color-token-transformers'
import { EColorTheme, EColorType } from '../types/color'
import { generateTransformersFromJson } from './color'

describe('palette expressions', () => {
  it('updates unedited expression samples when the editor accent changes', () => {
    const raw = resolveColorTokenTransformersRaw(colorTokenTransformersRaw, '#0077ff')
    const transformed = generateTransformersFromJson(raw)
    const accent = colord('#0077ff').toHsl()
    const palette = generatePalette('#0077ff')
    expect(transformed['--alt-core-color-surface-accent'][EColorTheme.light][EColorType.bright](accent)).toEqual(colord(palette.surface_accent).toHsl())
    expect(transformed['--alt-core-color-text-on-accent'][EColorTheme.light][EColorType.bright](accent)).toEqual(colord(palette.text_on_accent).toHsl())
  })

  it('keeps explicit expression overrides when the editor accent changes', () => {
    const overrides = {
      ...colorTokenTransformersRaw,
      'surface-accent-high': {
        ...colorTokenTransformersRaw['surface-accent-high'],
        lightMode: { ...colorTokenTransformersRaw['surface-accent-high'].lightMode, bright: 'h,s,l-20,1' },
      },
    }
    expect(resolveColorTokenTransformersRaw(overrides, '#0077ff')['surface-accent-high'].lightMode.bright).toBe('h,s,l-20,1')
  })

  it('preserves arithmetic support for custom expression editors', () => {
    const transformers = generateTransformersFromJson({
      ...colorTokenTransformersRaw,
      'surface-accent-low': {
        ...colorTokenTransformersRaw['surface-accent-low'],
        darkMode: { ...colorTokenTransformersRaw['surface-accent-low'].darkMode, dark: 'h,s,l+50,0.15' },
      },
      'surface-accent-high': {
        ...colorTokenTransformersRaw['surface-accent-high'],
        lightMode: { ...colorTokenTransformersRaw['surface-accent-high'].lightMode, light: 'h,s,l-20,1' },
      },
    })
    const accent = { h: 120, s: 40, l: 25, a: 1 }

    expect(transformers['--alt-core-color-surface-accent-low'][EColorTheme.dark][EColorType.dark](accent))
      .toEqual({ h: 120, s: 40, l: 75, a: 0.15 })
    expect(transformers['--alt-core-color-surface-accent-high'][EColorTheme.light][EColorType.light](accent))
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

    expect(transformers['--alt-core-color-text-accent'][EColorTheme.light][EColorType.light]({ h: 120, s: 40, l: 25, a: 1 }))
      .toEqual({ h: 120, s: 40, l: 30, a: 1 })
  })
})
