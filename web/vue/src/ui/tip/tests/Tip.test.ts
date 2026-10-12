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
      // настройка перед запуском тестов
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
                `Должен отрендерить ${testCase.slot} слот ${testCase.case}`,
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
                `Изменения prop ${testCase.prop} должно быть ${testCase.case} в core-компоненте ${tagName}`,
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
