import { COLORS, SIZES } from '~root/tokens'

// TODO: Add tests for stripe-background-color once its token exists
export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-table-row-slot-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-table-row-slot-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-table-row-default-background-color', root: '--alt-core-color-surface-primary' },
  // { host: '--alt-core-table-row-stripe-background-color', root: '--alt-core-color-surface-secondary' },
  { host: '--alt-core-table-row-sticky-background-color', root: '--alt-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-table-row-slot-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-table-row-slot-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-table-row-default-background-color', value: COLORS.surface_primary.cssValue },
  // { host: '--alt-core-table-row-stripe-background-color', value: COLORS.surface_secondary.cssValue },
  { host: '--alt-core-table-row-sticky-background-color', value: COLORS.surface_primary.cssValue },
]
