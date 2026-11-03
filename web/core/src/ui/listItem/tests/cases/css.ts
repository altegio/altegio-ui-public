import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-list-item-min-height', root: '--alt-core-size-spacing-10-x' },
  { host: '--alt-core-list-item-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-list-item-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-list-item-border-radius', root: '--alt-core-size-radius-2-x' },
  { host: '--alt-core-list-item-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-list-item-caption-color', root: '--alt-core-color-text-secondary' },
  { host: '--alt-core-list-item-hover-background-color', root: '--alt-core-color-surface-secondary-high' },
  { host: '--alt-core-list-item-active-background-color', root: '--alt-core-color-surface-tertiary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-list-item-min-height', value: SIZES.spacing_10_x.cssValue },
  { host: '--alt-core-list-item-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-list-item-color', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-list-item-active-background-color', value: COLORS.surface_tertiary.cssValue },
]
