import { describe, expect, it, beforeAll, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreTooltipTagName } from '~shared/constants'

import { YTooltip } from '~vue/ui/tooltip'
import { YCoreTooltip } from '~core/index'
import {
  slotActivatorTestCases,
  slotContentTestCases,
  defaultTestProps,
} from './cases/slots'
import { propDisabledTestCases, propTextTestCases, propPlacementTestCases } from './cases/props'

const tagName = YCoreTooltipTagName

describe(
  'Vue/YTooltip',
  () => {
    beforeAll(() => {
      // настройка перед запуском тестов
      if (!customElements.get(tagName)) {
        customElements.define(
            tagName,
            YCoreTooltip,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            // контейнер для рендера ShadowRoot
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
                `Изменения prop ${testCase.prop} должно быть ${testCase.case} в core-компоненте ${tagName}`,
                () => {
                  const wrapper = mount(
                      YTooltip,
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
                `Должен отрендерить слот "${testCase.slot}"`,
                () => {
                  const wrapper = mount(
                      YTooltip,
                      { slots: { activator: defaultTestProps.activator, [testCase.slot]: testCase.content } },
                  )

                  expect(wrapper.find(`[slot="${testCase.slot}"]`).exists()).toBe(true)
                },
              )

              it(
                `Слот "${testCase.slot}" должен быть ${testCase.case}`,
                () => {
                  const wrapper = mount(
                      YTooltip,
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
