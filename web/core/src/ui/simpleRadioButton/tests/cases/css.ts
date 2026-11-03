import { COLORS, SIZES } from '~tokens/index'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-simple-radio-button-size-small-padding', root: '--alt-core-size-spacing-0-5-x' },
  { host: '--alt-core-simple-radio-button-size-medium-padding', root: '--alt-core-size-spacing-0-5-x' },
  { host: '--alt-core-simple-radio-button-default-background-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-simple-radio-button-default-border-color', root: '--alt-core-color-stroke-primary' },
  { host: '--alt-core-simple-radio-button-default-hover-background-color', root: '--alt-core-color-surface-primary-high' },
  { host: '--alt-core-simple-radio-button-default-hover-border-color', root: '--alt-core-color-stroke-primary-high' },
  { host: '--alt-core-simple-radio-button-checked-background-color', root: '--alt-core-color-surface-accent' },
  { host: '--alt-core-simple-radio-button-checked-border-color', root: '--alt-core-color-stroke-primary' },
  { host: '--alt-core-simple-radio-button-checked-hover-background-color', root: '--alt-core-color-surface-accent-high' },
  { host: '--alt-core-simple-radio-button-checked-hover-border-color', root: '--alt-core-color-stroke-primary-high' },
  { host: '--alt-core-simple-radio-button-error-background-color', root: '--alt-core-color-surface-negative' },
  { host: '--alt-core-simple-radio-button-error-border-color', root: '--alt-core-color-surface-negative' },
  { host: '--alt-core-simple-radio-button-disabled-color', root: '--alt-core-color-stroke-primary-low' },
  { host: '--alt-core-simple-radio-button-disabled-checked-color', root: '--alt-core-color-surface-accent-low' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-simple-radio-button-size-small-padding', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--alt-core-simple-radio-button-size-medium-padding', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--alt-core-simple-radio-button-default-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-simple-radio-button-default-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--alt-core-simple-radio-button-default-hover-background-color', value: COLORS.surface_primary_high.cssValue },
  { host: '--alt-core-simple-radio-button-default-hover-border-color', value: COLORS.stroke_primary_high.cssValue },
  { host: '--alt-core-simple-radio-button-checked-background-color', value: COLORS.surface_accent.cssValue },
  { host: '--alt-core-simple-radio-button-checked-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--alt-core-simple-radio-button-checked-hover-background-color', value: COLORS.surface_accent_high.cssValue },
  { host: '--alt-core-simple-radio-button-checked-hover-border-color', value: COLORS.stroke_primary_high.cssValue },
  { host: '--alt-core-simple-radio-button-error-background-color', value: COLORS.surface_negative.cssValue },
  { host: '--alt-core-simple-radio-button-error-border-color', value: COLORS.surface_negative.cssValue },
  { host: '--alt-core-simple-radio-button-disabled-color', value: COLORS.stroke_primary_low.cssValue },
  { host: '--alt-core-simple-radio-button-disabled-checked-color', value: COLORS.surface_accent_low.cssValue },
]
