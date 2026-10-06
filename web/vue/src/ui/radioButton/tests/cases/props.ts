import { text, empty, number } from '~shared/tests/slotContents'
import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'
import { type IYVueRadioButtonProps } from '~vue/ui/radioButton/models/types'

export const propRequiredTestCases: TPropTestCase<IYVueRadioButtonProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: false },
]

export const propSizeTestCases: TPropTestCase<IYVueRadioButtonProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EYSizes.SMALL },
]

export const propDisabledTestCases: TPropTestCase<IYVueRadioButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]

export const propLabelTextTestCases: TPropTestCase<IYVueRadioButtonProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYVueRadioButtonProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]

export const propAnnotationTextTestCases: TPropTestCase<IYVueRadioButtonProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'текст', value: text, expected: text },
  { prop: 'annotationText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelOverflowDebounceTestCases: TPropTestCase<IYVueRadioButtonProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'текст', value: Number(number), expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: 300 },
]

export const propAlignmentTestCases: TPropTestCase<IYVueRadioButtonProps, 'alignment'>[] = [
  { prop: 'alignment', case: EYCoreLabelAlignment.TOP, value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EYCoreLabelAlignment.CENTER, value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: EYCoreLabelAlignment.CENTER },
]

export const propErrorsTestCases: TPropTestCase<IYVueRadioButtonProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: undefined },
]
