import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreCardButtonTagName as tagName } from '~shared/constants'
import { YCoreCardButton } from '~core/index'
import { YCardButton } from '~vue/ui/cardButton'

import {
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
  slotMainTestCases,
  slotAnnotationTestCases,
  slotAfterTestCases,
} from './cases/slots'

import {
  eventsTestCases,
} from './cases/events'

describe(
  'Vue/YCardButton/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCardButton,
        )
      }
    })

    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotBeforeTestCases,
          ...slotMainTestCases,
          ...slotAnnotationTestCases,
          ...slotAfterTestCases,
        ]) {
          it(
            `Slot: "${testCase.slot}" должен быть ${testCase.case}`,
            () => {
              const wrapper = mount(
                YCardButton,
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
                YCardButton,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreCardButton

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propHeaderIconCases) {
          it(
            `Prop: "${testCase.prop}" должен быть ${testCase.case} для core компонента`,
            () => {
              const wrapper = mount(
                YCardButton,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreCardButton

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
                YCardButton,
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
