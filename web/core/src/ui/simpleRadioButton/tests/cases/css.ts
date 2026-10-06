import { COLORS, SIZES } from '~tokens/index'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-simple-radio-button-size-small-padding', root: '--y-core-size-spacing-0-5-x' },
  { host: '--y-core-simple-radio-button-size-medium-padding', root: '--y-core-size-spacing-0-5-x' },
  { host: '--y-core-simple-radio-button-default-background-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-simple-radio-button-default-border-color', root: '--y-core-color-stroke-primary' },
  { host: '--y-core-simple-radio-button-default-hover-background-color', root: '--y-core-color-surface-primary-high' },
  { host: '--y-core-simple-radio-button-default-hover-border-color', root: '--y-core-color-stroke-primary-high' },
  { host: '--y-core-simple-radio-button-checked-background-color', root: '--y-core-color-surface-accent' },
  { host: '--y-core-simple-radio-button-checked-border-color', root: '--y-core-color-stroke-primary' },
  { host: '--y-core-simple-radio-button-checked-hover-background-color', root: '--y-core-color-surface-accent-high' },
  { host: '--y-core-simple-radio-button-checked-hover-border-color', root: '--y-core-color-stroke-primary-high' },
  { host: '--y-core-simple-radio-button-error-background-color', root: '--y-core-color-surface-negative' },
  { host: '--y-core-simple-radio-button-error-border-color', root: '--y-core-color-surface-negative' },
  { host: '--y-core-simple-radio-button-disabled-color', root: '--y-core-color-stroke-primary-low' },
  { host: '--y-core-simple-radio-button-disabled-checked-color', root: '--y-core-color-surface-accent-low' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-simple-radio-button-size-small-padding', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--y-core-simple-radio-button-size-medium-padding', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--y-core-simple-radio-button-default-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-simple-radio-button-default-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--y-core-simple-radio-button-default-hover-background-color', value: COLORS.surface_primary_high.cssValue },
  { host: '--y-core-simple-radio-button-default-hover-border-color', value: COLORS.stroke_primary_high.cssValue },
  { host: '--y-core-simple-radio-button-checked-background-color', value: COLORS.surface_accent.cssValue },
  { host: '--y-core-simple-radio-button-checked-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--y-core-simple-radio-button-checked-hover-background-color', value: COLORS.surface_accent_high.cssValue },
  { host: '--y-core-simple-radio-button-checked-hover-border-color', value: COLORS.stroke_primary_high.cssValue },
  { host: '--y-core-simple-radio-button-error-background-color', value: COLORS.surface_negative.cssValue },
  { host: '--y-core-simple-radio-button-error-border-color', value: COLORS.surface_negative.cssValue },
  { host: '--y-core-simple-radio-button-disabled-color', value: COLORS.stroke_primary_low.cssValue },
  { host: '--y-core-simple-radio-button-disabled-checked-color', value: COLORS.surface_accent_low.cssValue },
]
