import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreCardButtonTagName as tagName } from '~shared/constants'
import { AltCoreCardButton } from '~core/index'
import { AltCardButton } from '~vue/ui/cardButton'

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
  'Vue/AltCardButton/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreCardButton,
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
            `Slot: "${testCase.slot}" should render ${testCase.case}`,
            () => {
              const wrapper = mount(
                AltCardButton,
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
            `Prop: "${testCase.prop}" ${testCase.value} should set ${testCase.prop} on the core component`,
            () => {
              const wrapper = mount(
                AltCardButton,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as AltCoreCardButton

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propHeaderIconCases) {
          it(
            `Prop: "${testCase.prop}" should work ${testCase.case} for the core component`,
            () => {
              const wrapper = mount(
                AltCardButton,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as AltCoreCardButton

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
                AltCardButton,
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
