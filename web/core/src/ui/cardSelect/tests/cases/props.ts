import { EYSizes } from '~shared/types/global'
import { text, empty } from '~shared/tests/slotContents'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreCardSelectProps } from '../../models/types'
import { EYCoreTagVariant } from '~core/ui/tag/models/types'
import { yRocket } from '~shared/icons'

export const propCheckedCases: TPropTestCase<IYCoreCardSelectProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true },
  { prop: 'checked', case: 'false', value: false },
]
export const propDisabledCases: TPropTestCase<IYCoreCardSelectProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propHoverableCases: TPropTestCase<IYCoreCardSelectProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'true', value: true },
  { prop: 'hoverable', case: 'false', value: false },
]
export const propFocusableCases: TPropTestCase<IYCoreCardSelectProps, 'focusable'>[] = [
  { prop: 'focusable', case: 'true', value: true },
  { prop: 'focusable', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IYCoreCardSelectProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]
export const propHeaderTextCases: TPropTestCase<IYCoreCardSelectProps, 'headerText'>[] = [
  { prop: 'headerText', case: 'с текстом', value: text },
  { prop: 'headerText', case: 'без текста', value: empty },
]
export const propTagTextCases: TPropTestCase<IYCoreCardSelectProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'с текстом', value: text },
  { prop: 'tagText', case: 'без текста', value: '' },
]
export const propTagVariantCases: TPropTestCase<IYCoreCardSelectProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'accent', value: EYCoreTagVariant.ACCENT },
  { prop: 'tagVariant', case: 'muted', value: EYCoreTagVariant.MUTED },
  { prop: 'tagVariant', case: 'danger', value: EYCoreTagVariant.DANGER },
  { prop: 'tagVariant', case: 'success', value: EYCoreTagVariant.SUCCESS },
  { prop: 'tagVariant', case: 'warning', value: EYCoreTagVariant.WARNING },
  { prop: 'tagVariant', case: 'information', value: EYCoreTagVariant.INFORMATION },
  { prop: 'tagVariant', case: 'discovery', value: EYCoreTagVariant.DISCOVERY },
]
export const propHeaderIconCases: TPropTestCase<IYCoreCardSelectProps, 'headerIcon'>[] = [
  { prop: 'headerIcon', case: 'с иконкой', value: yRocket },
  { prop: 'headerIcon', case: 'без иконки', value: undefined },
]
export const propAnnotationCases: TPropTestCase<IYCoreCardSelectProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'с текстом', value: text },
  { prop: 'annotation', case: 'без текста', value: '' },
]
