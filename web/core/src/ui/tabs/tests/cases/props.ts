import type { IYCoreTabsItem, IYCoreTabsProps } from '~core/ui/tabs/models/types'
import {
  createCoreTabsProps,
} from '~core/ui/tabs/models/types'
import type { TPropTestCase } from '~shared/types/tests.ts'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'

const defaultProps = createCoreTabsProps()

const oneTab: IYCoreTabsItem = { ...createCoreTabExternalProps() }

export const propsTabsTestCases: TPropTestCase<IYCoreTabsProps, 'tabs'>[] = [
  { prop: 'tabs', case: 'tab', value: [oneTab], expected: [oneTab] },
  { prop: 'tabs', case: 'undefined', value: undefined, expected: defaultProps.tabs },
]

export const propsValueTestCases: TPropTestCase<IYCoreTabsProps, 'value'>[] = [
  { prop: 'value', case: 'true', value: 0, expected: 0 },
  { prop: 'value', case: 'false', value: 3, expected: 3 },
  { prop: 'value', case: 'undefined', value: undefined, expected: defaultProps.value },
]

