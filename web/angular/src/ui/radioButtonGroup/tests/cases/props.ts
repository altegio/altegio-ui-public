import { EYCoreRadioButtonGroupDirection } from '~core/ui/radioButtonGroup/models/types'
import { text, empty } from '~shared/tests/slotContents'
import { type IYCoreRadioButtonGroupExternalProps } from '~core/ui/radioButtonGroup/models/types'
import { EYSizes } from '~web/shared/types/global'
import type { TPropTestCase } from '~web/shared/types/tests'

export const propSizeTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EYSizes.SMALL },
]

export const propLabelTextTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelText', case: 'без контента', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'без контента', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]

export const propDirectionTestCases: TPropTestCase<IYCoreRadioButtonGroupExternalProps, 'direction'>[] = [
  { prop: 'direction', case: EYCoreRadioButtonGroupDirection.HORIZONTAL, value: EYCoreRadioButtonGroupDirection.HORIZONTAL, expected: EYCoreRadioButtonGroupDirection.HORIZONTAL },
  { prop: 'direction', case: EYCoreRadioButtonGroupDirection.VERTICAL, value: EYCoreRadioButtonGroupDirection.VERTICAL, expected: EYCoreRadioButtonGroupDirection.VERTICAL },
  { prop: 'direction', case: 'undefined', value: undefined, expected: EYCoreRadioButtonGroupDirection.VERTICAL },
]
