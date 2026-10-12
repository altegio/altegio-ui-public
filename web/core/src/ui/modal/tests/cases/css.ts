import { SIZES, COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-modal-padding', root: '--y-core-modal-custom-padding, var(--y-core-size-spacing-5-x)' },
  { host: '--y-core-modal-overlay-color', root: '--y-core-color-other-overlay-60' },
  { host: '--y-core-modal-variant-primary-background-color', root: '--y-core-color-surface-primary' },
  { host: '--y-core-modal-variant-secondary-background-color', root: '--y-core-color-other-base' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-modal-padding', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-modal-overlay-color', value: COLORS.other_overlay_60.cssValue },
  { host: '--y-core-modal-variant-primary-background-color', value: COLORS.surface_primary.cssValue },
  { host: '--y-core-modal-variant-secondary-background-color', value: COLORS.other_base.cssValue },
]
