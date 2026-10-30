import { EAltSizes } from '~shared/types/global'
import { text, empty } from '~shared/tests/slotContents'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreCardSelectProps } from '../../models/types'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types'
import { altRocket } from '~shared/icons'

export const propCheckedCases: TPropTestCase<IAltCoreCardSelectProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true },
  { prop: 'checked', case: 'false', value: false },
]
export const propDisabledCases: TPropTestCase<IAltCoreCardSelectProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propHoverableCases: TPropTestCase<IAltCoreCardSelectProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'true', value: true },
  { prop: 'hoverable', case: 'false', value: false },
]
export const propFocusableCases: TPropTestCase<IAltCoreCardSelectProps, 'focusable'>[] = [
  { prop: 'focusable', case: 'true', value: true },
  { prop: 'focusable', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IAltCoreCardSelectProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]
export const propHeaderTextCases: TPropTestCase<IAltCoreCardSelectProps, 'headerText'>[] = [
  { prop: 'headerText', case: 'with text', value: text },
  { prop: 'headerText', case: 'without text', value: empty },
]
export const propTagTextCases: TPropTestCase<IAltCoreCardSelectProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'with text', value: text },
  { prop: 'tagText', case: 'without text', value: '' },
]
export const propTagVariantCases: TPropTestCase<IAltCoreCardSelectProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'accent', value: EAltCoreTagVariant.ACCENT },
  { prop: 'tagVariant', case: 'muted', value: EAltCoreTagVariant.MUTED },
  { prop: 'tagVariant', case: 'danger', value: EAltCoreTagVariant.DANGER },
  { prop: 'tagVariant', case: 'success', value: EAltCoreTagVariant.SUCCESS },
  { prop: 'tagVariant', case: 'warning', value: EAltCoreTagVariant.WARNING },
  { prop: 'tagVariant', case: 'information', value: EAltCoreTagVariant.INFORMATION },
  { prop: 'tagVariant', case: 'discovery', value: EAltCoreTagVariant.DISCOVERY },
]
export const propHeaderIconCases: TPropTestCase<IAltCoreCardSelectProps, 'headerIcon'>[] = [
  { prop: 'headerIcon', case: 'with an icon', value: altRocket },
  { prop: 'headerIcon', case: 'without an icon', value: undefined },
]
export const propAnnotationCases: TPropTestCase<IAltCoreCardSelectProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'with text', value: text },
  { prop: 'annotation', case: 'without text', value: '' },
]
