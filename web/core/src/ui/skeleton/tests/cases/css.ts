import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-skeleton-background-color', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-skeleton-border-radius', root: '--alt-core-size-radius-x' },
  { host: '--alt-core-skeleton-small-height', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-skeleton-medium-height', root: '--alt-core-size-spacing-6-x' },
  { host: '--alt-core-skeleton-large-height', root: '--alt-core-size-spacing-8-x' },
  { host: '--alt-core-skeleton-wave-edge-background-color', root: '--alt-core-color-surface-tertiary-low' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-skeleton-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-skeleton-border-radius', value: SIZES.radius_x.cssValue },
  { host: '--alt-core-skeleton-small-height', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-skeleton-medium-height', value: SIZES.spacing_6_x.cssValue },
  { host: '--alt-core-skeleton-large-height', value: SIZES.spacing_8_x.cssValue },
]
