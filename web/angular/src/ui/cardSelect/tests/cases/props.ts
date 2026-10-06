import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { EYCoreTagVariant } from '~core/ui/tag/models/types'
import { yRocket } from '~shared/icons'
import { text } from '~shared/tests/slotContents'
import { createNgCardSelectProps, type IYNgCardSelectProps } from '~ng/ui/cardSelect/models/types'

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
} = createNgCardSelectProps()

export const propCheckedCases: TPropTestCase<IYNgCardSelectProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
  { prop: 'checked', case: 'undefined', value: undefined, expected: defaultChecked },
]
export const propDisabledCases: TPropTestCase<IYNgCardSelectProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propHoverableCases: TPropTestCase<IYNgCardSelectProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'true', value: true, expected: true },
  { prop: 'hoverable', case: 'false', value: false, expected: false },
  { prop: 'hoverable', case: 'undefined', value: undefined, expected: defaultHoverable },
]
export const propFocusableCases: TPropTestCase<IYNgCardSelectProps, 'focusable'>[] = [
  { prop: 'focusable', case: 'true', value: true, expected: true },
  { prop: 'focusable', case: 'false', value: false, expected: false },
  { prop: 'focusable', case: 'undefined', value: undefined, expected: defaultFocusable },
]
export const propSizeCases: TPropTestCase<IYNgCardSelectProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propHeaderTextCases: TPropTestCase<IYNgCardSelectProps, 'headerText'>[] = [
  { prop: 'headerText', case: 'с текстом', value: text, expected: text },
  { prop: 'headerText', case: 'undefined', value: undefined, expected: defaultHeaderText },
]
export const propTagTextCases: TPropTestCase<IYNgCardSelectProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'с текстом', value: text, expected: text },
  { prop: 'tagText', case: 'undefined', value: undefined, expected: defaultTagText },
]
export const propTagVariantCases: TPropTestCase<IYNgCardSelectProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'accent', value: EYCoreTagVariant.ACCENT, expected: EYCoreTagVariant.ACCENT },
  { prop: 'tagVariant', case: 'undefined', value: undefined, expected: defaultTagVariant },
]
export const propHeaderIconCases: TPropTestCase<IYNgCardSelectProps, 'headerIcon'>[] = [
  { prop: 'headerIcon', case: 'с иконкой', value: yRocket, expected: yRocket },
  { prop: 'headerIcon', case: 'undefined', value: undefined, expected: defaultHeaderIcon },
]
export const propAnnotationCases: TPropTestCase<IYNgCardSelectProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'с текстом', value: text, expected: text },
  { prop: 'annotation', case: 'undefined', value: undefined, expected: defaultAnnotation },
]
