import { SIZES, EFFECTS, COLORS, TYPOGRAPHY } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-tip-type-invert-background-color', root: '--alt-core-color-other-invert' },
  { host: '--alt-core-tip-type-invert-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-tip-type-primary-background-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-tip-type-primary-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-tip-type-primary-shadow', root: '--alt-core-effects-card-drop-shadow' },
  { host: '--alt-core-tip-content-padding-x', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-tip-content-padding-y', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-tip-content-border-radius', root: '--alt-core-size-radius-2-x' },
  { host: '--alt-core-tip-text-font-size', root: '--alt-core-typography-annotation-a-2-regular-font-size' },
  { host: '--alt-core-tip-text-line-height', root: '--alt-core-typography-annotation-a-2-regular-line-height' },
  { host: '--alt-core-tip-text-font-weight', root: '--alt-core-typography-annotation-a-2-regular-font-weight' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-tip-type-invert-background-color', value: COLORS.other_invert.cssValue },
  { host: '--alt-core-tip-type-invert-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-tip-type-primary-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-tip-type-primary-color', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-tip-type-primary-shadow', value: EFFECTS.card_drop_shadow.cssValue },
  { host: '--alt-core-tip-content-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-tip-content-padding-y', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-tip-content-border-radius', value: SIZES.radius_2_x.cssValue },
  { host: '--alt-core-tip-text-font-size', value: TYPOGRAPHY.annotation_a_2_regular_font_size.cssValue },
  { host: '--alt-core-tip-text-line-height', value: TYPOGRAPHY.annotation_a_2_regular_line_height.cssValue },
  { host: '--alt-core-tip-text-font-weight', value: TYPOGRAPHY.annotation_a_2_regular_font_weight.cssValue },
]
