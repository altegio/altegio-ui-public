import { COLORS } from '~root/tokens'
import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-phone-code-background-color-hover', root: '--alt-core-color-surface-secondary' },
  { host: '--alt-core-phone-code-color-disabled', root: '--alt-core-color-icon-tertiary' },
  { host: '--alt-core-phone-code-spacing', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-phone-code-size-small-padding-y', root: '--alt-core-size-spacing-1-5-x' },
  { host: '--alt-core-phone-code-size-small-padding-left', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-phone-code-size-small-padding-right', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-phone-code-size-small-border-radius', root: '--alt-core-size-radius-1-5-x' },
  { host: '--alt-core-phone-code-size-medium-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-phone-code-size-medium-padding-left', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-phone-code-size-medium-padding-right', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-phone-code-size-medium-border-radius', root: '--alt-core-size-radius-2-x' },
  { host: '--alt-core-phone-code-size-large-padding-y', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-phone-code-size-large-padding-left', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-phone-code-size-large-padding-right', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-phone-code-size-large-border-radius', root: '--alt-core-size-radius-2-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-phone-code-background-color-hover', value: COLORS.surface_secondary.cssValue },
  { host: '--alt-core-phone-code-color-disabled', value: COLORS.icon_tertiary.cssValue },
  { host: '--alt-core-phone-code-spacing', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-phone-code-size-small-padding-y', value: SIZES.spacing_1_5_x.cssValue },
  { host: '--alt-core-phone-code-size-small-padding-left', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-phone-code-size-small-padding-right', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-phone-code-size-small-border-radius', value: SIZES.radius_1_5_x.cssValue },
  { host: '--alt-core-phone-code-size-medium-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-phone-code-size-medium-padding-left', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-phone-code-size-medium-padding-right', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-phone-code-size-medium-border-radius', value: SIZES.radius_2_x.cssValue },
  { host: '--alt-core-phone-code-size-large-padding-y', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-phone-code-size-large-padding-left', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-phone-code-size-large-padding-right', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-phone-code-size-large-border-radius', value: SIZES.radius_2_5_x.cssValue },
]
