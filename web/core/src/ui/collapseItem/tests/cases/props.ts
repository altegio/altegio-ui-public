import type { TPropTestCase } from '~shared/types/tests'
import { EYCoreCollapseItemVariant } from '~core/ui/collapseItem/models/types'
import { text } from '~shared/tests/slotContents'

import type { IYCoreCollapseItemProps } from '~core/ui/collapseItem/models/types'

export const propLabelCases: TPropTestCase<IYCoreCollapseItemProps, 'label'>[] = [
  { prop: 'label', case: 'с текстом', value: text },
  { prop: 'label', case: 'без текста', value: '' },
]
export const propAnnotationCases: TPropTestCase<IYCoreCollapseItemProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'с текстом', value: text },
  { prop: 'annotation', case: 'без текста', value: '' },
]
export const propOpenedCases: TPropTestCase<IYCoreCollapseItemProps, 'opened'>[] = [
  { prop: 'opened', case: 'true', value: true },
  { prop: 'opened', case: 'false', value: false },
]
export const propValueCases: TPropTestCase<IYCoreCollapseItemProps, 'value'>[] = [
  { prop: 'value', case: 'с текстом', value: text },
  { prop: 'value', case: 'без текста', value: '' },
]
export const propVariantCases: TPropTestCase<IYCoreCollapseItemProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EYCoreCollapseItemVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EYCoreCollapseItemVariant.SECONDARY },
]
