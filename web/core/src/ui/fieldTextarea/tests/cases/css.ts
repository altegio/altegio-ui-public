import { COLORS, SIZES, TYPOGRAPHY } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-field-textarea-default-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-field-textarea-disabled-color', root: '--alt-core-color-text-tertiary' },
  { host: '--alt-core-field-textarea-placeholder-color', root: '--alt-core-color-text-tertiary' },

  { host: '--alt-core-field-textarea-size-small-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-field-textarea-size-small-padding-y', root: '--alt-core-size-spacing-1-5-x' },
  { host: '--alt-core-field-textarea-size-small-font-size', root: '--alt-core-typography-paragraph-p-2-regular-font-size' },
  { host: '--alt-core-field-textarea-size-small-line-height', root: '--alt-core-typography-paragraph-p-2-regular-line-height' },

  { host: '--alt-core-field-textarea-size-medium-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-field-textarea-size-medium-padding-y', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-field-textarea-size-medium-font-size', root: '--alt-core-typography-paragraph-p-1-regular-font-size' },
  { host: '--alt-core-field-textarea-size-medium-line-height', root: '--alt-core-typography-paragraph-p-1-regular-line-height' },

  { host: '--alt-core-field-textarea-size-large-padding-x', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-field-textarea-size-large-padding-y', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-field-textarea-size-large-font-size', root: '--alt-core-typography-paragraph-p-1-regular-font-size' },
  { host: '--alt-core-field-textarea-size-large-line-height', root: '--alt-core-typography-paragraph-p-1-regular-line-height' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-field-textarea-default-color', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-field-textarea-disabled-color', value: COLORS.text_tertiary.cssValue },
  { host: '--alt-core-field-textarea-placeholder-color', value: COLORS.text_tertiary.cssValue },

  { host: '--alt-core-field-textarea-size-small-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-field-textarea-size-small-padding-y', value: SIZES.spacing_1_5_x.cssValue },
  { host: '--alt-core-field-textarea-size-small-font-size', value: TYPOGRAPHY.paragraph_p_2_regular_font_size.cssValue },
  { host: '--alt-core-field-textarea-size-small-line-height', value: TYPOGRAPHY.paragraph_p_2_regular_line_height.cssValue },

  { host: '--alt-core-field-textarea-size-medium-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-field-textarea-size-medium-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-field-textarea-size-medium-font-size', value: TYPOGRAPHY.paragraph_p_1_regular_font_size.cssValue },
  { host: '--alt-core-field-textarea-size-medium-line-height', value: TYPOGRAPHY.paragraph_p_1_regular_line_height.cssValue },

  { host: '--alt-core-field-textarea-size-large-padding-x', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-field-textarea-size-large-padding-y', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-field-textarea-size-large-font-size', value: TYPOGRAPHY.paragraph_p_1_regular_font_size.cssValue },
  { host: '--alt-core-field-textarea-size-large-line-height', value: TYPOGRAPHY.paragraph_p_1_regular_line_height.cssValue },
]
