import { text } from '~shared/tests/slotContents'
import type { TPropTestCase } from '~shared/types/tests.ts'
import type { IAltNgTabsProps } from '~ng/ui/tabs'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'
import type { IAltCoreTabsItem } from '~core/ui/tabs/models/types'

const oneTab: IAltCoreTabsItem = { ...createCoreTabExternalProps() }

export const propsTabsTestCases: TPropTestCase<IAltNgTabsProps, 'tabs'>[] = [
  { prop: 'tabs', case: 'tab', value: [oneTab], expected: [oneTab] },
  { prop: 'tabs', case: 'undefined', value: undefined, expected: [] },
]

export const propsAccessibleNameTestCases: TPropTestCase<IAltNgTabsProps, 'accessibleName'>[] = [
  { prop: 'accessibleName', case: 'text', value: text, expected: text },
  { prop: 'accessibleName', case: 'undefined', value: undefined, expected: undefined },
]
