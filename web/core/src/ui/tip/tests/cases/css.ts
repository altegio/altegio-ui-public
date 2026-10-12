import { SIZES, EFFECTS, COLORS, TYPOGRAPHY } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-tip-type-invert-background-color', root: '--y-core-color-other-invert' },
  { host: '--y-core-tip-type-invert-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-tip-type-primary-background-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-tip-type-primary-color', root: '--y-core-color-text-primary' },
  { host: '--y-core-tip-type-primary-shadow', root: '--y-core-effects-card-drop-shadow' },
  { host: '--y-core-tip-content-padding-x', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-tip-content-padding-y', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-tip-content-border-radius', root: '--y-core-size-radius-2-x' },
  { host: '--y-core-tip-text-font-size', root: '--y-core-typography-annotation-a-2-regular-font-size' },
  { host: '--y-core-tip-text-line-height', root: '--y-core-typography-annotation-a-2-regular-line-height' },
  { host: '--y-core-tip-text-font-weight', root: '--y-core-typography-annotation-a-2-regular-font-weight' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-tip-type-invert-background-color', value: COLORS.other_invert.cssValue },
  { host: '--y-core-tip-type-invert-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-tip-type-primary-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-tip-type-primary-color', value: COLORS.text_primary.cssValue },
  { host: '--y-core-tip-type-primary-shadow', value: EFFECTS.card_drop_shadow.cssValue },
  { host: '--y-core-tip-content-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-tip-content-padding-y', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-tip-content-border-radius', value: SIZES.radius_2_x.cssValue },
  { host: '--y-core-tip-text-font-size', value: TYPOGRAPHY.annotation_a_2_regular_font_size.cssValue },
  { host: '--y-core-tip-text-line-height', value: TYPOGRAPHY.annotation_a_2_regular_line_height.cssValue },
  { host: '--y-core-tip-text-font-weight', value: TYPOGRAPHY.annotation_a_2_regular_font_weight.cssValue },
]
