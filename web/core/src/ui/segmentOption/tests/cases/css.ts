import { COLORS, EFFECTS, SIZES, TYPOGRAPHY } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  // Цвета
  {
    host: '--y-core-segment-option-primary-color',
    root: '--y-core-color-text-primary',
  },
  {
    host: '--y-core-segment-option-secondary-color',
    root: '--y-core-color-text-secondary',
  },
  {
    host: '--y-core-segment-option-tertiary-color',
    root: '--y-core-color-text-tertiary',
  },
  {
    host: '--y-core-segment-option-active-background-color',
    root: '--y-core-color-surface-primary',
  },

  // Эффекты
  {
    host: '--y-core-segment-option-active-drop-shadow',
    root: '--y-core-effects-card-drop-shadow',
  },

  // Размеры - Small
  {
    host: '--y-core-segment-option-size-small-border-radius',
    root: '--y-core-size-radius-1-5-x',
  },
  {
    host: '--y-core-segment-option-size-small-padding-x',
    root: '--y-core-size-spacing-3-x',
  },
  {
    host: '--y-core-segment-option-size-small-padding-y',
    root: '--y-core-size-spacing-x',
  },
  {
    host: '--y-core-segment-option-size-small-font-size',
    root: '--y-core-typography-annotation-a-2-medium-font-size',
  },
  {
    host: '--y-core-segment-option-size-small-line-height',
    root: '--y-core-typography-annotation-a-2-medium-line-height',
  },
  {
    host: '--y-core-segment-option-size-small-font-weight',
    root: '--y-core-typography-annotation-a-2-medium-font-weight',
  },
  {
    host: '--y-core-segment-option-size-small-gap',
    root: '--y-core-size-spacing-x',
  },

  // Размеры - Medium
  {
    host: '--y-core-segment-option-size-medium-border-radius',
    root: '--y-core-size-radius-2-x',
  },
  {
    host: '--y-core-segment-option-size-medium-padding-x',
    root: '--y-core-size-spacing-3-x',
  },
  {
    host: '--y-core-segment-option-size-medium-padding-y',
    root: '--y-core-size-spacing-2-x',
  },
  {
    host: '--y-core-segment-option-size-medium-font-size',
    root: '--y-core-typography-paragraph-p-2-medium-font-size',
  },
  {
    host: '--y-core-segment-option-size-medium-line-height',
    root: '--y-core-typography-paragraph-p-2-medium-line-height',
  },
  {
    host: '--y-core-segment-option-size-medium-font-weight',
    root: '--y-core-typography-paragraph-p-2-medium-font-weight',
  },
  {
    host: '--y-core-segment-option-size-medium-gap',
    root: '--y-core-size-spacing-x',
  },

  // Размеры - Large
  {
    host: '--y-core-segment-option-size-large-border-radius',
    root: '--y-core-size-radius-2-5-x',
  },
  {
    host: '--y-core-segment-option-size-large-padding-x',
    root: '--y-core-size-spacing-3-x',
  },
  {
    host: '--y-core-segment-option-size-large-padding-y',
    root: '--y-core-size-spacing-2-x',
  },
  {
    host: '--y-core-segment-option-size-large-font-size',
    root: '--y-core-typography-paragraph-p-1-medium-font-size',
  },
  {
    host: '--y-core-segment-option-size-large-line-height',
    root: '--y-core-typography-paragraph-p-1-medium-line-height',
  },
  {
    host: '--y-core-segment-option-size-large-font-weight',
    root: '--y-core-typography-paragraph-p-1-medium-font-weight',
  },
  {
    host: '--y-core-segment-option-size-large-gap',
    root: '--y-core-size-spacing-2-x',
  },
]

export const CSSVariablesHostToValueCases = [
  // Цвета
  {
    host: '--y-core-segment-option-primary-color',
    value: COLORS.text_primary.cssValue,
  },
  {
    host: '--y-core-segment-option-secondary-color',
    value: COLORS.text_secondary.cssValue,
  },
  {
    host: '--y-core-segment-option-tertiary-color',
    value: COLORS.text_tertiary.cssValue,
  },
  {
    host: '--y-core-segment-option-background-color',
    value: 'transparent',
  },
  {
    host: '--y-core-segment-option-active-background-color',
    value: COLORS.surface_primary.cssValue,
  },

  // Эффекты
  {
    host: '--y-core-segment-option-active-drop-shadow',
    value: EFFECTS.card_drop_shadow.cssValue,
  },

  // Размеры - Small
  {
    host: '--y-core-segment-option-size-small-height',
    value: '28px',
  },
  {
    host: '--y-core-segment-option-size-small-border-radius',
    value: SIZES.radius_1_5_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-small-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-small-padding-y',
    value: SIZES.spacing_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-small-font-size',
    value: TYPOGRAPHY.annotation_a_2_medium_font_size.cssValue,
  },
  {
    host: '--y-core-segment-option-size-small-line-height',
    value: TYPOGRAPHY.annotation_a_2_medium_line_height.cssValue,
  },
  {
    host: '--y-core-segment-option-size-small-font-weight',
    value: TYPOGRAPHY.annotation_a_2_medium_font_weight.cssValue,
  },
  {
    host: '--y-core-segment-option-size-small-gap',
    value: SIZES.spacing_x.cssValue,
  },

  // Размеры - Medium
  {
    host: '--y-core-segment-option-size-medium-height',
    value: '36px',
  },
  {
    host: '--y-core-segment-option-size-medium-border-radius',
    value: SIZES.radius_2_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-medium-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-medium-padding-y',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-medium-font-size',
    value: TYPOGRAPHY.paragraph_p_2_medium_font_size.cssValue,
  },
  {
    host: '--y-core-segment-option-size-medium-line-height',
    value: TYPOGRAPHY.paragraph_p_2_medium_line_height.cssValue,
  },
  {
    host: '--y-core-segment-option-size-medium-font-weight',
    value: TYPOGRAPHY.paragraph_p_2_medium_font_weight.cssValue,
  },
  {
    host: '--y-core-segment-option-size-medium-gap',
    value: SIZES.spacing_x.cssValue,
  },

  // Размеры - Large
  {
    host: '--y-core-segment-option-size-large-height',
    value: '44px',
  },
  {
    host: '--y-core-segment-option-size-large-border-radius',
    value: SIZES.radius_2_5_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-large-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-large-padding-y',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--y-core-segment-option-size-large-font-size',
    value: TYPOGRAPHY.paragraph_p_1_medium_font_size.cssValue,
  },
  {
    host: '--y-core-segment-option-size-large-line-height',
    value: TYPOGRAPHY.paragraph_p_1_medium_line_height.cssValue,
  },
  {
    host: '--y-core-segment-option-size-large-font-weight',
    value: TYPOGRAPHY.paragraph_p_1_medium_font_weight.cssValue,
  },
  {
    host: '--y-core-segment-option-size-large-gap',
    value: SIZES.spacing_2_x.cssValue,
  },
]
