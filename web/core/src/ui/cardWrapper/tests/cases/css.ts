import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-card-wrapper-border-radius', root: '--alt-core-size-radius-3-x' },
  { host: '--alt-core-card-wrapper-border-color', root: '--alt-core-color-stroke-primary' },
  { host: '--alt-core-card-wrapper-default-background-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-card-wrapper-focused-border-color', root: '--alt-core-color-stroke-primary-low' },
  { host: '--alt-core-card-wrapper-focused-background-color', root: '--alt-core-color-surface-primary-high' },
  { host: '--alt-core-card-wrapper-hovered-border-color', root: '--alt-core-color-stroke-primary' },
  { host: '--alt-core-card-wrapper-hovered-background-color', root: '--alt-core-color-surface-primary-high' },
  { host: '--alt-core-card-wrapper-disabled-border-color', root: '--alt-core-color-stroke-primary' },
  { host: '--alt-core-card-wrapper-disabled-background-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-card-wrapper-checked-border-color', root: '--alt-core-color-stroke-accent' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-card-wrapper-border-width', value: '1px' },
  { host: '--alt-core-card-wrapper-border-radius', value: SIZES.radius_3_x.cssValue },
  { host: '--alt-core-card-wrapper-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--alt-core-card-wrapper-default-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-card-wrapper-focused-border-color', value: COLORS.stroke_primary_low.cssValue },
  { host: '--alt-core-card-wrapper-focused-background-color', value: COLORS.surface_primary_high.cssValue },
  { host: '--alt-core-card-wrapper-hovered-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--alt-core-card-wrapper-hovered-background-color', value: COLORS.surface_primary_high.cssValue },
  { host: '--alt-core-card-wrapper-disabled-border-color', value: COLORS.stroke_primary.cssValue },
  { host: '--alt-core-card-wrapper-disabled-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-card-wrapper-checked-border-width', value: '2px' },
  { host: '--alt-core-card-wrapper-checked-border-color', value: COLORS.stroke_accent.cssValue },
]
