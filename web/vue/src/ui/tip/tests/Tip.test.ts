import { describe, expect, it, beforeAll, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreTipTagName } from '~shared/constants'

import { YTip } from '~vue/ui/tip'
import { YCoreTip } from '~core/index'
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
} from './cases/props'

const tagName = YCoreTipTagName

describe(
  'Vue/YTip',
  () => {
    beforeAll(() => {
      // register the core component before the tests run
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreTip,
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
                    YTip,
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
            // container that hosts the rendered shadow root
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
            ]) {
              it(
                `Changing prop ${testCase.prop} should update the core component ${tagName} (${testCase.case})`,
                () => {
                  const wrapper = mount(
                    YTip,
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
