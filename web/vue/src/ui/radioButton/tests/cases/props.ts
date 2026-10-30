import { text, empty, number } from '~shared/tests/slotContents'
import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'
import { type IAltVueRadioButtonProps } from '~vue/ui/radioButton/models/types'

export const propRequiredTestCases: TPropTestCase<IAltVueRadioButtonProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: false },
]

export const propSizeTestCases: TPropTestCase<IAltVueRadioButtonProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EAltSizes.SMALL },
]

export const propDisabledTestCases: TPropTestCase<IAltVueRadioButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]

export const propLabelTextTestCases: TPropTestCase<IAltVueRadioButtonProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'text', value: text, expected: text },
  { prop: 'labelText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IAltVueRadioButtonProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]

export const propAnnotationTextTestCases: TPropTestCase<IAltVueRadioButtonProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'text', value: text, expected: text },
  { prop: 'annotationText', case: 'empty string', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelOverflowDebounceTestCases: TPropTestCase<IAltVueRadioButtonProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'text', value: Number(number), expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: 300 },
]

export const propAlignmentTestCases: TPropTestCase<IAltVueRadioButtonProps, 'alignment'>[] = [
  { prop: 'alignment', case: EAltCoreLabelAlignment.TOP, value: EAltCoreLabelAlignment.TOP, expected: EAltCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EAltCoreLabelAlignment.CENTER, value: EAltCoreLabelAlignment.CENTER, expected: EAltCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: EAltCoreLabelAlignment.CENTER },
]

export const propErrorsTestCases: TPropTestCase<IAltVueRadioButtonProps, 'errors'>[] = [
  { prop: 'errors', case: 'array with errors', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'empty array', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: undefined },
]
