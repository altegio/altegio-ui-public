import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { yRocket } from '~shared/icons'
import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { createNgCardIconProps, type IYNgCardIconProps } from '~ng/ui/cardIcon/models/types'

const {
  disabled: defaultDisabled,
  size: defaultSize,
  variant: defaultVariant,
} = createNgCardIconProps()

export const propDisabledCases: TPropTestCase<IYNgCardIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propSizeCases: TPropTestCase<IYNgCardIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propVariantCases: TPropTestCase<IYNgCardIconProps, 'variant'>[] = [
  { prop: 'variant', case: 'grey', value: EYCoreColorIconVariant.GREY, expected: EYCoreColorIconVariant.GREY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
export const propHeaderIconCases: TPropTestCase<IYNgCardIconProps, 'icon'>[] = [{ prop: 'icon', case: 'с иконкой', value: yRocket }]
