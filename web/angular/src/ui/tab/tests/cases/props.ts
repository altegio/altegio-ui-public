import type { TPropTestCase } from '~shared/types/tests.ts'
import { createNgTabProps, type IYNgTabProps } from '~ng/ui/tab/models/types'
import { empty, number, text } from '~shared/tests/slotContents.ts'
import { EYCoreTagVariant } from '~core/ui/tag/models/types'
import { yRocket } from '~shared/icons'

const defaultProps = createNgTabProps()

export const propsActiveTestCases: TPropTestCase<IYNgTabProps, 'active'>[] = [
  { prop: 'active', case: 'true', value: true, expected: true },
  { prop: 'active', case: 'false', value: false, expected: false },
  { prop: 'active', case: 'undefined', value: undefined, expected: defaultProps.active },
]

export const propsDisabledTestCases: TPropTestCase<IYNgTabProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultProps.disabled },
]

export const propsIsTagVisibleTestCases: TPropTestCase<IYNgTabProps, 'isTagVisible'>[] = [
  { prop: 'isTagVisible', case: 'true', value: true, expected: true },
  { prop: 'isTagVisible', case: 'false', value: false, expected: false },
  { prop: 'isTagVisible', case: 'undefined', value: undefined, expected: defaultProps.isTagVisible },
]

export const propsTagTextTestCases: TPropTestCase<IYNgTabProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'текст', value: text, expected: text },
  { prop: 'tagText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'tagText', case: 'undefined', value: undefined, expected: defaultProps.tagText },
]

export const propsIsCounterVisibleTestCases: TPropTestCase<IYNgTabProps, 'isCounterVisible'>[] = [
  { prop: 'isCounterVisible', case: 'true', value: true, expected: true },
  { prop: 'isCounterVisible', case: 'false', value: false, expected: false },
  { prop: 'isCounterVisible', case: 'undefined', value: undefined, expected: defaultProps.isCounterVisible },
]

export const propsTextTestCases: TPropTestCase<IYNgTabProps, 'text'>[] = [
  { prop: 'text', case: 'текст', value: text, expected: text },
  { prop: 'text', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'text', case: 'undefined', value: undefined, expected: defaultProps.text },
]

export const propsCounterValueTestCases: TPropTestCase<IYNgTabProps, 'counterValue'>[] = [{ prop: 'counterValue', case: 'число', value: number, expected: number }]

export const propsTagVariantTestCases: TPropTestCase<IYNgTabProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'danger', value: EYCoreTagVariant.DANGER, expected: EYCoreTagVariant.DANGER },
  { prop: 'tagVariant', case: 'accent', value: EYCoreTagVariant.ACCENT, expected: EYCoreTagVariant.ACCENT },
]

export const propsLeftIconTestCases: TPropTestCase<IYNgTabProps, 'leftIcon'>[] = [
  { prop: 'leftIcon', case: 'с иконкой', value: yRocket, expected: yRocket },
  { prop: 'leftIcon', case: 'без иконки', value: undefined, expected: defaultProps.leftIcon },
]

export const propsLeftIconSizeTestCases: TPropTestCase<IYNgTabProps, 'leftIconSize'>[] = [
  { prop: 'leftIconSize', case: 'с размером', value: '16px', expected: '16px' },
  { prop: 'leftIconSize', case: 'undefined', value: undefined, expected: defaultProps.leftIconSize },
]

export const propsLocatorTestCases: TPropTestCase<IYNgTabProps, 'locator'>[] = [
  { prop: 'locator', case: 'текст', value: text, expected: text },
  { prop: 'locator', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: defaultProps.locator },
]

export const propsLocatorTagTestCases: TPropTestCase<IYNgTabProps, 'locatorTag'>[] = [
  { prop: 'locatorTag', case: 'текст', value: text, expected: text },
  { prop: 'locatorTag', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'locatorTag', case: 'undefined', value: undefined, expected: defaultProps.locatorTag },
]

export const propsLocatorCounterTestCases: TPropTestCase<IYNgTabProps, 'locatorCounter'>[] = [
  { prop: 'locatorCounter', case: 'текст', value: text, expected: text },
  { prop: 'locatorCounter', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'locatorCounter', case: 'undefined', value: undefined, expected: defaultProps.locatorCounter },
]
