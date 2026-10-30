import { text, empty, number } from '~shared/tests/slotContents'
import { type IAltCoreRadioButtonExternalProps } from '../../models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'


export const propSizeTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: undefined },
]

export const propCheckedTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
]

export const propDisabledTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'have', value: true, expected: true },
  { prop: 'disabled', case: 'not have', value: false, expected: false },
]

export const propAlignmentTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'alignment'>[] = [
  { prop: 'alignment', case: EAltCoreLabelAlignment.TOP, value: EAltCoreLabelAlignment.TOP, expected: EAltCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EAltCoreLabelAlignment.CENTER, value: EAltCoreLabelAlignment.CENTER, expected: EAltCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: undefined },
]

export const propLabelTextTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: undefined },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: undefined },
]

export const propRequiredTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
]

export const propAnnotationTextTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with content', value: text, expected: text },
  { prop: 'annotationText', case: 'without content', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelOverflowDebounceTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'with content', value: number, expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: undefined },
]

export const propErrorsTestCases: TPropTestCase<IAltCoreRadioButtonExternalProps, 'errors'>[] = [
  { prop: 'errors', case: 'with an array of errors', value: ['error'], expected: true },
  { prop: 'errors', case: 'with an empty array', value: [], expected: false },
  { prop: 'errors', case: 'undefined', value: undefined, expected: false },
]
