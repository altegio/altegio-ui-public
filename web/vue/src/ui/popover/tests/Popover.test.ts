import { describe, expect, it, beforeAll, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCorePopoverTagName } from '~shared/constants'

import { AltPopover } from '~vue/ui/popover'
import { AltCorePopover } from '~core/index'
import {
  slotActivatorTestCases,
  slotContentTestCases,
} from './cases/slots'
import {
  propIsOpenTestCases,
  propOffsetTestCases,
  propPaddingTestCases,
  propPlacementTestCases,
  propStrategyTestCases,
  propTransitionTestCases,
  propTriggerTestCases,
  propTypeTestCases,
  propSubmitTextTestCases,
  propCancelTextTestCases,
} from './cases/props'

const tagName = AltCorePopoverTagName

describe(
  'Vue/AltPopover',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCorePopover,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of [
              ...slotActivatorTestCases,
              ...slotContentTestCases,
            ]) {
              it(
                `Should render the ${testCase.slot} slot ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    AltPopover,
                    { slots: { [testCase.slot]: testCase.content } },
                  )

                  expect(wrapper.html()).toContain(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            let container: HTMLElement

            beforeEach(() => {
              container = document.createElement('div')
              document.body.appendChild(container)
            })

            afterEach(() => {
              document.body.removeChild(container)
            })

            for (const testCase of [
              ...propIsOpenTestCases,
              ...propOffsetTestCases,
              ...propPaddingTestCases,
              ...propPlacementTestCases,
              ...propStrategyTestCases,
              ...propTransitionTestCases,
              ...propTriggerTestCases,
              ...propTypeTestCases,
              ...propSubmitTextTestCases,
              ...propCancelTextTestCases,
            ]) {
              it(
                `Changing prop ${testCase.prop} should update the core component ${tagName} (${testCase.case})`,
                () => {
                  const wrapper = mount(
                    AltPopover,
                    {
                      props: { [testCase.prop]: testCase.value },
                      attachTo: container,
                    },
                  )

                  const coreElement = wrapper.find(tagName)

                  expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
