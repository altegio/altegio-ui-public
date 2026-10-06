import type { TPropTestCase } from '~shared/types/tests.ts'
import type { IYVueCoreTabsProps } from '~vue/ui/tabs'

import type { IYCoreTabsItem } from '~core/ui/tabs/models/types'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'

const oneTab: IYCoreTabsItem = { ...createCoreTabExternalProps() }

export const propsTabsTestCases: TPropTestCase<IYVueCoreTabsProps, 'tabs'>[] = [
  { prop: 'tabs', case: 'tab', value: [oneTab], expected: [oneTab] },
  { prop: 'tabs', case: 'undefined', value: undefined, expected: [] },
]
