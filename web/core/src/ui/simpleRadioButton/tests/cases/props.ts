import { EAltSizes } from '~shared/types/global'
import { type TPropTestCase } from '~shared/types/tests'

import {
  type IAltCoreSimpleRadioButtonProps,
} from '~core/ui/simpleRadioButton/models/types'
import '~core/ui/simpleRadioButton'

const booleans = [
  true,
  false,
]

const sizes: NonNullable<IAltCoreSimpleRadioButtonProps['size']>[] = [EAltSizes.SMALL, EAltSizes.MEDIUM]

export const propSizeTestCases: TPropTestCase<IAltCoreSimpleRadioButtonProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  value: size,
  case: size,
}))

export const propCheckedTestCases: TPropTestCase<IAltCoreSimpleRadioButtonProps, 'checked'>[] = booleans.map((checked) => ({
  prop: 'checked',
  value: checked,
  case: 'checked',
  expected: checked,
}))

export const propErrorTestCases: TPropTestCase<IAltCoreSimpleRadioButtonProps, 'error'>[] = booleans.map((error) => ({
  prop: 'error',
  value: error,
  case: 'error',
  expected: error,
}))

export const propDisabledTestCases: TPropTestCase<IAltCoreSimpleRadioButtonProps, 'disabled'>[] = booleans.map((disabled) => ({
  prop: 'disabled',
  value: disabled,
  case: 'disabled',
  expected: disabled,
}))

export const propHoveredTestCases: TPropTestCase<IAltCoreSimpleRadioButtonProps, 'hovered'>[] = booleans.map((hovered) => ({
  prop: 'hovered',
  value: hovered,
  case: 'hovered',
  expected: hovered,
}))
