import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-chip-border-radius', root: '--alt-core-size-radius-2-x' },

  { host: '--alt-core-chip-size-small-gap', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-chip-size-small-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-chip-size-small-padding-x', root: '--alt-core-size-spacing-2-x' },

  { host: '--alt-core-chip-size-large-gap', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-chip-size-large-padding-y', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-chip-size-large-padding-x', root: '--alt-core-size-spacing-3-x' },

  { host: '--alt-core-chip-color-default', root: '--alt-core-color-icon-secondary' },
  { host: '--alt-core-chip-color-active', root: '--alt-core-color-other-contrast' },
  { host: '--alt-core-chip-color-disabled', root: '--alt-core-color-text-tertiary' },

  { host: '--alt-core-chip-bg-default', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-chip-bg-active', root: '--alt-core-color-other-invert' },
  { host: '--alt-core-chip-bg-disabled', root: '--alt-core-color-surface-tertiary-low' },
  { host: '--alt-core-chip-bg-hover', root: '--alt-core-color-surface-tertiary-high' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-chip-border-radius', value: SIZES.radius_2_x.cssValue },

  { host: '--alt-core-chip-size-small-gap', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-chip-size-small-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-chip-size-small-padding-x', value: SIZES.spacing_2_x.cssValue },

  { host: '--alt-core-chip-size-large-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-chip-size-large-padding-y', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-chip-size-large-padding-x', value: SIZES.spacing_3_x.cssValue },

  { host: '--alt-core-chip-color-default', value: COLORS.icon_secondary.cssValue },
  { host: '--alt-core-chip-color-active', value: COLORS.other_contrast.cssValue },
  { host: '--alt-core-chip-color-disabled', value: COLORS.text_tertiary.cssValue },

  { host: '--alt-core-chip-bg-default', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-chip-bg-active', value: COLORS.other_invert.cssValue },
  { host: '--alt-core-chip-bg-disabled', value: COLORS.surface_tertiary_low.cssValue },
  { host: '--alt-core-chip-bg-hover', value: COLORS.surface_tertiary_high.cssValue },
]
