import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreFieldIconProps } from '~core/ui/fieldIcon/models/types'
import { EAltSizes } from '~shared/types/global'
import { altMagic } from '~shared/icons'

export const propDisabledCases: TPropTestCase<IAltCoreFieldIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: true },
  { prop: 'disabled', case: 'disabled', value: false },
]

export const propHoverableCases: TPropTestCase<IAltCoreFieldIconProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'enabled', value: true },
  { prop: 'hoverable', case: 'disabled', value: false },
]

export const propClickableCases: TPropTestCase<IAltCoreFieldIconProps, 'clickable'>[] = [
  { prop: 'clickable', case: 'enabled', value: true },
  { prop: 'clickable', case: 'disabled', value: false },
]

export const propSizeCases: TPropTestCase<IAltCoreFieldIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]

export const propIconCases: TPropTestCase<IAltCoreFieldIconProps, 'icon'>[] = [{ prop: 'icon', case: 'with an icon', value: altMagic }]
