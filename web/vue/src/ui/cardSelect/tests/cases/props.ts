import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types'
import { altRocket } from '~shared/icons'
import { text } from '~shared/tests/slotContents'
import { createVueCardSelectProps, type IAltVueCardSelectProps } from '~vue/ui/cardSelect/models/types'

const {
  checked: defaultChecked,
  disabled: defaultDisabled,
  hoverable: defaultHoverable,
  focusable: defaultFocusable,
  size: defaultSize,
  headerText: defaultHeaderText,
  annotation: defaultAnnotation,
  tagText: defaultTagText,
  tagVariant: defaultTagVariant,
  headerIcon: defaultHeaderIcon,
} = createVueCardSelectProps()

export const propCheckedCases: TPropTestCase<IAltVueCardSelectProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
  { prop: 'checked', case: 'undefined', value: undefined, expected: defaultChecked },
]
export const propDisabledCases: TPropTestCase<IAltVueCardSelectProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propHoverableCases: TPropTestCase<IAltVueCardSelectProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'true', value: true, expected: true },
  { prop: 'hoverable', case: 'false', value: false, expected: false },
  { prop: 'hoverable', case: 'undefined', value: undefined, expected: defaultHoverable },
]
export const propFocusableCases: TPropTestCase<IAltVueCardSelectProps, 'focusable'>[] = [
  { prop: 'focusable', case: 'true', value: true, expected: true },
  { prop: 'focusable', case: 'false', value: false, expected: false },
  { prop: 'focusable', case: 'undefined', value: undefined, expected: defaultFocusable },
]
export const propSizeCases: TPropTestCase<IAltVueCardSelectProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propHeaderTextCases: TPropTestCase<IAltVueCardSelectProps, 'headerText'>[] = [
  { prop: 'headerText', case: 'with text', value: text, expected: text },
  { prop: 'headerText', case: 'undefined', value: undefined, expected: defaultHeaderText },
]
export const propTagTextCases: TPropTestCase<IAltVueCardSelectProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'with text', value: text, expected: text },
  { prop: 'tagText', case: 'undefined', value: undefined, expected: defaultTagText },
]
export const propTagVariantCases: TPropTestCase<IAltVueCardSelectProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'accent', value: EAltCoreTagVariant.ACCENT, expected: EAltCoreTagVariant.ACCENT },
  { prop: 'tagVariant', case: 'undefined', value: undefined, expected: defaultTagVariant },
]
export const propHeaderIconCases: TPropTestCase<IAltVueCardSelectProps, 'headerIcon'>[] = [
  { prop: 'headerIcon', case: 'with an icon', value: altRocket, expected: altRocket },
  { prop: 'headerIcon', case: 'undefined', value: undefined, expected: defaultHeaderIcon },
]
export const propAnnotationCases: TPropTestCase<IAltVueCardSelectProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'with text', value: text, expected: text },
  { prop: 'annotation', case: 'undefined', value: undefined, expected: defaultAnnotation },
]
