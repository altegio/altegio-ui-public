import { SIZES, COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-dropdown-cell-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-dropdown-cell-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-dropdown-cell-default-background-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-dropdown-cell-default-hover-background-color', root: '--alt-core-color-surface-secondary-high' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-dropdown-cell-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-dropdown-cell-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-dropdown-cell-default-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-dropdown-cell-default-hover-background-color', value: COLORS.surface_secondary_high.cssValue },
]
