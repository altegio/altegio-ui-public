import type { IAltCoreTabProps } from '~core/ui/tab/models/types'
import {
  createCoreTabProps,
} from '~core/ui/tab/models/types'
import type { TPropTestCase } from '~shared/types/tests.ts'
import { empty, number, text } from '~shared/tests/slotContents.ts'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types'
import { altRocket } from '~shared/icons'

const defaultProps = createCoreTabProps()

export const propsActiveTestCases: TPropTestCase<IAltCoreTabProps, 'active'>[] = [
  { prop: 'active', case: 'true', value: true, expected: true },
  { prop: 'active', case: 'false', value: false, expected: false },
  { prop: 'active', case: 'undefined', value: undefined, expected: defaultProps.active },
]

export const propsDisabledTestCases: TPropTestCase<IAltCoreTabProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultProps.disabled },
]

export const propsIsTagVisibleTestCases: TPropTestCase<IAltCoreTabProps, 'isTagVisible'>[] = [
  { prop: 'isTagVisible', case: 'true', value: true, expected: true },
  { prop: 'isTagVisible', case: 'false', value: false, expected: false },
  { prop: 'isTagVisible', case: 'undefined', value: undefined, expected: defaultProps.isTagVisible },
]

export const propsTagTextTestCases: TPropTestCase<IAltCoreTabProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'text', value: text, expected: text },
  { prop: 'tagText', case: 'empty string', value: empty, expected: empty },
  { prop: 'tagText', case: 'undefined', value: undefined, expected: defaultProps.tagText },
]

export const propsIsCounterVisibleTestCases: TPropTestCase<IAltCoreTabProps, 'isCounterVisible'>[] = [
  { prop: 'isCounterVisible', case: 'true', value: true, expected: true },
  { prop: 'isCounterVisible', case: 'false', value: false, expected: false },
  { prop: 'isCounterVisible', case: 'undefined', value: undefined, expected: defaultProps.isCounterVisible },
]

export const propsTextTestCases: TPropTestCase<IAltCoreTabProps, 'text'>[] = [
  { prop: 'text', case: 'text', value: text, expected: text },
  { prop: 'text', case: 'empty string', value: empty, expected: empty },
  { prop: 'text', case: 'undefined', value: undefined, expected: defaultProps.text },
]

export const propsCounterValueTestCases: TPropTestCase<IAltCoreTabProps, 'counterValue'>[] = [{ prop: 'counterValue', case: 'number', value: number, expected: number }]

export const propsTagVariantTestCases: TPropTestCase<IAltCoreTabProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'danger', value: EAltCoreTagVariant.DANGER, expected: EAltCoreTagVariant.DANGER },
  { prop: 'tagVariant', case: 'accent', value: EAltCoreTagVariant.ACCENT, expected: EAltCoreTagVariant.ACCENT },
]

export const propsLeftIconTestCases: TPropTestCase<IAltCoreTabProps, 'leftIcon'>[] = [
  { prop: 'leftIcon', case: 'with an icon', value: altRocket },
  { prop: 'leftIcon', case: 'without an icon', value: defaultProps.leftIcon },
]

export const propsLeftIconSizeTestCases: TPropTestCase<IAltCoreTabProps, 'leftIconSize'>[] = [
  { prop: 'leftIconSize', case: 'with a size', value: '16px', expected: '16px' },
  { prop: 'leftIconSize', case: 'undefined', value: undefined, expected: defaultProps.leftIconSize },
]

export const propsLocatorTestCases: TPropTestCase<IAltCoreTabProps, 'locator'>[] = [
  { prop: 'locator', case: 'text', value: text, expected: text },
  { prop: 'locator', case: 'empty string', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: defaultProps.locator },
]

export const propsLocatorTagTestCases: TPropTestCase<IAltCoreTabProps, 'locatorTag'>[] = [
  { prop: 'locatorTag', case: 'text', value: text, expected: text },
  { prop: 'locatorTag', case: 'empty string', value: empty, expected: empty },
  { prop: 'locatorTag', case: 'undefined', value: undefined, expected: defaultProps.locatorTag },
]

export const propsLocatorCounterTestCases: TPropTestCase<IAltCoreTabProps, 'locatorCounter'>[] = [
  { prop: 'locatorCounter', case: 'text', value: text, expected: text },
  { prop: 'locatorCounter', case: 'empty string', value: empty, expected: empty },
  { prop: 'locatorCounter', case: 'undefined', value: undefined, expected: defaultProps.locatorCounter },
]
