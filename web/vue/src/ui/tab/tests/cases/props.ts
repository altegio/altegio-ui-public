import type { TPropTestCase } from '~shared/types/tests.ts'
import type { IAltVueCoreTabProps, IAltVueTabProps } from '~vue/ui/tab'
import { createVueTabProps } from '~vue/ui/tab/models/types'
import { empty, text, number } from '~shared/tests/slotContents.ts'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types'
import { altRocket } from '~shared/icons'

const defaultProps = createVueTabProps() as IAltVueTabProps

export const propsActiveTestCases: TPropTestCase<IAltVueCoreTabProps, 'active'>[] = [
  { prop: 'active', case: 'true', value: true, expected: true },
  { prop: 'active', case: 'false', value: false, expected: false },
  { prop: 'active', case: 'undefined', value: undefined, expected: defaultProps.active },
]

export const propsDisabledTestCases: TPropTestCase<IAltVueCoreTabProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultProps.disabled },
]

export const propsIsTagVisibleTestCases: TPropTestCase<IAltVueCoreTabProps, 'isTagVisible'>[] = [
  { prop: 'isTagVisible', case: 'true', value: true, expected: true },
  { prop: 'isTagVisible', case: 'false', value: false, expected: false },
  { prop: 'isTagVisible', case: 'undefined', value: undefined, expected: defaultProps.isTagVisible },
]

export const propsTagTextTestCases: TPropTestCase<IAltVueCoreTabProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'text', value: text, expected: text },
  { prop: 'tagText', case: 'empty string', value: empty, expected: empty },
  { prop: 'tagText', case: 'undefined', value: undefined, expected: defaultProps.tagText },
]

export const propsIsCounterVisibleTestCases: TPropTestCase<IAltVueCoreTabProps, 'isCounterVisible'>[] = [
  { prop: 'isCounterVisible', case: 'true', value: true, expected: true },
  { prop: 'isCounterVisible', case: 'false', value: false, expected: false },
  { prop: 'isCounterVisible', case: 'undefined', value: undefined, expected: defaultProps.isCounterVisible },
]

export const propsTextTestCases: TPropTestCase<IAltVueCoreTabProps, 'text'>[] = [
  { prop: 'text', case: 'text', value: text, expected: text },
  { prop: 'text', case: 'empty string', value: empty, expected: empty },
  { prop: 'text', case: 'undefined', value: undefined, expected: defaultProps.text },
]

export const propsCounterValueTestCases: TPropTestCase<IAltVueCoreTabProps, 'counterValue'>[] = [{ prop: 'counterValue', case: 'number', value: number, expected: number }]

export const propsTagVariantTestCases: TPropTestCase<IAltVueCoreTabProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'danger', value: EAltCoreTagVariant.DANGER, expected: EAltCoreTagVariant.DANGER },
  { prop: 'tagVariant', case: 'accent', value: EAltCoreTagVariant.ACCENT, expected: EAltCoreTagVariant.ACCENT },
]

export const propsLeftIconTestCases: TPropTestCase<IAltVueCoreTabProps, 'leftIcon'>[] = [
  { prop: 'leftIcon', case: 'with an icon', value: altRocket, expected: altRocket },
  { prop: 'leftIcon', case: 'without an icon', value: undefined, expected: defaultProps.leftIcon },
]

export const propsLeftIconSizeTestCases: TPropTestCase<IAltVueCoreTabProps, 'leftIconSize'>[] = [
  { prop: 'leftIconSize', case: 'with a size', value: '16px', expected: '16px' },
  { prop: 'leftIconSize', case: 'undefined', value: undefined, expected: defaultProps.leftIconSize },
]

export const propsLocatorTestCases: TPropTestCase<IAltVueCoreTabProps, 'locator'>[] = [
  { prop: 'locator', case: 'text', value: text, expected: text },
  { prop: 'locator', case: 'empty string', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: defaultProps.locator },
]

export const propsLocatorTagTestCases: TPropTestCase<IAltVueCoreTabProps, 'locatorTag'>[] = [
  { prop: 'locatorTag', case: 'text', value: text, expected: text },
  { prop: 'locatorTag', case: 'empty string', value: empty, expected: empty },
  { prop: 'locatorTag', case: 'undefined', value: undefined, expected: defaultProps.locatorTag },
]

export const propsLocatorCounterTestCases: TPropTestCase<IAltVueCoreTabProps, 'locatorCounter'>[] = [
  { prop: 'locatorCounter', case: 'text', value: text, expected: text },
  { prop: 'locatorCounter', case: 'empty string', value: empty, expected: empty },
  { prop: 'locatorCounter', case: 'undefined', value: undefined, expected: defaultProps.locatorCounter },
]
