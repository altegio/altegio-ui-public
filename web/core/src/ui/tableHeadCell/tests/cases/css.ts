import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-table-cell-padding-x', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-table-head-cell-host-border-color', root: '--y-core-color-stroke-primary' },
  { host: '--y-core-table-head-cell-host-background-color', root: '--y-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-table-cell-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-table-head-cell-host-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--y-core-table-head-cell-host-background-color', value: COLORS.surface_primary.cssValue },
]
