import { colord } from 'colord'
import type { Colord, RgbaColor } from 'colord'
import colors from './colors.json' with { type: 'json' }
import extendedColors from './extended_colours.json' with { type: 'json' }

export const DEFAULT_ACCENT = '#ffcb00'

/** Active text needs 4.5:1; essential control boundaries and focus indicators need 3:1.
 * Tertiary and *_low foregrounds are reserved for disabled/decorative content.
 */
export const semanticContrast = { text: 4.5, control: 3 } as const

const baseColors = { ...colors, ...extendedColors }
export type TPalette = Record<string, string>

function composite(foreground: string, background: string): string {
  const fg = colord(foreground).toRgb()
  const bg = colord(background).toRgb()
  return colord({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
  }).toHex()
}

function luminance({ r, g, b }: RgbaColor): number {
  const linear = (value: number) => {
    const channel = value / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  }
  return linear(r) * 0.2126 + linear(g) * 0.7152 + linear(b) * 0.0722
}

/** Alpha is composited before comparing, using the supplied opaque backing surface. */
export function contrastRatio(foreground: string, background: string, backing = '#ffffff'): number {
  const bg = composite(background, backing)
  const first = luminance(colord(composite(foreground, bg)).toRgb())
  const second = luminance(colord(bg).toRgb())
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
}

/** Keep the hue/saturation and make the smallest lightness adjustment that passes every surface.
 * A small margin protects against channel rounding in CSS and browser contrast checks.
 */
function foregroundOn(color: string, backgrounds: string[], minimum: number = semanticContrast.text): string {
  const originalHex = composite(color, backgrounds[0])
  const passes = (candidate: string) => backgrounds.every((background) => contrastRatio(candidate, background) >= minimum + 0.05)
  if (passes(originalHex)) return originalHex
  const original = colord(originalHex).toHsl()

  for (let step = 1; step <= 100; step++) {
    const candidate = [-1, 1]
      .map((direction) => colord({ ...original, l: Math.min(100, Math.max(0, original.l + step * direction)) }).toHex())
      .find(passes)
    if (candidate) return candidate
  }
  throw new Error(`No accessible foreground for ${color} on ${backgrounds.join(', ')}`)
}

const darkColors: TPalette = {
  text_primary: '#ebedef',
  text_secondary: '#b9bdc3',
  text_tertiary: 'rgba(255, 255, 255, 0.26)',
  icon_primary: '#ebedef',
  icon_secondary: '#b9bdc3',
  icon_tertiary: 'rgba(255, 255, 255, 0.26)',
  stroke_primary: 'rgba(255, 255, 255, 0.15)',
  stroke_primary_low: 'rgba(255, 255, 255, 0.05)',
  stroke_primary_high: 'rgba(255, 255, 255, 0.25)',
  stroke_secondary: 'rgba(255, 255, 255, 0.03)',
  stroke_secondary_low: '#26282c',
  stroke_control: '#8e939b',
  surface_primary: '#1c1e22',
  surface_primary_high: 'rgba(255, 255, 255, 0.02)',
  surface_secondary: 'rgba(255, 255, 255, 0.03)',
  surface_secondary_low: 'rgba(255, 255, 255, 0.02)',
  surface_secondary_high: 'rgba(255, 255, 255, 0.05)',
  surface_secondary_fill: '#26282c',
  surface_tertiary: 'rgba(255, 255, 255, 0.07)',
  surface_tertiary_low: 'rgba(255, 255, 255, 0.05)',
  surface_tertiary_high: 'rgba(255, 255, 255, 0.2)',
  text_negative: '#ff8589',
  text_positive: '#77d88b',
  text_warning: '#ffc56b',
  other_link: '#92b6ff',
  other_base: '#26282c',
}

function applyAccent(palette: TPalette, accent: Colord, dark: boolean, surfaces: string[]) {
  const resolvedAccent = composite(accent.toRgbString(), palette.surface_primary)
  palette.surface_accent = resolvedAccent
  palette.surface_accent_low = accent.alpha(accent.alpha() * (dark ? 0.2 : 0.3)).toRgbString()
  const hoverAccent = accent.toHex() === DEFAULT_ACCENT
    ? colors.surface_accent_high.cssValue
    : accent.darken(0.06).toRgbString()

  // Choose one foreground for the normal and hover accent surfaces. Keep the brand fill intact.
  palette.text_on_accent = foregroundOn('#262626', [resolvedAccent])
  palette.surface_accent_high = foregroundOn(composite(hoverAccent, palette.surface_primary), [palette.text_on_accent])
  palette.icon_on_accent = palette.text_on_accent
  palette.text_accent = foregroundOn(resolvedAccent, surfaces)
  palette.icon_accent = palette.text_accent
  palette.stroke_accent = foregroundOn(resolvedAccent, surfaces, semanticContrast.control)
  palette.focus_ring = palette.stroke_accent
  palette.stroke_control = foregroundOn(palette.stroke_control, surfaces, semanticContrast.control)
}

function applyForegrounds(palette: TPalette, surfaces: string[]) {
  for (const role of ['text_primary', 'text_secondary', 'text_positive', 'text_negative', 'text_warning', 'other_link']) {
    palette[role] = foregroundOn(palette[role], surfaces)
  }
  for (const role of ['primary', 'secondary', 'positive', 'negative', 'warning']) {
    palette[`icon_${role}`] = palette[`text_${role}`]
  }
  for (const role of ['positive', 'negative', 'warning']) {
    palette[`stroke_${role}`] = foregroundOn(palette[`text_${role}`], surfaces, semanticContrast.control)
  }
}

function applyFilledSurfaces(palette: TPalette) {
  // A filled status/brand control uses white in both themes; foreground roles use the ambient surfaces.
  for (const role of ['surface_negative', 'surface_negative_high', 'surface_positive', 'other_brand_whatsapp', 'other_brand_whatsapp_high']) {
    palette[role] = foregroundOn(palette[role], ['#ffffff'])
  }
}

function applyStatusLabels(palette: TPalette, surfaces: string[]) {
  const primary = palette.surface_primary
  for (const key of Object.keys(palette).filter((key) => (/^calm_text_(?!.*_low$)/).test(key))) {
    const name = key.slice('calm_text_'.length)
    const tintedSurface = composite(palette[`calm_surface_${name}_low`] ?? primary, primary)
    palette[key] = foregroundOn(palette[key], [...surfaces, tintedSurface])
    palette[`calm_icon_${name}`] = palette[key]
  }
}

/** Shared by generated CSS/constants and PaletteModule. All names remain CSS-token compatible. */
export function generatePalette(accentColor = DEFAULT_ACCENT, useDarkTheme = false): TPalette {
  const accent = colord(accentColor)
  if (!accent.isValid()) throw new TypeError(`Invalid accent color: ${accentColor}`)
  const palette: TPalette = {
    ...Object.fromEntries(Object.entries(baseColors).map(([key, token]) => [key, token.cssValue])),
    ...useDarkTheme ? darkColors : {},
  }
  const surfaces = ['surface_primary', 'surface_secondary_fill', 'surface_tertiary', 'surface_tertiary_high']
    .map((key) => composite(palette[key], palette.surface_primary))
  applyAccent(palette, accent, useDarkTheme, surfaces)
  applyForegrounds(palette, surfaces)
  applyFilledSurfaces(palette)
  applyStatusLabels(palette, surfaces)
  return palette
}
