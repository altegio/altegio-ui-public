import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-table-cell-padding-y', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-table-cell-padding-x', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-table-cell-border-color', root: '--y-core-color-stroke-primary' },
  { host: '--y-core-table-cell-default-background-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-table-cell-stripe-background-color', root: '--y-core-color-surface-secondary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-table-cell-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-table-cell-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-table-cell-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--y-core-table-cell-default-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-table-cell-stripe-background-color', value: COLORS.surface_secondary.cssValue },
]
