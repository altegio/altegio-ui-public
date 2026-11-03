import type { TPropTestCase } from '~shared/types/tests'
import { EAltCoreCollapseItemVariant } from '~core/ui/collapseItem/models/types'
import { text } from '~shared/tests/slotContents'

import type { IAltCoreCollapseItemProps } from '~core/ui/collapseItem/models/types'

export const propLabelCases: TPropTestCase<IAltCoreCollapseItemProps, 'label'>[] = [
  { prop: 'label', case: 'with text', value: text },
  { prop: 'label', case: 'without text', value: '' },
]
export const propAnnotationCases: TPropTestCase<IAltCoreCollapseItemProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'with text', value: text },
  { prop: 'annotation', case: 'without text', value: '' },
]
export const propOpenedCases: TPropTestCase<IAltCoreCollapseItemProps, 'opened'>[] = [
  { prop: 'opened', case: 'true', value: true },
  { prop: 'opened', case: 'false', value: false },
]
export const propValueCases: TPropTestCase<IAltCoreCollapseItemProps, 'value'>[] = [
  { prop: 'value', case: 'with text', value: text },
  { prop: 'value', case: 'without text', value: '' },
]
export const propVariantCases: TPropTestCase<IAltCoreCollapseItemProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EAltCoreCollapseItemVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EAltCoreCollapseItemVariant.SECONDARY },
]
