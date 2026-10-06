import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-card-wrapper-border-radius', root: '--y-core-size-radius-3-x' },
  { host: '--y-core-card-wrapper-border-color', root: '--y-core-color-stroke-primary' },
  { host: '--y-core-card-wrapper-default-background-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-card-wrapper-focused-border-color', root: '--y-core-color-stroke-primary-low' },
  { host: '--y-core-card-wrapper-focused-background-color', root: '--y-core-color-surface-primary-high' },
  { host: '--y-core-card-wrapper-hovered-border-color', root: '--y-core-color-stroke-primary' },
  { host: '--y-core-card-wrapper-hovered-background-color', root: '--y-core-color-surface-primary-high' },
  { host: '--y-core-card-wrapper-disabled-border-color', root: '--y-core-color-stroke-primary' },
  { host: '--y-core-card-wrapper-disabled-background-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-card-wrapper-checked-border-color', root: '--y-core-color-stroke-accent' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-card-wrapper-border-width', value: '1px' },
  { host: '--y-core-card-wrapper-border-radius', value: SIZES.radius_3_x.cssValue },
  { host: '--y-core-card-wrapper-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--y-core-card-wrapper-default-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-card-wrapper-focused-border-color', value: COLORS.stroke_primary_low.cssValue },
  { host: '--y-core-card-wrapper-focused-background-color', value: COLORS.surface_primary_high.cssValue },
  { host: '--y-core-card-wrapper-hovered-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--y-core-card-wrapper-hovered-background-color', value: COLORS.surface_primary_high.cssValue },
  { host: '--y-core-card-wrapper-disabled-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--y-core-card-wrapper-disabled-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-card-wrapper-checked-border-width', value: '2px' },
  { host: '--y-core-card-wrapper-checked-border-color', value: COLORS.stroke_accent.cssValue },
]
