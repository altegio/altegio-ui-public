import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import {
  createVueSimpleRadioButtonProps,
  type IAltVueSimpleRadioButtonProps,
} from '~vue/ui/simpleRadioButton/models/types'


const {
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
  error: defaultError,
} = createVueSimpleRadioButtonProps()

export const propSizeTestCases: TPropTestCase<IAltVueSimpleRadioButtonProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

export const propDisabledTestCases: TPropTestCase<IAltVueSimpleRadioButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

export const propHoveredTestCases: TPropTestCase<IAltVueSimpleRadioButtonProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false, ', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

export const propErrorTestCases: TPropTestCase<IAltVueSimpleRadioButtonProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: defaultError },
]
