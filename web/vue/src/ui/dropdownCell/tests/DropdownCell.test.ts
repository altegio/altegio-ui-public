import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import { YDropdownCell } from '~vue/ui/dropdownCell'

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'cell', case: 'with content', content: text },
  { slot: 'cell', case: 'without content', content: empty },
  { slot: 'prepend', case: 'with content', content: text },
  { slot: 'prepend', case: 'without content', content: empty },
  { slot: 'content', case: 'with content', content: text },
  { slot: 'content', case: 'without content', content: empty },
  { slot: 'label', case: 'with content', content: text },
  { slot: 'label', case: 'without content', content: empty },
  { slot: 'append', case: 'with content', content: text },
  { slot: 'append', case: 'without content', content: empty },
]

describe(
  'Vue/YDropdownCell',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it(
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownCell,
                    { slots: { [testCase.slot]: testCase.content } },
                  )

                  expect(wrapper.text()).toBe(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)
