import { EYCoreRadioButtonGroupDirection } from './../../models/types/external'
import { text, empty } from '~shared/tests/slotContents'
import { type IYCoreRadioButtonGroupExternalProps } from '../../models/types'
import { EYSizes } from '~web/shared/types/global'
import type { TPropTestCase } from '~web/shared/types/tests'

import '~core/ui/radioButton'

export const propSizeTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: undefined },
]

export const propValueTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'value'>[] = [
  { prop: 'value', case: 'radio 1', value: '1', expected: '1' },
  { prop: 'value', case: 'radio 2', value: '2', expected: '2' },
  { prop: 'value', case: 'radio 3', value: '3', expected: '3' },
]

export const propLabelTextTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelText', case: 'без контента', value: empty, expected: undefined },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: undefined },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'без контента', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: undefined },
]

export const propDirectionTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'direction'>[] = [
  { prop: 'direction', case: EYCoreRadioButtonGroupDirection.HORIZONTAL, value: EYCoreRadioButtonGroupDirection.HORIZONTAL, expected: EYCoreRadioButtonGroupDirection.HORIZONTAL },
  { prop: 'direction', case: EYCoreRadioButtonGroupDirection.VERTICAL, value: EYCoreRadioButtonGroupDirection.VERTICAL, expected: EYCoreRadioButtonGroupDirection.VERTICAL },
  { prop: 'direction', case: 'undefined', value: undefined, expected: undefined },
]
