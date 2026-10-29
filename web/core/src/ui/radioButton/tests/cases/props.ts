import { text, empty, number } from '~shared/tests/slotContents'
import { type IYCoreRadioButtonExternalProps } from '../../models/types'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

import { EYCoreLabelAlignment } from '~core/ui/label/models/types'


export const propSizeTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: undefined },
]

export const propCheckedTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
]

export const propDisabledTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'have', value: true, expected: true },
  { prop: 'disabled', case: 'not have', value: false, expected: false },
]

export const propAlignmentTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'alignment'>[] = [
  { prop: 'alignment', case: EYCoreLabelAlignment.TOP, value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EYCoreLabelAlignment.CENTER, value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: undefined },
]

export const propLabelTextTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: undefined },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: undefined },
]

export const propRequiredTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
]

export const propAnnotationTextTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with content', value: text, expected: text },
  { prop: 'annotationText', case: 'without content', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelOverflowDebounceTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'with content', value: number, expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: undefined },
]

export const propErrorsTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'errors'>[] = [
  { prop: 'errors', case: 'with an array of errors', value: ['error'], expected: true },
  { prop: 'errors', case: 'with an empty array', value: [], expected: false },
  { prop: 'errors', case: 'undefined', value: undefined, expected: false },
]
