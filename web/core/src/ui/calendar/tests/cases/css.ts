import { COLORS } from '~root/tokens'
import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-calendar-grid-margin-top', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-calendar-week-day-margin-bottom', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-calendar-week-day-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-calendar-week-day-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-calendar-day-radius', root: '--alt-core-size-radius-2-x' },
  { host: '--alt-core-calendar-day-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-calendar-day-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-calendar-day-background-hover', root: '--alt-core-color-surface-secondary-high' },
  { host: '--alt-core-calendar-selected-day-background', root: '--alt-core-color-surface-accent' },
  { host: '--alt-core-calendar-selected-day-background-hover', root: '--alt-core-color-surface-accent-high' },
  { host: '--alt-core-calendar-selected-day-background-disabled', root: '--alt-core-color-surface-accent-low' },
  { host: '--alt-core-calendar-range-day-background', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-calendar-range-day-background-hover', root: '--alt-core-color-surface-tertiary-high' },
  { host: '--alt-core-calendar-range-day-background-disabled', root: '--alt-core-color-surface-tertiary-low' },
  { host: '--alt-core-calendar-day-today-line-color', root: '--alt-core-color-icon-accent' },
  { host: '--alt-core-calendar-day-today-line-color-on-selected', root: '--alt-core-color-icon-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-calendar-grid-margin-top', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-calendar-week-day-margin-bottom', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-calendar-week-day-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-calendar-week-day-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-calendar-day-radius', value: SIZES.radius_2_x.cssValue },
  { host: '--alt-core-calendar-day-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-calendar-day-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-calendar-day-background-hover', value: COLORS.surface_secondary_high.cssValue },
  { host: '--alt-core-calendar-selected-day-background', value: COLORS.surface_accent.cssValue },
  { host: '--alt-core-calendar-selected-day-background-hover', value: COLORS.surface_accent_high.cssValue },
  { host: '--alt-core-calendar-selected-day-background-disabled', value: COLORS.surface_accent_low.cssValue },
  { host: '--alt-core-calendar-range-day-background', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-calendar-range-day-background-hover', value: COLORS.surface_tertiary_high.cssValue },
  { host: '--alt-core-calendar-range-day-background-disabled', value: COLORS.surface_tertiary_low.cssValue },
  { host: '--alt-core-calendar-day-today-line-color', value: COLORS.icon_accent.cssValue },
  { host: '--alt-core-calendar-day-today-line-color-on-selected', value: COLORS.icon_primary.cssValue },
]
