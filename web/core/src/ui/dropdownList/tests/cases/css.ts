import { SIZES, EFFECTS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-dropdown-list-padding-y', root: '--y-core-size-spacing-x' },
  { host: '--y-core-dropdown-list-shadow', root: '--y-core-effects-pop-up-drop-shadow' },
  { host: '--y-core-dropdown-list-border-radius', root: '--y-core-size-radius-2-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-dropdown-list-padding-y', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-dropdown-list-shadow', value: EFFECTS.pop_up_drop_shadow.cssValue },
  { host: '--y-core-dropdown-list-border-radius', value: SIZES.radius_2_x.cssValue },
]
