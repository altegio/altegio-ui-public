import type { TPropTestCase } from '~shared/types/tests.ts'
import type { IYNgTabsProps } from '~ng/ui/tabs'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'
import type { IYCoreTabsItem } from '~core/ui/tabs/models/types'

const oneTab: IYCoreTabsItem = { ...createCoreTabExternalProps() }

export const propsTabsTestCases: TPropTestCase<IYNgTabsProps, 'tabs'>[] = [
  { prop: 'tabs', case: 'tab', value: [oneTab], expected: [oneTab] },
  { prop: 'tabs', case: 'undefined', value: undefined, expected: [] },
]
