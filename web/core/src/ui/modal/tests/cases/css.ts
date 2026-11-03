import { SIZES, COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-modal-padding', root: '--alt-core-modal-custom-padding, var(--alt-core-size-spacing-5-x)' },
  { host: '--alt-core-modal-overlay-color', root: '--alt-core-color-other-overlay-60' },
  { host: '--alt-core-modal-variant-primary-background-color', root: '--alt-core-color-surface-primary' },
  { host: '--alt-core-modal-variant-secondary-background-color', root: '--alt-core-color-other-base' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-modal-padding', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-modal-overlay-color', value: COLORS.other_overlay_60.cssValue },
  { host: '--alt-core-modal-variant-primary-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--alt-core-modal-variant-secondary-background-color', value: COLORS.other_base.cssValue },
]
