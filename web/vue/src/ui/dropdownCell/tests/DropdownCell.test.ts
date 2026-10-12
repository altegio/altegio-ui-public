import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import { YDropdownCell } from '~vue/ui/dropdownCell'

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'cell', case: 'с контентом', content: text },
  { slot: 'cell', case: 'без контента', content: empty },
  { slot: 'prepend', case: 'с контентом', content: text },
  { slot: 'prepend', case: 'без контента', content: empty },
  { slot: 'content', case: 'с контентом', content: text },
  { slot: 'content', case: 'без контента', content: empty },
  { slot: 'label', case: 'с контентом', content: text },
  { slot: 'label', case: 'без контента', content: empty },
  { slot: 'append', case: 'с контентом', content: text },
  { slot: 'append', case: 'без контента', content: empty },
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
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
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
