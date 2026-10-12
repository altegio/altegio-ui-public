import { TYPOGRAPHY, SIZES, COLORS } from '~tokens/index'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-counter-size-small-font-size', root: '--y-core-typography-annotation-a-3-medium-font-size' },
  { host: '--y-core-counter-size-small-line-height', root: '--y-core-typography-annotation-a-3-medium-line-height' },
  { host: '--y-core-counter-size-small-font-weight', root: '--y-core-typography-annotation-a-3-medium-font-weight' },
  { host: '--y-core-counter-size-small-border-radius', root: '--y-core-size-radius-3-x' },
  { host: '--y-core-counter-size-small-padding-x', root: '--y-core-size-spacing-x, 4px' },

  { host: '--y-core-counter-size-medium-font-size', root: '--y-core-typography-paragraph-p-2-medium-font-size' },
  { host: '--y-core-counter-size-medium-line-height', root: '--y-core-typography-paragraph-p-2-medium-line-height' },
  { host: '--y-core-counter-size-medium-font-weight', root: '--y-core-typography-paragraph-p-2-medium-font-weight' },
  { host: '--y-core-counter-size-medium-border-radius', root: '--y-core-size-radius-3-x' },
  { host: '--y-core-counter-size-medium-padding-x', root: '--y-core-size-spacing-x-2, 8px' },

  { host: '--y-core-counter-variant-primary-color', root: '--y-core-color-text-on-accent' },
  { host: '--y-core-counter-variant-primary-background-color', root: '--y-core-color-surface-accent' },
  { host: '--y-core-counter-variant-primary-disabled-color', root: '--y-core-color-text-tertiary' },
  { host: '--y-core-counter-variant-primary-disabled-background-color', root: '--y-core-color-surface-accent-low' },

  { host: '--y-core-counter-variant-secondary-color', root: '--y-core-color-text-secondary' },
  { host: '--y-core-counter-variant-secondary-background-color', root: '--y-core-color-surface-tertiary' },
  { host: '--y-core-counter-variant-secondary-disabled-color', root: '--y-core-color-text-tertiary' },
  { host: '--y-core-counter-variant-secondary-disabled-background-color', root: '--y-core-color-surface-tertiary-low' },

  { host: '--y-core-counter-variant-negative-color', root: '--y-core-color-other-contrast' },
  { host: '--y-core-counter-variant-negative-background-color', root: '--y-core-color-surface-negative' },
  { host: '--y-core-counter-variant-negative-disabled-color', root: '--y-core-color-other-contrast' },
  { host: '--y-core-counter-variant-negative-disabled-background-color', root: '--y-core-color-surface-negative-low' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-counter-size-small-font-size', value: TYPOGRAPHY.annotation_a_3_medium_font_size.cssValue },
  { host: '--y-core-counter-size-small-line-height', value: TYPOGRAPHY.annotation_a_3_medium_line_height.cssValue },
  { host: '--y-core-counter-size-small-font-weight', value: TYPOGRAPHY.annotation_a_3_medium_font_weight.cssValue },
  { host: '--y-core-counter-size-small-border-radius', value: SIZES.radius_3_x.cssValue },
  { host: '--y-core-counter-size-small-padding-x', value: SIZES.spacing_x.cssValue },

  { host: '--y-core-counter-size-medium-font-size', value: TYPOGRAPHY.paragraph_p_2_medium_font_size.cssValue },
  { host: '--y-core-counter-size-medium-line-height', value: TYPOGRAPHY.paragraph_p_2_medium_line_height.cssValue },
  { host: '--y-core-counter-size-medium-font-weight', value: TYPOGRAPHY.paragraph_p_2_medium_font_weight.cssValue },
  { host: '--y-core-counter-size-medium-border-radius', value: SIZES.radius_3_x.cssValue },
  { host: '--y-core-counter-size-medium-padding-x', value: SIZES.spacing_2_x.cssValue },

  { host: '--y-core-counter-variant-primary-color', value: COLORS.text_on_accent.cssValue },
  { host: '--y-core-counter-variant-primary-background-color', value: COLORS.surface_accent.cssValue },
  { host: '--y-core-counter-variant-primary-disabled-color', value: COLORS.text_tertiary.cssValue },
  { host: '--y-core-counter-variant-primary-disabled-background-color', value: COLORS.surface_accent_low.cssValue },

  { host: '--y-core-counter-variant-secondary-color', value: COLORS.text_secondary.cssValue },
  { host: '--y-core-counter-variant-secondary-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--y-core-counter-variant-secondary-disabled-color', value: COLORS.text_tertiary.cssValue },
  { host: '--y-core-counter-variant-secondary-disabled-background-color', value: COLORS.surface_tertiary_low.cssValue },

  { host: '--y-core-counter-variant-negative-color', value: COLORS.other_contrast.cssValue },
  { host: '--y-core-counter-variant-negative-background-color', value: COLORS.surface_negative.cssValue },
  { host: '--y-core-counter-variant-negative-disabled-color', value: COLORS.other_contrast.cssValue },
  { host: '--y-core-counter-variant-negative-disabled-background-color', value: COLORS.surface_negative_low.cssValue },
]
