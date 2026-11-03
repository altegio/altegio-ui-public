import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-breadcrumbs-item-gap', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-breadcrumbs-item-link-color', root: '--alt-core-color-other-link' },
  { host: '--alt-core-breadcrumbs-item-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-breadcrumbs-item-separator-color', root: '--alt-core-color-icon-secondary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-breadcrumbs-item-gap', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-breadcrumbs-item-link-color', value: COLORS.other_link.cssValue },
  { host: '--alt-core-breadcrumbs-item-color', value: COLORS.text_primary.cssValue },
]
