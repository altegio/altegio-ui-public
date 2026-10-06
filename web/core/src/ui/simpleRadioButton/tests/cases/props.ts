import { EYSizes } from '~shared/types/global'
import { type TPropTestCase } from '~shared/types/tests'

import {
  type IYCoreSimpleRadioButtonProps,
} from '~core/ui/simpleRadioButton/models/types'
import '~core/ui/simpleRadioButton'

const booleans = [
  true,
  false,
]

const sizes: NonNullable<IYCoreSimpleRadioButtonProps['size']>[] = [EYSizes.SMALL, EYSizes.MEDIUM]

export const propSizeTestCases: TPropTestCase<IYCoreSimpleRadioButtonProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  value: size,
  case: size,
}))

export const propCheckedTestCases: TPropTestCase<IYCoreSimpleRadioButtonProps, 'checked'>[] = booleans.map((checked) => ({
  prop: 'checked',
  value: checked,
  case: 'checked',
  expected: checked,
}))

export const propErrorTestCases: TPropTestCase<IYCoreSimpleRadioButtonProps, 'error'>[] = booleans.map((error) => ({
  prop: 'error',
  value: error,
  case: 'error',
  expected: error,
}))

export const propDisabledTestCases: TPropTestCase<IYCoreSimpleRadioButtonProps, 'disabled'>[] = booleans.map((disabled) => ({
  prop: 'disabled',
  value: disabled,
  case: 'disabled',
  expected: disabled,
}))

export const propHoveredTestCases: TPropTestCase<IYCoreSimpleRadioButtonProps, 'hovered'>[] = booleans.map((hovered) => ({
  prop: 'hovered',
  value: hovered,
  case: 'hovered',
  expected: hovered,
}))
