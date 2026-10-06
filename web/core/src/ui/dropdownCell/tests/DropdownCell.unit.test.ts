import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCoreDropdownCellTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import {
  createCoreDropdownCellProps,
} from '~core/ui/dropdownCell/models/types'
import '~core/ui/dropdownCell'

const tagName = YCoreDropdownCellTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreDropdownCellProps(),
)

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'prepend', case: 'с контентом', content: text },
  { slot: 'prepend', case: 'без контента', content: empty },
  { slot: 'append', case: 'с контентом', content: text },
  { slot: 'append', case: 'без контента', content: empty },
]

describe(
  'Core/YDropdownCell',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                async() => {
                  await updateComponent({ slots: { [testCase.slot]: testCase.content } })

                  expect(component.textContent).toBe(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)
