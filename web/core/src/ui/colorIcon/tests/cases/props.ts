import type { TPropTestCase } from '~shared/types/tests'

import { altRocket } from '~shared/icons'
import { EAltCoreColorIconSize, EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { createCoreColorIconProps, type IAltCoreColorIconProps } from '~core/ui/colorIcon/models/types'

const {
  size: defaultSize,
  variant: defaultVariant,
  disabled: defaultDisabled,
} = createCoreColorIconProps()

export const requiredTestProps = { icon: altRocket }

export const propSizeCases: TPropTestCase<IAltCoreColorIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltCoreColorIconSize.X_40, expected: EAltCoreColorIconSize.X_40 },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propVariantCases: TPropTestCase<IAltCoreColorIconProps, 'variant'>[] = [
  { prop: 'variant', case: 'grey', value: EAltCoreColorIconVariant.GREY, expected: EAltCoreColorIconVariant.GREY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
export const propDisabledCases: TPropTestCase<IAltCoreColorIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
