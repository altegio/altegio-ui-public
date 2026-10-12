import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-chip-border-radius', root: '--y-core-size-radius-2-x' },

  { host: '--y-core-chip-size-small-gap', root: '--y-core-size-spacing-x' },
  { host: '--y-core-chip-size-small-padding-y', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-chip-size-small-padding-x', root: '--y-core-size-spacing-2-x' },

  { host: '--y-core-chip-size-large-gap', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-chip-size-large-padding-y', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-chip-size-large-padding-x', root: '--y-core-size-spacing-3-x' },

  { host: '--y-core-chip-color-default', root: '--y-core-color-icon-secondary' },
  { host: '--y-core-chip-color-active', root: '--y-core-color-other-contrast' },
  { host: '--y-core-chip-color-disabled', root: '--y-core-color-text-tertiary' },

  { host: '--y-core-chip-bg-default', root: '--y-core-color-surface-tertiary' },
  { host: '--y-core-chip-bg-active', root: '--y-core-color-other-invert' },
  { host: '--y-core-chip-bg-disabled', root: '--y-core-color-surface-tertiary-low' },
  { host: '--y-core-chip-bg-hover', root: '--y-core-color-surface-tertiary-high' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-chip-border-radius', value: SIZES.radius_2_x.cssValue },

  { host: '--y-core-chip-size-small-gap', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-chip-size-small-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-chip-size-small-padding-x', value: SIZES.spacing_2_x.cssValue },

  { host: '--y-core-chip-size-large-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-chip-size-large-padding-y', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-chip-size-large-padding-x', value: SIZES.spacing_3_x.cssValue },

  { host: '--y-core-chip-color-default', value: COLORS.icon_secondary.cssValue },
  { host: '--y-core-chip-color-active', value: COLORS.other_contrast.cssValue },
  { host: '--y-core-chip-color-disabled', value: COLORS.text_tertiary.cssValue },

  { host: '--y-core-chip-bg-default', value: COLORS.surface_tertiary.cssValue },
  { host: '--y-core-chip-bg-active', value: COLORS.other_invert.cssValue },
  { host: '--y-core-chip-bg-disabled', value: COLORS.surface_tertiary_low.cssValue },
  { host: '--y-core-chip-bg-hover', value: COLORS.surface_tertiary_high.cssValue },
]
