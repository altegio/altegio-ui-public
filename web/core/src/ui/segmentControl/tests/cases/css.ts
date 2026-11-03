import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  // Colors
  {
    host: '--alt-core-segment-control-border-color',
    root: '--alt-core-color-stroke-primary-low',
  },
  {
    host: '--alt-core-segment-control-background-color',
    root: '--alt-core-color-surface-secondary',
  },

  // Sizes
  {
    host: '--alt-core-segment-control-size-border-radius',
    root: '--alt-core-size-radius-2-x',
  },
  {
    host: '--alt-core-segment-control-size-padding',
    root: '--alt-core-size-spacing-0-5-x',
  },
  {
    host: '--alt-core-segment-control-size-gap',
    root: '--alt-core-size-spacing-0-5-x',
  },
]

export const CSSVariablesHostToValueCases = [
  // General
  {
    host: '--alt-core-segment-control-display',
    value: 'flex',
  },

  // Colors
  {
    host: '--alt-core-segment-control-border-color',
    value: COLORS.stroke_primary_low.cssValue,
  },
  {
    host: '--alt-core-segment-control-background-color',
    value: COLORS.surface_secondary.cssValue,
  },

  // Sizes
  {
    host: '--alt-core-segment-control-border-size',
    value: '1px',
  },
  {
    host: '--alt-core-segment-control-size-border-radius',
    value: SIZES.radius_2_x.cssValue,
  },
  {
    host: '--alt-core-segment-control-size-padding',
    value: SIZES.spacing_0_5_x.cssValue,
  },
  {
    host: '--alt-core-segment-control-size-gap',
    value: SIZES.spacing_0_5_x.cssValue,
  },
]
