import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreFieldIconProps } from '~core/ui/fieldIcon/models/types'
import { EYSizes } from '~shared/types/global'
import { yMagic } from '~shared/icons'

export const propDisabledCases: TPropTestCase<IYCoreFieldIconProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'включен', value: true },
  { prop: 'disabled', case: 'выключен', value: false },
]

export const propHoverableCases: TPropTestCase<IYCoreFieldIconProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'включен', value: true },
  { prop: 'hoverable', case: 'выключен', value: false },
]

export const propClickableCases: TPropTestCase<IYCoreFieldIconProps, 'clickable'>[] = [
  { prop: 'clickable', case: 'включен', value: true },
  { prop: 'clickable', case: 'выключен', value: false },
]

export const propSizeCases: TPropTestCase<IYCoreFieldIconProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]

export const propIconCases: TPropTestCase<IYCoreFieldIconProps, 'icon'>[] = [{ prop: 'icon', case: 'с иконкой', value: yMagic }]
