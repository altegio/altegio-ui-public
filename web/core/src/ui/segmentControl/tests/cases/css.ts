import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  // Цвета
  {
    host: '--y-core-segment-control-border-color',
    root: '--y-core-color-stroke-primary-low',
  },
  {
    host: '--y-core-segment-control-background-color',
    root: '--y-core-color-surface-secondary',
  },

  // Размеры
  {
    host: '--y-core-segment-control-size-border-radius',
    root: '--y-core-size-radius-2-x',
  },
  {
    host: '--y-core-segment-control-size-padding',
    root: '--y-core-size-spacing-0-5-x',
  },
  {
    host: '--y-core-segment-control-size-gap',
    root: '--y-core-size-spacing-0-5-x',
  },
]

export const CSSVariablesHostToValueCases = [
  // Общие
  {
    host: '--y-core-segment-control-display',
    value: 'flex',
  },

  // Цвета
  {
    host: '--y-core-segment-control-border-color',
    value: COLORS.stroke_primary_low.cssValue,
  },
  {
    host: '--y-core-segment-control-background-color',
    value: COLORS.surface_secondary.cssValue,
  },

  // Размеры
  {
    host: '--y-core-segment-control-border-size',
    value: '1px',
  },
  {
    host: '--y-core-segment-control-size-border-radius',
    value: SIZES.radius_2_x.cssValue,
  },
  {
    host: '--y-core-segment-control-size-padding',
    value: SIZES.spacing_0_5_x.cssValue,
  },
  {
    host: '--y-core-segment-control-size-gap',
    value: SIZES.spacing_0_5_x.cssValue,
  },
]
