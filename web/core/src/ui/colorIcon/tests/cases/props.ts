import type { TPropTestCase } from '~shared/types/tests'

import { yRocket } from '~shared/icons'
import { EYCoreColorIconSize, EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { createCoreColorIconProps, type IYCoreColorIconProps } from '~core/ui/colorIcon/models/types'

const {
  size: defaultSize,
  variant: defaultVariant,
  disabled: defaultDisabled,
} = createCoreColorIconProps()

export const requiredTestProps = { icon: yRocket }

export const propSizeCases: TPropTestCase<IYCoreColorIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYCoreColorIconSize.X_40, expected: EYCoreColorIconSize.X_40 },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propVariantCases: TPropTestCase<IYCoreColorIconProps, 'variant'>[] = [
  { prop: 'variant', case: 'grey', value: EYCoreColorIconVariant.GREY, expected: EYCoreColorIconVariant.GREY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
export const propDisabledCases: TPropTestCase<IYCoreColorIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
