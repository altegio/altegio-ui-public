import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { yRocket } from '~shared/icons'
import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { createVueCardIconProps, type IYVueCardIconProps } from '~vue/ui/cardIcon/models/types'

const {
  disabled: defaultDisabled,
  size: defaultSize,
  variant: defaultVariant,
} = createVueCardIconProps()

export const defaultTestProps = { icon: yRocket }

export const propDisabledCases: TPropTestCase<IYVueCardIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propSizeCases: TPropTestCase<IYVueCardIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propVariantCases: TPropTestCase<IYVueCardIconProps, 'variant'>[] = [
  { prop: 'variant', case: 'grey', value: EYCoreColorIconVariant.GREY, expected: EYCoreColorIconVariant.GREY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
export const propHeaderIconCases: TPropTestCase<IYVueCardIconProps, 'icon'>[] = [{ prop: 'icon', case: 'с иконкой', value: yRocket }]
