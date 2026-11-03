import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-skeleton-table-placeholder-background-color', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-skeleton-table-placeholder-radius', root: '--alt-core-size-radius-x' },
  { host: '--alt-core-skeleton-table-placeholder-animation-edge-background-color', root: '--alt-core-color-surface-tertiary-low' },
  { host: '--alt-core-skeleton-table-placeholder-animation-middle-background-color', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-skeleton-table-pagination-padding', root: '--alt-core-size-spacing-6-x' },
  { host: '--alt-core-skeleton-table-pagination-gap', root: '--alt-core-size-spacing-6-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-skeleton-table-placeholder-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-skeleton-table-placeholder-radius', value: SIZES.radius_x.cssValue },
  { host: '--alt-core-skeleton-table-placeholder-animation-edge-background-color', value: COLORS.surface_tertiary_low.cssValue },
  { host: '--alt-core-skeleton-table-placeholder-animation-middle-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-skeleton-table-pagination-padding', value: SIZES.spacing_6_x.cssValue },
  { host: '--alt-core-skeleton-table-pagination-gap', value: SIZES.spacing_6_x.cssValue },
]
