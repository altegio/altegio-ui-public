import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-collapse-item-radius', root: '--alt-core-size-radius-3-x' },
  { host: '--alt-core-collapse-item-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-collapse-item-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-collapse-item-border-color', root: '--alt-core-color-stroke-primary' },
  { host: '--alt-core-collapse-item-main-gap', root: '--alt-core-size-spacing-0-5-x' },
  { host: '--alt-core-collapse-item-variant-primary-background-color', root: '--alt-core-color-surface-secondary' },
  { host: '--alt-core-collapse-item-variant-primary-background-color-hover', root: '--alt-core-color-surface-secondary-high' },
  { host: '--alt-core-collapse-item-variant-secondary-background-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-collapse-item-variant-secondary-background-color-hover', root: '--alt-core-color-surface-secondary-high' },
  { host: '--alt-core-collapse-item-content-margin-horizontal', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-collapse-item-content-margin-top', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-collapse-item-toggle-slot-color', root: '--alt-core-color-icon-primary' },
  { host: '--alt-core-collapse-item-toggle-icon-color', root: '--alt-core-color-icon-secondary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-collapse-item-radius', value: SIZES.radius_3_x.cssValue },
  { host: '--alt-core-collapse-item-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-collapse-item-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-collapse-item-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--alt-core-collapse-item-main-gap', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--alt-core-collapse-item-variant-primary-background-color', value: COLORS.surface_secondary.cssValue },
  { host: '--alt-core-collapse-item-variant-primary-background-color-hover', value: COLORS.surface_secondary_high.cssValue },
  { host: '--alt-core-collapse-item-variant-secondary-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-collapse-item-variant-secondary-background-color-hover', value: COLORS.surface_secondary_high.cssValue },
  { host: '--alt-core-collapse-item-content-margin-horizontal', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-collapse-item-content-margin-top', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-collapse-item-toggle-slot-color', value: COLORS.icon_primary.cssValue },
  { host: '--alt-core-collapse-item-toggle-icon-color', value: COLORS.icon_secondary.cssValue },
]
