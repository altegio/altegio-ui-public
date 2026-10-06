/**
 * references:
 * @link https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
 * @link https://github.com/mui-org/material-ui
 */

import type { RgbaColor } from 'colord'
import { colord } from 'colord'
import { EColorType } from '../types/color'

const BLACK_RGB: RgbaColor = { r: 18, g: 18, b: 18, a: 1 }
const WHITE_RGB: RgbaColor = { r: 255, g: 255, b: 255, a: 1 }

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param rgb
 * @returns The relative brightness of the color in the range 0 - 1
 */
function getLuminance(rgb: RgbaColor): number {
  const transformer = (v: number) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }

  return transformer(rgb.r) * 0.2126 + transformer(rgb.g) * 0.7152 + transformer(rgb.b) * 0.0722
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param foreground
 * @param background
 * @returns A contrast ratio value in the range 0 - 21.
 */
function getContrastRatio(foreground: RgbaColor, background: RgbaColor) {
  const lumA = getLuminance(foreground)
  const lumB = getLuminance(background)
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)
}

export function getColorType(rgb: RgbaColor): EColorType {
  const whiteContrastRatio = getContrastRatio(rgb, WHITE_RGB)
  const blackContrastRatio = getContrastRatio(rgb, BLACK_RGB)

  if (whiteContrastRatio <= 1.4) {
    return EColorType.lighter
  }

  if (whiteContrastRatio <= 3) {
    return EColorType.light
  }

  if (blackContrastRatio >= 1.4) {
    return EColorType.bright
  }

  if (blackContrastRatio < 1.4) {
    return EColorType.dark
  }

  throw new Error(`Unexpected behaviour: ${colord(rgb).toRgbString()} ${whiteContrastRatio}, ${blackContrastRatio}`)
}
