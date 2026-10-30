import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreCardWrapperProps } from '../../models/types'

export const propCheckedCases: TPropTestCase<IAltCoreCardWrapperProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true },
  { prop: 'checked', case: 'false', value: false },
]
export const propDisabledCases: TPropTestCase<IAltCoreCardWrapperProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propHoverableCases: TPropTestCase<IAltCoreCardWrapperProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'true', value: true },
  { prop: 'hoverable', case: 'false', value: false },
]
export const propFocusableCases: TPropTestCase<IAltCoreCardWrapperProps, 'focusable'>[] = [
  { prop: 'focusable', case: 'true', value: true },
  { prop: 'focusable', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IAltCoreCardWrapperProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]
