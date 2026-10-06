import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreCardSelectTagName as tagName } from '~shared/constants'
import { YCoreCardSelect } from '~core/index'
import { YCardSelect } from '~vue/ui/cardSelect'

import {
  propCheckedCases,
  propDisabledCases,
  propHoverableCases,
  propFocusableCases,
  propSizeCases,
  propHeaderTextCases,
  propTagTextCases,
  propTagVariantCases,
  propHeaderIconCases,
  propAnnotationCases,
} from './cases/props'

import {
  slotBeforeTestCases,
  slotAnnotationTestCases,
  slotAfterTestCases,
} from './cases/slots'

import {
  eventsTestCases,
} from './cases/events'

describe(
  'Vue/YCardSelect/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCardSelect,
        )
      }
    })

    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotBeforeTestCases,
          ...slotAnnotationTestCases,
          ...slotAfterTestCases,
        ]) {
          it(
            `Slot: "${testCase.slot}" должен быть ${testCase.case}`,
            () => {
              const wrapper = mount(
                YCardSelect,
                { slots: { [testCase.slot]: testCase.content } },
              )

              expect(wrapper.text()).toBe(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propCheckedCases,
          ...propDisabledCases,
          ...propHoverableCases,
          ...propFocusableCases,
          ...propSizeCases,
          ...propHeaderTextCases,
          ...propTagTextCases,
          ...propTagVariantCases,
          ...propAnnotationCases,
        ]) {
          it(
            `Prop: "${testCase.prop}" ${testCase.value} должен изменить свойство ${testCase.prop} у core компонента`,
            () => {
              const wrapper = mount(
                YCardSelect,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreCardSelect

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propHeaderIconCases) {
          it(
            `Prop: "${testCase.prop}" должен быть ${testCase.case} для core компонента`,
            () => {
              const wrapper = mount(
                YCardSelect,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreCardSelect

              expect(coreElement.headerIcon?.name).toBe(testCase.value?.name)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        for (const testCase of eventsTestCases) {
          it(
            `Event: "${testCase.emitEventName}" ${testCase.case}`,
            () => {
              const wrapper = mount(
                YCardSelect,
                { props: { focusable: true } },
              )

              const coreElement = wrapper.find(tagName)

              coreElement.trigger(testCase.eventName)

              expect(wrapper.emitted()).toHaveProperty(testCase.emitEventName)
            },
          )
        }
      },
    )
  },
)
