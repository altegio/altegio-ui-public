import { SIZES, COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-dropdown-cell-padding-x', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-dropdown-cell-padding-y', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-dropdown-cell-default-background-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-dropdown-cell-default-hover-background-color', root: '--y-core-color-surface-secondary-high' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-dropdown-cell-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-dropdown-cell-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-dropdown-cell-default-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-dropdown-cell-default-hover-background-color', value: COLORS.surface_secondary_high.cssValue },
]
