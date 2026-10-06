import { text, empty } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreCardHeaderProps } from '../../models/types'
import { EYCoreTagVariant } from '~core/ui/tag/models/types'
import { yRocket } from '~shared/icons'

export const propDisabledCases: TPropTestCase<IYCoreCardHeaderProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IYCoreCardHeaderProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]
export const propHeaderTextCases: TPropTestCase<IYCoreCardHeaderProps, 'headerText'>[] = [
  { prop: 'headerText', case: 'с текстом', value: text },
  { prop: 'headerText', case: 'без текста', value: empty },
]
export const propTagTextCases: TPropTestCase<IYCoreCardHeaderProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'с текстом', value: text },
  { prop: 'tagText', case: 'без текста', value: '' },
]
export const propTagVariantCases: TPropTestCase<IYCoreCardHeaderProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'accent', value: EYCoreTagVariant.ACCENT },
  { prop: 'tagVariant', case: 'muted', value: EYCoreTagVariant.MUTED },
  { prop: 'tagVariant', case: 'danger', value: EYCoreTagVariant.DANGER },
  { prop: 'tagVariant', case: 'success', value: EYCoreTagVariant.SUCCESS },
  { prop: 'tagVariant', case: 'warning', value: EYCoreTagVariant.WARNING },
  { prop: 'tagVariant', case: 'information', value: EYCoreTagVariant.INFORMATION },
  { prop: 'tagVariant', case: 'discovery', value: EYCoreTagVariant.DISCOVERY },
]
export const propHeaderIconCases: TPropTestCase<IYCoreCardHeaderProps, 'headerIcon'>[] = [
  { prop: 'headerIcon', case: 'с иконкой', value: yRocket },
  { prop: 'headerIcon', case: 'без иконки', value: undefined },
]
