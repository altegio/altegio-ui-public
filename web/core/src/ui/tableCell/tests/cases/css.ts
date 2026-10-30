import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-table-cell-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-table-cell-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-table-cell-border-color', root: '--alt-core-color-stroke-primary' },
  { host: '--alt-core-table-cell-default-background-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-table-cell-stripe-background-color', root: '--alt-core-color-surface-secondary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-table-cell-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-table-cell-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-table-cell-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--alt-core-table-cell-default-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-table-cell-stripe-background-color', value: COLORS.surface_secondary.cssValue },
]
