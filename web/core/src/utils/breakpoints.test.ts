import { describe, expect, it } from 'vitest'
import { getActiveBreakpoint } from '~shared/constants/breakpoints'

describe('active breakpoint', () => {
  it.each([
    [0, 'XS'],
    [599, 'XS'],
    [600, 'SM'],
    [904, 'SM'],
    [905, 'MD'],
    [1239, 'MD'],
    [1240, 'LG'],
    [2000, 'LG'],
  ] as const)('maps width %i to %s', (width, expected) => {
    expect(getActiveBreakpoint(width)).toBe(expected)
  })
})
