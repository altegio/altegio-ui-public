import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreCardIconProps } from '~core/ui/cardIcon/models/types'
import { EYCoreColorIconSize, EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { yRocket } from '~shared/icons'

export const propDisabledCases: TPropTestCase<IYCoreCardIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IYCoreCardIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]

export const propSizeColorIconConverterTestCases: TPropTestCase<IYCoreCardIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYCoreColorIconSize.X_32 },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM, expected: EYCoreColorIconSize.X_48 },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: EYCoreColorIconSize.X_64 },
]


export const propVariantCases: TPropTestCase<IYCoreCardIconProps, 'variant'>[] = [
  { prop: 'variant', case: 'grey', value: EYCoreColorIconVariant.GREY },
  { prop: 'variant', case: 'red', value: EYCoreColorIconVariant.RED },
  { prop: 'variant', case: 'green', value: EYCoreColorIconVariant.GREEN },
  { prop: 'variant', case: 'yellowish', value: EYCoreColorIconVariant.YELLOWISH },
  { prop: 'variant', case: 'blue', value: EYCoreColorIconVariant.BLUE },
  { prop: 'variant', case: 'violet', value: EYCoreColorIconVariant.VIOLET },
]
export const propHeaderIconCases: TPropTestCase<IYCoreCardIconProps, 'icon'>[] = [{ prop: 'icon', case: 'с иконкой', value: yRocket }]
