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
  { prop: 'disabled', case: 'содержать', value: true, expected: true },
  { prop: 'disabled', case: 'отсутствовать', value: false, expected: false },
]

export const propAlignmentTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'alignment'>[] = [
  { prop: 'alignment', case: EYCoreLabelAlignment.TOP, value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EYCoreLabelAlignment.CENTER, value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: undefined },
]

export const propLabelTextTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelText', case: 'без контента', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: undefined },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'без контента', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: undefined },
]

export const propRequiredTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
]

export const propAnnotationTextTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'с контентом', value: text, expected: text },
  { prop: 'annotationText', case: 'без контента', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

export const propLabelOverflowDebounceTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'с контентом', value: number, expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: undefined },
]

export const propErrorsTestCases: TPropTestCase<IYCoreRadioButtonExternalProps, 'errors'>[] = [
  { prop: 'errors', case: 'с массивом ошибок', value: ['ошибка'], expected: true },
  { prop: 'errors', case: 'с пустым массивом', value: [], expected: false },
  { prop: 'errors', case: 'undefined', value: undefined, expected: false },
]
