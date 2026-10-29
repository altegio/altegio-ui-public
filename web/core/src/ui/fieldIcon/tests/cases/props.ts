import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreFieldIconProps } from '~core/ui/fieldIcon/models/types'
import { EYSizes } from '~shared/types/global'
import { yMagic } from '~shared/icons'

export const propDisabledCases: TPropTestCase<IYCoreFieldIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: true },
  { prop: 'disabled', case: 'disabled', value: false },
]

export const propHoverableCases: TPropTestCase<IYCoreFieldIconProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'enabled', value: true },
  { prop: 'hoverable', case: 'disabled', value: false },
]

export const propClickableCases: TPropTestCase<IYCoreFieldIconProps, 'clickable'>[] = [
  { prop: 'clickable', case: 'enabled', value: true },
  { prop: 'clickable', case: 'disabled', value: false },
]

export const propSizeCases: TPropTestCase<IYCoreFieldIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]

export const propIconCases: TPropTestCase<IYCoreFieldIconProps, 'icon'>[] = [{ prop: 'icon', case: 'with an icon', value: yMagic }]
