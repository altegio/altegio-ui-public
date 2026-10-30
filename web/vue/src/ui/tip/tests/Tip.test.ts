import { describe, expect, it, beforeAll, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreTipTagName } from '~shared/constants'

import { AltTip } from '~vue/ui/tip'
import { AltCoreTip } from '~core/index'
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

const tagName = AltCoreTipTagName

describe(
  'Vue/AltTip',
  () => {
    beforeAll(() => {
      // register the core component before the tests run
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreTip,
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
                    AltTip,
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
                    AltTip,
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
