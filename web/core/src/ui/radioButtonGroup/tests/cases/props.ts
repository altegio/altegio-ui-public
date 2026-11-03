import { EAltCoreRadioButtonGroupDirection } from './../../models/types/external'
import { text, empty } from '~shared/tests/slotContents'
import { type IAltCoreRadioButtonGroupExternalProps } from '../../models/types'
import { EAltSizes } from '~web/shared/types/global'
import type { TPropTestCase } from '~web/shared/types/tests'

import '~core/ui/radioButton'

export const propSizeTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: undefined },
]

export const propValueTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'value'>[] = [
  { prop: 'value', case: 'radio 1', value: '1', expected: '1' },
  { prop: 'value', case: 'radio 2', value: '2', expected: '2' },
  { prop: 'value', case: 'radio 3', value: '3', expected: '3' },
]

export const propLabelTextTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: undefined },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: undefined },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: undefined },
]

export const propDirectionTestCases: TPropTestCase<IAltCoreRadioButtonGroupExternalProps, 'direction'>[] = [
  { prop: 'direction', case: EAltCoreRadioButtonGroupDirection.HORIZONTAL, value: EAltCoreRadioButtonGroupDirection.HORIZONTAL, expected: EAltCoreRadioButtonGroupDirection.HORIZONTAL },
  { prop: 'direction', case: EAltCoreRadioButtonGroupDirection.VERTICAL, value: EAltCoreRadioButtonGroupDirection.VERTICAL, expected: EAltCoreRadioButtonGroupDirection.VERTICAL },
  { prop: 'direction', case: 'undefined', value: undefined, expected: undefined },
]
