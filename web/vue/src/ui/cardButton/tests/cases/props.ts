import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { EYCoreTagVariant } from '~core/ui/tag/models/types'
import { yRocket } from '~shared/icons'
import { text } from '~shared/tests/slotContents'
import { createVueCardButtonProps, type IYVueCardButtonProps } from '~vue/ui/cardButton/models/types'

const {
  disabled: defaultDisabled,
  hoverable: defaultHoverable,
  focusable: defaultFocusable,
  size: defaultSize,
  headerText: defaultHeaderText,
  annotation: defaultAnnotation,
  tagText: defaultTagText,
  tagVariant: defaultTagVariant,
  headerIcon: defaultHeaderIcon,
} = createVueCardButtonProps()

export const propDisabledCases: TPropTestCase<IYVueCardButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propHoverableCases: TPropTestCase<IYVueCardButtonProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'true', value: true, expected: true },
  { prop: 'hoverable', case: 'false', value: false, expected: false },
  { prop: 'hoverable', case: 'undefined', value: undefined, expected: defaultHoverable },
]
export const propFocusableCases: TPropTestCase<IYVueCardButtonProps, 'focusable'>[] = [
  { prop: 'focusable', case: 'true', value: true, expected: true },
  { prop: 'focusable', case: 'false', value: false, expected: false },
  { prop: 'focusable', case: 'undefined', value: undefined, expected: defaultFocusable },
]
export const propSizeCases: TPropTestCase<IYVueCardButtonProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propHeaderTextCases: TPropTestCase<IYVueCardButtonProps, 'headerText'>[] = [
  { prop: 'headerText', case: 'с текстом', value: text, expected: text },
  { prop: 'headerText', case: 'undefined', value: undefined, expected: defaultHeaderText },
]
export const propTagTextCases: TPropTestCase<IYVueCardButtonProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'с текстом', value: text, expected: text },
  { prop: 'tagText', case: 'undefined', value: undefined, expected: defaultTagText },
]
export const propTagVariantCases: TPropTestCase<IYVueCardButtonProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'accent', value: EYCoreTagVariant.ACCENT, expected: EYCoreTagVariant.ACCENT },
  { prop: 'tagVariant', case: 'undefined', value: undefined, expected: defaultTagVariant },
]
export const propHeaderIconCases: TPropTestCase<IYVueCardButtonProps, 'headerIcon'>[] = [
  { prop: 'headerIcon', case: 'с иконкой', value: yRocket, expected: yRocket },
  { prop: 'headerIcon', case: 'undefined', value: undefined, expected: defaultHeaderIcon },
]
export const propAnnotationCases: TPropTestCase<IYVueCardButtonProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'с текстом', value: text, expected: text },
  { prop: 'annotation', case: 'undefined', value: undefined, expected: defaultAnnotation },
]
