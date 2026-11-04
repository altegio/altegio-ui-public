import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { colord } from 'colord'
import { ALL_COLORS } from '~tokens/index'
import { contrastRatio, generatePalette } from '~tokens/palette'
import type { TPalette } from '~tokens/palette'
import { PaletteModule } from '../../../context/modules/PaletteModule'
import { PalettePlugin } from '../../../plugins/palette'
import { GlobalContext } from '../../../context'

let originalRootStyles = ''
const targets: HTMLElement[] = []

beforeEach(() => {
  originalRootStyles = document.documentElement.style.cssText
})

afterEach(() => {
  document.documentElement.style.cssText = originalRootStyles
  targets.splice(0).forEach((target) => { target.remove() })
})

function target() {
  const element = document.createElement('section')
  document.body.append(element)
  targets.push(element)
  return element
}

function expectRoleContrast(palette: TPalette, roles: string[], minimum: number) {
  const surfaces = ['surface_primary', 'surface_secondary_fill', 'surface_tertiary', 'surface_tertiary_high']
  for (const surface of surfaces) {
    for (const role of roles) {
      expect(contrastRatio(palette[role], palette[surface], palette.surface_primary), `${role}/${surface}`).toBeGreaterThanOrEqual(minimum)
    }
  }
}

describe('semantic palette', () => {
  it('calculates contrast after compositing alpha, including dark backing surfaces', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBe(21)
    expect(contrastRatio('#ffffff', '#ffffff')).toBe(1)
    expect(contrastRatio('rgba(0, 0, 0, 0.5)', '#ffffff')).toBeCloseTo(3.95, 2)
    expect(contrastRatio('#ffffff', 'rgba(255, 255, 255, 0.2)', '#000000')).toBeCloseTo(12.63, 2)
  })

  it('uses the same values for static tokens and the default runtime theme', () => {
    const palette = generatePalette()
    const module = new PaletteModule({ id: 'default', accentColor: colord('#ffcb00'), useDarkTheme: false })
    expect(module.target).toBe(document.documentElement)

    for (const [name, token] of Object.entries(ALL_COLORS)) {
      const property = `--alt-core-color-${name.split('_').join('-')}`
      expect(palette[name], name).toBe(token.cssValue)
      expect(document.documentElement.style.getPropertyValue(property), property).toBe(token.cssValue)
    }
    expect(palette.surface_accent).toBe('#ffcb00')
    expect(palette.surface_accent_high).toBe('#ffa800')
  })

  it.each(['#ffcb00', '#ffffff', '#000000', '#111111', '#0077ff', '#e60023', '#00ff00', '#6644e0', 'rgba(30, 70, 240, 0.5)'])('keeps active foregrounds, states and focus readable for %s in both themes', (accent) => {
    for (const dark of [false, true]) {
      const palette = generatePalette(accent, dark)
      const primary = palette.surface_primary
      expectRoleContrast(palette, ['text_primary', 'text_secondary', 'text_negative', 'text_positive', 'text_warning', 'text_accent', 'other_link'], 4.5)
      expectRoleContrast(palette, ['stroke_control', 'stroke_negative', 'focus_ring'], 3)
      for (const surface of ['surface_accent', 'surface_accent_high']) {
        expect(contrastRatio(palette.text_on_accent, palette[surface], primary), surface).toBeGreaterThanOrEqual(4.5)
      }
      for (const name of ['green', 'blue', 'orange', 'red', 'purple']) {
        expect(contrastRatio(palette[`calm_text_${name}`], palette[`calm_surface_${name}_low`], primary), name).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  it('rejects invalid colors before mutating a theme boundary', () => {
    const scope = target()
    scope.style.setProperty('--keep', 'intact')
    const original = scope.style.cssText
    expect(() => new PaletteModule({ id: 'invalid', accentColor: colord('invalid'), useDarkTheme: false, target: scope })).toThrow(TypeError)
    expect(scope.style.cssText).toBe(original)
    expect(() => generatePalette('invalid')).toThrow(TypeError)
  })

  it('composites translucent accent fills against the theme surface and reduces disabled opacity', () => {
    const palette = generatePalette('rgba(255, 0, 0, 0.5)')
    expect(palette.surface_accent).toBe('#ff8080')
    expect(palette.surface_accent_high).toBe('#f08080')
    expect(colord(palette.surface_accent_low).alpha()).toBeCloseTo(0.15, 5)
  })

  it('supports independent sibling and nested themes without changing the document', () => {
    const dark = target()
    const light = target()
    const nested = document.createElement('section')
    dark.append(nested)
    const darkModule = new PaletteModule({ id: 'dark', accentColor: colord('#ffcb00'), useDarkTheme: true, target: dark })
    const lightModule = new PaletteModule({ id: 'light', accentColor: colord('#6644e0'), useDarkTheme: false, target: light })
    const nestedModule = new PaletteModule({ id: 'nested', accentColor: colord('#e60023'), useDarkTheme: false, target: nested })
    expect([darkModule.target, lightModule.target, nestedModule.target]).toEqual([dark, light, nested])
    const inherited = document.createElement('span')
    dark.append(inherited)

    expect(document.documentElement.style.cssText).toBe(originalRootStyles)
    expect(getComputedStyle(inherited).getPropertyValue('--alt-core-color-surface-primary').trim()).toBe('#1c1e22')
    expect(getComputedStyle(light).getPropertyValue('--alt-core-color-surface-primary').trim()).toBe('#ffffff')
    expect(getComputedStyle(nested).getPropertyValue('--alt-core-color-surface-accent').trim()).toBe('#e60023')
    expect(getComputedStyle(dark).getPropertyValue('--alt-core-color-surface-accent').trim()).toBe('#ffcb00')
  })

  it('passes the explicit target through PalettePlugin', () => {
    const scope = target()
    const context = new GlobalContext()
    new PalettePlugin('#0077ff', true, scope).init(context)

    const module = context.getModule('palette')
    expect(module).toBeInstanceOf(PaletteModule)
    expect((module as PaletteModule).target).toBe(scope)
    expect(scope.style.getPropertyValue('--alt-core-color-surface-accent')).toBe('#0077ff')
    expect(document.documentElement.style.cssText).toBe(originalRootStyles)
  })
})
