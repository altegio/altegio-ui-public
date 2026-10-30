// cases/css.ts
import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--alt-core-simple-button-variant-primary-background-color',
    root: '--alt-core-color-other-brand-whatsapp',
  },
  {
    host: '--alt-core-simple-button-variant-primary-hover-background-color',
    root: '--alt-core-color-other-brand-whatsapp-high',
  },
  {
    host: '--alt-core-simple-button-size-medium-gap',
    root: '--alt-core-size-spacing-2-x',
  },
  {
    host: '--alt-core-simple-button-size-small-gap',
    root: '--alt-core-size-spacing-2-x',
  },
  {
    host: '--alt-core-simple-button-variant-primary-color',
    root: '--alt-core-color-other-contrast',
  },
  {
    host: '--alt-core-simple-button-variant-primary-disabled-color',
    root: '--alt-core-color-other-contrast',
  },
  {
    host: '--alt-core-simple-button-variant-primary-loading-color',
    root: '--alt-core-color-other-contrast',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--alt-core-simple-button-variant-primary-background-color',
    value: COLORS.other_brand_whatsapp.cssValue,
  },
  {
    host: '--alt-core-simple-button-variant-primary-hover-background-color',
    value: COLORS.other_brand_whatsapp_high.cssValue,
  },
  {
    host: '--alt-core-simple-button-size-medium-gap',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--alt-core-simple-button-size-small-gap',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--alt-core-simple-button-variant-primary-color',
    value: COLORS.other_contrast.cssValue,
  },
  {
    host: '--alt-core-simple-button-variant-primary-disabled-color',
    value: COLORS.other_contrast.cssValue,
  },
  {
    host: '--alt-core-simple-button-variant-primary-loading-color',
    value: COLORS.other_contrast.cssValue,
  },
]
