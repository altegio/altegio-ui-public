import type { TPropTestCase } from '~shared/types/tests'
import { createNgSimpleRadioButtonProps, type IYNgSimpleRadioButtonProps } from '~ng/ui/simpleRadioButton/models/types'
import { EYSizes } from '~shared/types/global'

const {
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
  error: defaultError,
} = createNgSimpleRadioButtonProps()


export const propSizeTestCases: TPropTestCase<IYNgSimpleRadioButtonProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

export const propDisabledTestCases: TPropTestCase<IYNgSimpleRadioButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

export const propHoveredTestCases: TPropTestCase<IYNgSimpleRadioButtonProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false, ', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

export const propErrorTestCases: TPropTestCase<IYNgSimpleRadioButtonProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: defaultError },
]
