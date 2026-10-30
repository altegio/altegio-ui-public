import { text, empty } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreCardHeaderProps } from '../../models/types'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types'
import { altRocket } from '~shared/icons'

export const propDisabledCases: TPropTestCase<IAltCoreCardHeaderProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IAltCoreCardHeaderProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]
export const propHeaderTextCases: TPropTestCase<IAltCoreCardHeaderProps, 'headerText'>[] = [
  { prop: 'headerText', case: 'with text', value: text },
  { prop: 'headerText', case: 'without text', value: empty },
]
export const propTagTextCases: TPropTestCase<IAltCoreCardHeaderProps, 'tagText'>[] = [
  { prop: 'tagText', case: 'with text', value: text },
  { prop: 'tagText', case: 'without text', value: '' },
]
export const propTagVariantCases: TPropTestCase<IAltCoreCardHeaderProps, 'tagVariant'>[] = [
  { prop: 'tagVariant', case: 'accent', value: EAltCoreTagVariant.ACCENT },
  { prop: 'tagVariant', case: 'muted', value: EAltCoreTagVariant.MUTED },
  { prop: 'tagVariant', case: 'danger', value: EAltCoreTagVariant.DANGER },
  { prop: 'tagVariant', case: 'success', value: EAltCoreTagVariant.SUCCESS },
  { prop: 'tagVariant', case: 'warning', value: EAltCoreTagVariant.WARNING },
  { prop: 'tagVariant', case: 'information', value: EAltCoreTagVariant.INFORMATION },
  { prop: 'tagVariant', case: 'discovery', value: EAltCoreTagVariant.DISCOVERY },
]
export const propHeaderIconCases: TPropTestCase<IAltCoreCardHeaderProps, 'headerIcon'>[] = [
  { prop: 'headerIcon', case: 'with an icon', value: altRocket },
  { prop: 'headerIcon', case: 'without an icon', value: undefined },
]
