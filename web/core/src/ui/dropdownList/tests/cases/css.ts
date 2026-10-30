import { SIZES, EFFECTS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-dropdown-list-padding-y', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-dropdown-list-shadow', root: '--alt-core-effects-pop-up-drop-shadow' },
  { host: '--alt-core-dropdown-list-border-radius', root: '--alt-core-size-radius-2-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-dropdown-list-padding-y', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-dropdown-list-shadow', value: EFFECTS.pop_up_drop_shadow.cssValue },
  { host: '--alt-core-dropdown-list-border-radius', value: SIZES.radius_2_x.cssValue },
]
