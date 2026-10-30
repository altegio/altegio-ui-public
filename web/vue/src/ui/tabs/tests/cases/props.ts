import type { TPropTestCase } from '~shared/types/tests.ts'
import type { IAltVueCoreTabsProps } from '~vue/ui/tabs'

import type { IAltCoreTabsItem } from '~core/ui/tabs/models/types'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'

const oneTab: IAltCoreTabsItem = { ...createCoreTabExternalProps() }

export const propsTabsTestCases: TPropTestCase<IAltVueCoreTabsProps, 'tabs'>[] = [
  { prop: 'tabs', case: 'tab', value: [oneTab], expected: [oneTab] },
  { prop: 'tabs', case: 'undefined', value: undefined, expected: [] },
]
