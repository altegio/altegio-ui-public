import { describe, expect, it, beforeAll, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCorePopoverTagName } from '~shared/constants'

import { YPopover } from '~vue/ui/popover'
import { YCorePopover } from '~core/index'
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

const tagName = YCorePopoverTagName

describe(
  'Vue/YPopover',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCorePopover,
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
                `Должен отрендерить ${testCase.slot} слот ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YPopover,
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
                `Изменения prop ${testCase.prop} должно быть ${testCase.case} в core-компоненте ${tagName}`,
                () => {
                  const wrapper = mount(
                    YPopover,
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
