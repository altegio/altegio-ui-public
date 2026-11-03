import { EAltSizes } from '~shared/types/global'
import { text, empty } from '~shared/tests/slotContents'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreCardButtonProps } from '~core/ui/cardButton/models/types'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types'
import { altRocket } from '~shared/icons'

export const propDisabledCases: TPropTestCase<IAltCoreCardButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propHoverableCases: TPropTestCase<IAltCoreCardButtonProps, 'hoverable'>[] = [
  { prop: 'hoverable', case: 'true', value: true },
  { prop: 'hoverable', case: 'false', value: false },
]
export const propFocusableCases: TPropTestCase<IAltCoreCardButtonProps, 'focusable'>[] = [
  { prop: 'focusable', case: 'true', value: true },
  { prop: 'focusable', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IAltCoreCardButtonProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]
export const propHeaderTextCases: TPropTestCase<IAltCoreCardButtonProps, 'headerText'>[] = [
  { prop: 'headerText', case: 'with text', value: text },
  { prop: 'headerText', case: 'without text', value: empty },
]
export const propTagTextCases: TPropTestCase<IAltCoreCardButtonProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'with text', value: text },
  { prop: 'tagText', case: 'without text', value: '' },
]
export const propTagVariantCases: TPropTestCase<IAltCoreCardButtonProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'accent', value: EAltCoreTagVariant.ACCENT },
  { prop: 'tagVariant', case: 'muted', value: EAltCoreTagVariant.MUTED },
  { prop: 'tagVariant', case: 'danger', value: EAltCoreTagVariant.DANGER },
  { prop: 'tagVariant', case: 'success', value: EAltCoreTagVariant.SUCCESS },
  { prop: 'tagVariant', case: 'warning', value: EAltCoreTagVariant.WARNING },
  { prop: 'tagVariant', case: 'information', value: EAltCoreTagVariant.INFORMATION },
  { prop: 'tagVariant', case: 'discovery', value: EAltCoreTagVariant.DISCOVERY },
]
export const propHeaderIconCases: TPropTestCase<IAltCoreCardButtonProps, 'headerIcon'>[] = [
  { prop: 'headerIcon', case: 'with an icon', value: altRocket },
  { prop: 'headerIcon', case: 'without an icon', value: undefined },
]
export const propAnnotationCases: TPropTestCase<IAltCoreCardButtonProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'with text', value: text },
  { prop: 'annotation', case: 'without text', value: '' },
]
