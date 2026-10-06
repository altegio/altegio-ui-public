import type { TPropTestCase } from '~shared/types/tests.ts'
import { empty, text } from '~shared/tests/slotContents.ts'
import type { IYVueTagProps } from '~vue/ui/tag'

export const propLocatorTestCases: TPropTestCase<IYVueTagProps, 'locator'>[] = [
  { prop: 'locator', case: 'текст', value: text, expected: text },
  { prop: 'locator', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: undefined },
]
