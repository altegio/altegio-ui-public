import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-skeleton-table-placeholder-background-color', root: '--y-core-color-surface-tertiary' },
  { host: '--y-core-skeleton-table-placeholder-radius', root: '--y-core-size-radius-x' },
  { host: '--y-core-skeleton-table-placeholder-animation-edge-background-color', root: '--y-core-color-surface-tertiary-low' },
  { host: '--y-core-skeleton-table-placeholder-animation-middle-background-color', root: '--y-core-color-surface-tertiary' },
  { host: '--y-core-skeleton-table-pagination-padding', root: '--y-core-size-spacing-6-x' },
  { host: '--y-core-skeleton-table-pagination-gap', root: '--y-core-size-spacing-6-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-skeleton-table-placeholder-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--y-core-skeleton-table-placeholder-radius', value: SIZES.radius_x.cssValue },
  { host: '--y-core-skeleton-table-placeholder-animation-edge-background-color', value: COLORS.surface_tertiary_low.cssValue },
  { host: '--y-core-skeleton-table-placeholder-animation-middle-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--y-core-skeleton-table-pagination-padding', value: SIZES.spacing_6_x.cssValue },
  { host: '--y-core-skeleton-table-pagination-gap', value: SIZES.spacing_6_x.cssValue },
]
