import { COLORS, SIZES } from '~root/tokens'

// TODO: Добавить тесты для stripe-background-color когда появится токен
export const CSSVariablesHostToRootCases = [
  { host: '--y-core-table-row-slot-padding-y', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-table-row-slot-padding-x', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-table-row-default-background-color', root: '--y-core-color-surface-primary' },
  // { host: '--y-core-table-row-stripe-background-color', root: '--y-core-color-surface-secondary' },
  { host: '--y-core-table-row-sticky-background-color', root: '--y-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-table-row-slot-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-table-row-slot-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-table-row-default-background-color', value: COLORS.surface_primary.cssValue },
  // { host: '--y-core-table-row-stripe-background-color', value: COLORS.surface_secondary.cssValue },
  { host: '--y-core-table-row-sticky-background-color', value: COLORS.surface_primary.cssValue },
]
