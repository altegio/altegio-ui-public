import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreCardIconProps } from '~core/ui/cardIcon/models/types'
import { EAltCoreColorIconSize, EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { altRocket } from '~shared/icons'

export const propDisabledCases: TPropTestCase<IAltCoreCardIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IAltCoreCardIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]

export const propSizeColorIconConverterTestCases: TPropTestCase<IAltCoreCardIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltCoreColorIconSize.X_32 },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM, expected: EAltCoreColorIconSize.X_48 },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: EAltCoreColorIconSize.X_64 },
]


export const propVariantCases: TPropTestCase<IAltCoreCardIconProps, 'variant'>[] = [
  { prop: 'variant', case: 'grey', value: EAltCoreColorIconVariant.GREY },
  { prop: 'variant', case: 'red', value: EAltCoreColorIconVariant.RED },
  { prop: 'variant', case: 'green', value: EAltCoreColorIconVariant.GREEN },
  { prop: 'variant', case: 'yellowish', value: EAltCoreColorIconVariant.YELLOWISH },
  { prop: 'variant', case: 'blue', value: EAltCoreColorIconVariant.BLUE },
  { prop: 'variant', case: 'violet', value: EAltCoreColorIconVariant.VIOLET },
]
export const propHeaderIconCases: TPropTestCase<IAltCoreCardIconProps, 'icon'>[] = [{ prop: 'icon', case: 'with an icon', value: altRocket }]
