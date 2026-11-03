import { COLORS, SIZES, TYPOGRAPHY } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--alt-core-field-input-default-color',
    root: '--alt-core-color-text-primary',
  },
  {
    host: '--alt-core-field-input-disabled-color',
    root: '--alt-core-color-text-tertiary',
  },
  {
    host: '--alt-core-field-input-placeholder-color',
    root: '--alt-core-color-text-tertiary',
  },
  {
    host: '--alt-core-field-input-size-small-padding-x',
    root: '--alt-core-size-spacing-3-x',
  },
  {
    host: '--alt-core-field-input-size-small-padding-y',
    root: '--alt-core-field-input-outer-size-small-padding-y',
  },
  {
    host: '--alt-core-field-input-size-small-font-size',
    root: '--alt-core-typography-paragraph-p-2-regular-font-size',
  },
  {
    host: '--alt-core-field-input-size-small-line-height',
    root: '--alt-core-typography-paragraph-p-2-regular-line-height',
  },
  {
    host: '--alt-core-field-input-size-medium-padding-x',
    root: '--alt-core-size-spacing-3-x',
  },
  {
    host: '--alt-core-field-input-size-medium-padding-y',
    root: '--alt-core-field-input-outer-size-medium-padding-y',
  },
  {
    host: '--alt-core-field-input-size-medium-font-size',
    root: '--alt-core-typography-paragraph-p-1-regular-font-size',
  },
  {
    host: '--alt-core-field-input-size-medium-line-height',
    root: '--alt-core-typography-paragraph-p-1-regular-line-height',
  },
  {
    host: '--alt-core-field-input-size-large-padding-x',
    root: '--alt-core-size-spacing-3-x',
  },
  {
    host: '--alt-core-field-input-size-large-padding-y',
    root: '--alt-core-field-input-outer-size-large-padding-y',
  },
  {
    host: '--alt-core-field-input-size-large-font-size',
    root: '--alt-core-typography-paragraph-p-1-regular-font-size',
  },
  {
    host: '--alt-core-field-input-size-large-line-height',
    root: '--alt-core-typography-paragraph-p-1-regular-line-height',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--alt-core-field-input-default-color',
    value: COLORS.text_primary.cssValue,
  },
  {
    host: '--alt-core-field-input-disabled-color',
    value: COLORS.text_tertiary.cssValue,
  },
  {
    host: '--alt-core-field-input-placeholder-color',
    value: COLORS.text_tertiary.cssValue,
  },
  {
    host: '--alt-core-field-input-size-small-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--alt-core-field-input-size-small-padding-y',
    value: SIZES.spacing_1_5_x.cssValue,
  },
  {
    host: '--alt-core-field-input-size-small-font-size',
    value: TYPOGRAPHY.paragraph_p_2_regular_font_size.cssValue,
  },
  {
    host: '--alt-core-field-input-size-small-line-height',
    value: TYPOGRAPHY.paragraph_p_2_regular_line_height.cssValue,
  },
  {
    host: '--alt-core-field-input-size-medium-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--alt-core-field-input-size-medium-padding-y',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--alt-core-field-input-size-medium-font-size',
    value: TYPOGRAPHY.paragraph_p_1_regular_font_size.cssValue,
  },
  {
    host: '--alt-core-field-input-size-medium-line-height',
    value: TYPOGRAPHY.paragraph_p_1_regular_line_height.cssValue,
  },
  {
    host: '--alt-core-field-input-size-large-padding-x',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--alt-core-field-input-size-large-padding-y',
    value: SIZES.spacing_3_x.cssValue,
  },
  {
    host: '--alt-core-field-input-size-large-font-size',
    value: TYPOGRAPHY.paragraph_p_1_regular_font_size.cssValue,
  },
  {
    host: '--alt-core-field-input-size-large-line-height',
    value: TYPOGRAPHY.paragraph_p_1_regular_line_height.cssValue,
  },
]
