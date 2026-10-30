import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-table-cell-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-table-head-cell-host-border-color', root: '--alt-core-color-stroke-primary' },
  { host: '--alt-core-table-head-cell-host-background-color', root: '--alt-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-table-cell-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-table-head-cell-host-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--alt-core-table-head-cell-host-background-color', value: COLORS.surface_primary.cssValue },
]
