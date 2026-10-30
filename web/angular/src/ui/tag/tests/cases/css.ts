import type { TPropTestCase } from '~shared/types/tests.ts'
import { empty, text } from '~shared/tests/slotContents.ts'
import type { IAltNgTagProps } from '~ng/ui/tag'

export const propsLocatorTestCases: TPropTestCase<IAltNgTagProps, 'locator'>[] = [
  { prop: 'locator', case: 'text', value: text, expected: text },
  { prop: 'locator', case: 'empty string', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: undefined },
]
