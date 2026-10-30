import { COLORS, EXTENDED_COLORS } from '~root/tokens'

// Host CSS variables mapped to the root CSS variables
export const CSSVariablesHostToRootCases = [
  // General
  { host: '--alt-core-tag-font-family', root: '--alt-core-font-family' },
  { host: '--alt-core-tag-border-radius', root: '--alt-core-size-radius-x' },

  // Sizes
  { host: '--alt-core-tag-padding-small-x', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-tag-padding-small-y', root: '--alt-core-size-spacing-0-5-x' },
  { host: '--alt-core-tag-padding-medium-x', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-tag-padding-medium-y', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-tag-font-size-small', root: '--alt-core-typography-annotation-a-3-medium-font-size' },
  { host: '--alt-core-tag-font-size-small-line-height', root: '--alt-core-typography-annotation-a-3-medium-line-height' },
  { host: '--alt-core-tag-font-size-small-font-weight', root: '--alt-core-typography-annotation-a-3-medium-font-weight' },
  { host: '--alt-core-tag-font-size-medium', root: '--alt-core-typography-annotation-a-2-medium-font-size' },
  { host: '--alt-core-tag-font-size-medium-line-height', root: '--alt-core-typography-annotation-a-2-medium-line-height' },
  { host: '--alt-core-tag-font-size-medium-font-weight', root: '--alt-core-typography-annotation-a-2-medium-font-weight' },
  { host: '--alt-core-tag-padding-large-x', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-tag-padding-large-y', root: '--alt-core-size-spacing-1-5-x' },
  { host: '--alt-core-tag-font-size-large', root: '--alt-core-typography-paragraph-p-2-medium-font-size' },
  { host: '--alt-core-tag-font-size-large-line-height', root: '--alt-core-typography-paragraph-p-2-medium-line-height' },
  { host: '--alt-core-tag-font-size-large-font-weight', root: '--alt-core-typography-paragraph-p-2-medium-font-weight' },

  // Text colors
  { host: '--alt-core-tag-color-accent', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-tag-color-accent-disabled', root: '--alt-core-color-text-tertiary' },
  { host: '--alt-core-tag-color-muted', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-tag-color-muted-disabled', root: '--alt-core-color-text-tertiary' },
  { host: '--alt-core-tag-color-danger', root: '--alt-core-color-calm-text-red' },
  { host: '--alt-core-tag-color-danger-disabled', root: '--alt-core-color-calm-text-red-low' },
  { host: '--alt-core-tag-color-success', root: '--alt-core-color-calm-text-green' },
  { host: '--alt-core-tag-color-success-disabled', root: '--alt-core-color-calm-text-green-low' },
  { host: '--alt-core-tag-color-warning', root: '--alt-core-color-calm-text-orange' },
  { host: '--alt-core-tag-color-warning-disabled', root: '--alt-core-color-calm-text-orange-low' },
  { host: '--alt-core-tag-color-information', root: '--alt-core-color-calm-text-blue' },
  { host: '--alt-core-tag-color-information-disabled', root: '--alt-core-color-calm-text-blue-low' },
  { host: '--alt-core-tag-color-discovery', root: '--alt-core-color-calm-text-purple' },
  { host: '--alt-core-tag-color-discovery-disabled', root: '--alt-core-color-calm-text-purple-low' },

  // Background colors
  { host: '--alt-core-tag-bg-accent', root: '--alt-core-color-calm-surface-yellow-low' },
  { host: '--alt-core-tag-bg-muted', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-tag-bg-danger', root: '--alt-core-color-calm-surface-red-low' },
  { host: '--alt-core-tag-bg-success', root: '--alt-core-color-calm-surface-green-low' },
  { host: '--alt-core-tag-bg-warning', root: '--alt-core-color-calm-surface-orange-low' },
  { host: '--alt-core-tag-bg-information', root: '--alt-core-color-calm-surface-blue-low' },
  { host: '--alt-core-tag-bg-discovery', root: '--alt-core-color-calm-surface-purple-low' },

  // Spacing
  { host: '--alt-core-tag-gap', root: '--alt-core-size-spacing-x' },
]

// Host CSS variables mapped to the expected values
export const CSSVariablesHostToValueCases = [
  // Text colors
  { host: '--alt-core-tag-color-accent', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-tag-color-accent-disabled', value: COLORS.text_tertiary.cssValue },
  { host: '--alt-core-tag-color-muted', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-tag-color-muted-disabled', value: COLORS.text_tertiary.cssValue },
  { host: '--alt-core-tag-color-danger', value: EXTENDED_COLORS.calm_text_red.cssValue },
  { host: '--alt-core-tag-color-danger-disabled', value: EXTENDED_COLORS.calm_text_red_low.cssValue },
  { host: '--alt-core-tag-color-success', value: EXTENDED_COLORS.calm_text_green.cssValue },
  { host: '--alt-core-tag-color-success-disabled', value: EXTENDED_COLORS.calm_text_green_low.cssValue },
  { host: '--alt-core-tag-color-warning', value: EXTENDED_COLORS.calm_text_orange.cssValue },
  { host: '--alt-core-tag-color-warning-disabled', value: EXTENDED_COLORS.calm_text_orange_low.cssValue },
  { host: '--alt-core-tag-color-information', value: EXTENDED_COLORS.calm_text_blue.cssValue },
  { host: '--alt-core-tag-color-information-disabled', value: EXTENDED_COLORS.calm_text_blue_low.cssValue },
  { host: '--alt-core-tag-color-discovery', value: EXTENDED_COLORS.calm_text_purple.cssValue },
  { host: '--alt-core-tag-color-discovery-disabled', value: EXTENDED_COLORS.calm_text_purple_low.cssValue },

  // Background colors
  { host: '--alt-core-tag-bg-accent', value: EXTENDED_COLORS.calm_surface_yellow_low.cssValue },
  { host: '--alt-core-tag-bg-muted', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-tag-bg-danger', value: EXTENDED_COLORS.calm_surface_red_low.cssValue },
  { host: '--alt-core-tag-bg-success', value: EXTENDED_COLORS.calm_surface_green_low.cssValue },
  { host: '--alt-core-tag-bg-warning', value: EXTENDED_COLORS.calm_surface_orange_low.cssValue },
  { host: '--alt-core-tag-bg-information', value: EXTENDED_COLORS.calm_surface_blue_low.cssValue },
  { host: '--alt-core-tag-bg-discovery', value: EXTENDED_COLORS.calm_surface_purple_low.cssValue },
]
