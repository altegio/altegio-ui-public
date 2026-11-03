import { describe, expect, it, beforeAll, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreTooltipTagName } from '~shared/constants'

import { AltTooltip } from '~vue/ui/tooltip'
import { AltCoreTooltip } from '~core/index'
import {
  slotActivatorTestCases,
  slotContentTestCases,
  defaultTestProps,
} from './cases/slots'
import { propDisabledTestCases, propTextTestCases, propPlacementTestCases } from './cases/props'

const tagName = AltCoreTooltipTagName

describe(
  'Vue/AltTooltip',
  () => {
    beforeAll(() => {
      // register the core component before the tests run
      if (!customElements.get(tagName)) {
        customElements.define(
            tagName,
            AltCoreTooltip,
        )
      }
    })

    describe(
      'Unit',
      () => {
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
                ...propTextTestCases,
                ...propDisabledTestCases,
                ...propPlacementTestCases,
            ]) {
              it(
                `Changing prop ${testCase.prop} should update the core component ${tagName} (${testCase.case})`,
                () => {
                  const wrapper = mount(
                      AltTooltip,
                      {
                        props: { [testCase.prop]: testCase.value, ...testCase.additionalProps },
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

        describe(
          'Slots',
          () => {
            for (const testCase of [
                ...slotContentTestCases,
                ...slotActivatorTestCases,
            ]) {
              it(
                `Should render the "${testCase.slot}" slot`,
                () => {
                  const wrapper = mount(
                      AltTooltip,
                      { slots: { activator: defaultTestProps.activator, [testCase.slot]: testCase.content } },
                  )

                  expect(wrapper.find(`[slot="${testCase.slot}"]`).exists()).toBe(true)
                },
              )

              it(
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                () => {
                  const wrapper = mount(
                      AltTooltip,
                      { slots: { activator: defaultTestProps.activator, [testCase.slot]: testCase.content } },
                  )

                  expect(wrapper.find(`[slot="${testCase.slot}"]`).text()).toContain(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)
