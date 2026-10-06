import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import {
  createVueSimpleRadioButtonProps,
  type IYVueSimpleRadioButtonProps,
} from '~vue/ui/simpleRadioButton/models/types'


const {
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
  error: defaultError,
} = createVueSimpleRadioButtonProps()

export const propSizeTestCases: TPropTestCase<IYVueSimpleRadioButtonProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

export const propDisabledTestCases: TPropTestCase<IYVueSimpleRadioButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

export const propHoveredTestCases: TPropTestCase<IYVueSimpleRadioButtonProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false, ', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

export const propErrorTestCases: TPropTestCase<IYVueSimpleRadioButtonProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: defaultError },
]
