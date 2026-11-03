import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { altRocket } from '~shared/icons'
import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { createVueCardIconProps, type IAltVueCardIconProps } from '~vue/ui/cardIcon/models/types'

const {
  disabled: defaultDisabled,
  size: defaultSize,
  variant: defaultVariant,
} = createVueCardIconProps()

export const defaultTestProps = { icon: altRocket }

export const propDisabledCases: TPropTestCase<IAltVueCardIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propSizeCases: TPropTestCase<IAltVueCardIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propVariantCases: TPropTestCase<IAltVueCardIconProps, 'variant'>[] = [
  { prop: 'variant', case: 'grey', value: EAltCoreColorIconVariant.GREY, expected: EAltCoreColorIconVariant.GREY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
export const propHeaderIconCases: TPropTestCase<IAltVueCardIconProps, 'icon'>[] = [{ prop: 'icon', case: 'with an icon', value: altRocket }]
