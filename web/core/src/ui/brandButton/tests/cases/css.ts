// cases/css.ts
import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--y-core-simple-button-variant-primary-background-color',
    root: '--y-core-color-other-brand-whatsapp',
  },
  {
    host: '--y-core-simple-button-variant-primary-hover-background-color',
    root: '--y-core-color-other-brand-whatsapp-high',
  },
  {
    host: '--y-core-simple-button-size-medium-gap',
    root: '--y-core-size-spacing-2-x',
  },
  {
    host: '--y-core-simple-button-size-small-gap',
    root: '--y-core-size-spacing-2-x',
  },
  {
    host: '--y-core-simple-button-variant-primary-color',
    root: '--y-core-color-other-contrast',
  },
  {
    host: '--y-core-simple-button-variant-primary-disabled-color',
    root: '--y-core-color-other-contrast',
  },
  {
    host: '--y-core-simple-button-variant-primary-loading-color',
    root: '--y-core-color-other-contrast',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--y-core-simple-button-variant-primary-background-color',
    value: COLORS.other_brand_whatsapp.cssValue,
  },
  {
    host: '--y-core-simple-button-variant-primary-hover-background-color',
    value: COLORS.other_brand_whatsapp_high.cssValue,
  },
  {
    host: '--y-core-simple-button-size-medium-gap',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--y-core-simple-button-size-small-gap',
    value: SIZES.spacing_2_x.cssValue,
  },
  {
    host: '--y-core-simple-button-variant-primary-color',
    value: COLORS.other_contrast.cssValue,
  },
  {
    host: '--y-core-simple-button-variant-primary-disabled-color',
    value: COLORS.other_contrast.cssValue,
  },
  {
    host: '--y-core-simple-button-variant-primary-loading-color',
    value: COLORS.other_contrast.cssValue,
  },
]
