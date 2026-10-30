import { EAltCoreRadioButtonGroupDirection } from '~core/ui/radioButtonGroup/models/types'
import { text, empty } from '~shared/tests/slotContents'
import { type IAltCoreRadioButtonGroupExternalProps } from '~core/ui/radioButtonGroup/models/types'
import { EAltSizes } from '~web/shared/types/global'
import type { TPropTestCase } from '~web/shared/types/tests'

export const propSizeTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EAltSizes.SMALL },
]

export const propLabelTextTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]

export const propDirectionTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'direction'>[] = [
  { prop: 'direction', case: EAltCoreRadioButtonGroupDirection.HORIZONTAL, value: EAltCoreRadioButtonGroupDirection.HORIZONTAL, expected: EAltCoreRadioButtonGroupDirection.HORIZONTAL },
  { prop: 'direction', case: EAltCoreRadioButtonGroupDirection.VERTICAL, value: EAltCoreRadioButtonGroupDirection.VERTICAL, expected: EAltCoreRadioButtonGroupDirection.VERTICAL },
  { prop: 'direction', case: 'undefined', value: undefined, expected: EAltCoreRadioButtonGroupDirection.VERTICAL },
]
