import { COLORS } from '~root/tokens'
import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-calendar-grid-margin-top', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-calendar-week-day-margin-bottom', root: '--y-core-size-spacing-x' },
  { host: '--y-core-calendar-week-day-padding-y', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-calendar-week-day-padding-x', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-calendar-day-radius', root: '--y-core-size-radius-2-x' },
  { host: '--y-core-calendar-day-padding-y', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-calendar-day-padding-x', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-calendar-day-background-hover', root: '--y-core-color-surface-secondary-high' },
  { host: '--y-core-calendar-selected-day-background', root: '--y-core-color-surface-accent' },
  { host: '--y-core-calendar-selected-day-background-hover', root: '--y-core-color-surface-accent-high' },
  { host: '--y-core-calendar-selected-day-background-disabled', root: '--y-core-color-surface-accent-low' },
  { host: '--y-core-calendar-range-day-background', root: '--y-core-color-surface-tertiary' },
  { host: '--y-core-calendar-range-day-background-hover', root: '--y-core-color-surface-tertiary-high' },
  { host: '--y-core-calendar-range-day-background-disabled', root: '--y-core-color-surface-tertiary-low' },
  { host: '--y-core-calendar-day-today-line-color', root: '--y-core-color-icon-accent' },
  { host: '--y-core-calendar-day-today-line-color-on-selected', root: '--y-core-color-icon-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-calendar-grid-margin-top', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-calendar-week-day-margin-bottom', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-calendar-week-day-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-calendar-week-day-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-calendar-day-radius', value: SIZES.radius_2_x.cssValue },
  { host: '--y-core-calendar-day-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-calendar-day-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-calendar-day-background-hover', value: COLORS.surface_secondary_high.cssValue },
  { host: '--y-core-calendar-selected-day-background', value: COLORS.surface_accent.cssValue },
  { host: '--y-core-calendar-selected-day-background-hover', value: COLORS.surface_accent_high.cssValue },
  { host: '--y-core-calendar-selected-day-background-disabled', value: COLORS.surface_accent_low.cssValue },
  { host: '--y-core-calendar-range-day-background', value: COLORS.surface_tertiary.cssValue },
  { host: '--y-core-calendar-range-day-background-hover', value: COLORS.surface_tertiary_high.cssValue },
  { host: '--y-core-calendar-range-day-background-disabled', value: COLORS.surface_tertiary_low.cssValue },
  { host: '--y-core-calendar-day-today-line-color', value: COLORS.icon_accent.cssValue },
  { host: '--y-core-calendar-day-today-line-color-on-selected', value: COLORS.icon_primary.cssValue },
]
