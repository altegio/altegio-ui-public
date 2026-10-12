import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreTextFieldTagName as tagName } from '~shared/constants'
import { YTextField } from '~vue/ui/textField'
import { YCoreTextField } from '~core/ui/textField'

import {
  eventInputCases,
  eventBlurCases,
  eventFocusCases,
  eventClearCases,
} from './cases/events'
import {
  slotBeforeTestCases,
  slotTooltipContentTestCases,
  slotAnnotationTestCases,
  slotAfterTestCases,
} from './cases/slots'
import {
  propValueTestCases,
  propNameTestCases,
  propPlaceholderTestCases,
  propAnnotationTextTestCases,
  propLabelTooltipTextTestCases,
  propLabelTextTestCases,
  propsDisabledTestCases,
  propsRequiredTestCases,
  propsReadonlyTestCases,
  propsMaxlengthTestCases,
  propsLabelDebounceTestCases,
  propsAutofocusTestCases,
  propsClearableTestCases,
  propsSizeTestCases,
  propsTypeTestCases,
} from './cases/props'

describe(
  'Vue/YTextField',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreTextField,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [...propValueTestCases]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YTextField,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element.value).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of [
          ...propNameTestCases,
          ...propPlaceholderTestCases,
          ...propAnnotationTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propLabelTextTestCases,
          ...propsDisabledTestCases,
          ...propsRequiredTestCases,
          ...propsReadonlyTestCases,
          ...propsMaxlengthTestCases,
          ...propsLabelDebounceTestCases,
          ...propsAutofocusTestCases,
          ...propsClearableTestCases,
          ...propsSizeTestCases,
          ...propsTypeTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YTextField,
                { props: { value: '', [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              if (Array.isArray(testCase.value)) {
                expect(coreElement.element[testCase.prop]).toStrictEqual(testCase.expected)
              } else {
                expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
              }
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotBeforeTestCases,
          ...slotTooltipContentTestCases,
          ...slotAnnotationTestCases,
          ...slotAfterTestCases,
        ]) {
          it(
            `Slot "${testCase.slot}" должен быть ${testCase.case}`,
            () => {
              const wrapper = mount(
                YTextField,
                {
                  props: { value: '' },
                  slots: {
                    before: () => '',
                    annotation: () => '',
                    'tooltip-content': () => '',
                    after: () => '',
                    [testCase.slot]: () => testCase.content,
                  },
                },
              )

              const slotContent = wrapper.find(`${tagName} [slot="${testCase.slot}"]`)
              expect(slotContent.exists()).toBe(true)
              expect(slotContent.text()).toBe(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        for (const testCase of [
            ...eventInputCases,
            ...eventBlurCases,
            ...eventFocusCases,
            ...eventClearCases,
        ]) {
          it(
            `Должен вызывать событие ${testCase.event} ${testCase.case} core компонента`,
            async() => {
              const wrapper = mount(YTextField)

              const coreElement = wrapper.find(tagName)

              coreElement.trigger(testCase.nodeEventName)

              await wrapper.vm.$nextTick()
              expect(wrapper.emitted()).toHaveProperty(testCase.event)
            },
          )
        }
      },
    )
  },
)
