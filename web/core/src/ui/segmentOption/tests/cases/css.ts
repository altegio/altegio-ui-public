import { COLORS, EFFECTS, SIZES, TYPOGRAPHY } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  // Colors
  {
    host: '--alt-core-segment-option-primary-color',
    root: '--alt-core-color-text-primary',
  },
  {
    host: '--alt-core-segment-option-secondary-color',
    root: '--alt-core-color-text-secondary',
  },
  {
    host: '--alt-core-segment-option-tertiary-color',
    root: '--alt-core-color-text-tertiary',
  },
  {
    host: '--alt-core-segment-option-active-background-color',
    root: '--alt-core-color-surface-primary',
  },

  // Effects
  {
    host: '--alt-core-segment-option-active-drop-shadow',
    root: '--alt-core-effects-card-drop-shadow',
  },

  // Sizes - Small
  {
    host: '--alt-core-segment-option-size-small-border-radius',
    root: '--alt-core-size-radius-1-5-x',
  },
  {
    host: '--alt-core-segment-option-size-small-padding-x',
    root: '--alt-core-size-spacing-3-x',
  },
  {
    host: '--alt-core-segment-option-size-small-padding-y',
    root: '--alt-core-size-spacing-x',
  },
  {
    host: '--alt-core-segment-option-size-small-font-size',
    root: '--alt-core-typography-annotation-a-2-medium-font-size',
  },
  {
    host: '--alt-core-segment-option-size-small-line-height',
    root: '--alt-core-typography-annotation-a-2-medium-line-height',
  },
  {
    host: '--alt-core-segment-option-size-small-font-weight',
    root: '--alt-core-typography-annotation-a-2-medium-font-weight',
  },
  {
    host: '--alt-core-segment-option-size-small-gap',
    root: '--alt-core-size-spacing-x',
  },

  // Sizes - Medium
  {
    host: '--alt-core-segment-option-size-medium-border-radius',
    root: '--alt-core-size-radius-2-x',
  },
  {
    host: '--alt-core-segment-option-size-medium-padding-x',
    root: '--alt-core-size-spacing-3-x',
  },
  {
    host: '--alt-core-segment-option-size-medium-padding-y',
    root: '--alt-core-size-spacing-2-x',
  },
  {
    host: '--alt-core-segment-option-size-medium-font-size',
    root: '--alt-core-typography-paragraph-p-2-medium-font-size',
  },
  {
    host: '--alt-core-segment-option-size-medium-line-height',
    root: '--alt-core-typography-paragraph-p-2-medium-line-height',
  },
  {
    host: '--alt-core-segment-option-size-medium-font-weight',
    root: '--alt-core-typography-paragraph-p-2-medium-font-weight',
  },
  {
    host: '--alt-core-segment-option-size-medium-gap',
    root: '--alt-core-size-spacing-x',
  },

  // Sizes - Large
  {
    host: '--alt-core-segment-option-size-large-border-radius',
    root: '--alt-core-size-radius-2-5-x',
  },
  {
    host: '--alt-core-segment-option-size-large-padding-x',
    root: '--alt-core-size-spacing-3-x',
  },
  {
    host: '--alt-core-segment-option-size-large-padding-y',
    root: '--alt-core-size-spacing-2-x',
  },
  {
    host: '--alt-core-segment-option-size-large-font-size',
    root: '--alt-core-typography-paragraph-p-1-medium-font-size',
  },
  {
    host: '--alt-core-segment-option-size-large-line-height',
    root: '--alt-core-typography-paragraph-p-1-medium-line-height',
  },
  {
    host: '--alt-core-segment-option-size-large-font-weight',
    root: '--alt-core-typography-paragraph-p-1-medium-font-weight',
  },
  {
    host: '--alt-core-segment-option-size-large-gap',
    root: '--alt-core-size-spacing-2-x',
  },
]

export const CSSVariablesHostToValueCases = [
  // Colors
  {
    host: '--alt-core-segment-option-primary-color',
    value: COLORS.text_primary.cssValue,
  },
  {
    host: '--alt-core-segment-option-secondary-color',
    value: COLORS.text_secondary.cssValue,
  },
  {
    host: '--alt-core-segment-option-tertiary-color',
    value: COLORS.text_tertiary.cssValue,
  },
  {
    host: '--alt-core-segment-option-background-color',
    value: 'transparent',
  },
  {
    host: '--alt-core-segment-option-active-background-color',
    value: COLORS.surface_primary.cssValue,
  },

  // Effects
  {
    host: '--alt-core-segment-option-active-drop-shadow',
    value: EFFECTS.card_drop_shadow.cssValue,
  },

  // Sizes - Small
  {
    host: '--alt-core-segment-option-size-small-height',
    value: '28px',
  },
  {
    host: '--alt-core-segment-option-size-small-border-radius',
    value: SIZES.radius_1_5_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-small-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-small-padding-y',
    value: SIZES.spacing_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-small-font-size',
    value: TYPOGRAPHY.annotation_a_2_medium_font_size.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-small-line-height',
    value: TYPOGRAPHY.annotation_a_2_medium_line_height.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-small-font-weight',
    value: TYPOGRAPHY.annotation_a_2_medium_font_weight.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-small-gap',
    value: SIZES.spacing_x.cssValue,
  },

  // Sizes - Medium
  {
    host: '--alt-core-segment-option-size-medium-height',
    value: '36px',
  },
  {
    host: '--alt-core-segment-option-size-medium-border-radius',
    value: SIZES.radius_2_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-medium-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-medium-padding-y',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-medium-font-size',
    value: TYPOGRAPHY.paragraph_p_2_medium_font_size.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-medium-line-height',
    value: TYPOGRAPHY.paragraph_p_2_medium_line_height.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-medium-font-weight',
    value: TYPOGRAPHY.paragraph_p_2_medium_font_weight.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-medium-gap',
    value: SIZES.spacing_x.cssValue,
  },

  // Sizes - Large
  {
    host: '--alt-core-segment-option-size-large-height',
    value: '44px',
  },
  {
    host: '--alt-core-segment-option-size-large-border-radius',
    value: SIZES.radius_2_5_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-large-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-large-padding-y',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-large-font-size',
    value: TYPOGRAPHY.paragraph_p_1_medium_font_size.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-large-line-height',
    value: TYPOGRAPHY.paragraph_p_1_medium_line_height.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-large-font-weight',
    value: TYPOGRAPHY.paragraph_p_1_medium_font_weight.cssValue,
  },
  {
    host: '--alt-core-segment-option-size-large-gap',
    value: SIZES.spacing_2_x.cssValue,
  },
]
