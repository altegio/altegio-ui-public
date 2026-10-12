import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-collapse-item-radius', root: '--y-core-size-radius-3-x' },
  { host: '--y-core-collapse-item-padding-x', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-collapse-item-padding-y', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-collapse-item-border-color', root: '--y-core-color-stroke-primary' },
  { host: '--y-core-collapse-item-main-gap', root: '--y-core-size-spacing-0-5-x' },
  { host: '--y-core-collapse-item-variant-primary-background-color', root: '--y-core-color-surface-secondary' },
  { host: '--y-core-collapse-item-variant-primary-background-color-hover', root: '--y-core-color-surface-secondary-high' },
  { host: '--y-core-collapse-item-variant-secondary-background-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-collapse-item-variant-secondary-background-color-hover', root: '--y-core-color-surface-secondary-high' },
  { host: '--y-core-collapse-item-content-margin-horizontal', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-collapse-item-content-margin-top', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-collapse-item-toggle-slot-color', root: '--y-core-color-icon-primary' },
  { host: '--y-core-collapse-item-toggle-icon-color', root: '--y-core-color-icon-secondary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-collapse-item-radius', value: SIZES.radius_3_x.cssValue },
  { host: '--y-core-collapse-item-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-collapse-item-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-collapse-item-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--y-core-collapse-item-main-gap', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--y-core-collapse-item-variant-primary-background-color', value: COLORS.surface_secondary.cssValue },
  { host: '--y-core-collapse-item-variant-primary-background-color-hover', value: COLORS.surface_secondary_high.cssValue },
  { host: '--y-core-collapse-item-variant-secondary-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-collapse-item-variant-secondary-background-color-hover', value: COLORS.surface_secondary_high.cssValue },
  { host: '--y-core-collapse-item-content-margin-horizontal', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-collapse-item-content-margin-top', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-collapse-item-toggle-slot-color', value: COLORS.icon_primary.cssValue },
  { host: '--y-core-collapse-item-toggle-icon-color', value: COLORS.icon_secondary.cssValue },
]
