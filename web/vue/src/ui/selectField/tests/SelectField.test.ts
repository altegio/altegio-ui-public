import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreSelectFieldTagName as tagName } from '~shared/constants'
import { YSelectField } from '~vue/ui/selectField'
import { YCoreSelectField } from '~core/ui/selectField'

import { vueInputEvents } from './cases/events'
import {
  propAnnotationTextTestCases,
  propAutofocusTestCases,
  propDisabledTestCases,
  propErrorsTestCases, propErrorTestCases,
  propFilterCallbackTestCases, propIsCustomFilterTestCases, propIsFilterableTestCases, propIsMapOptionsTestCases,
  propItemLabelTestCases,
  propItemsTestCases,
  propItemValueTestCases, propLabelDebounceTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propNameTestCases,
  propPlaceholderTestCases,
  propReadonlyTestCases,
  propRequiredTestCases,
  propSizeTestCases,
  propValueTestCases,
} from './cases/props'
import {
  slotAnnotationTestCases, slotBeforeTestCases,
  slotDropdownListBottomTestCases,
  slotDropdownListTopTestCases,
  slotListTestCases,
} from './cases/slots'

describe(
  'Vue/YSelectField',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreSelectField,
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
                YSelectField,
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
          ...propAutofocusTestCases,
          ...propItemLabelTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propAnnotationTextTestCases,
          ...propItemValueTestCases,
          ...propErrorsTestCases,
          ...propItemsTestCases,
          ...propReadonlyTestCases,
          ...propFilterCallbackTestCases,
          ...propRequiredTestCases,
          ...propSizeTestCases,
          ...propIsCustomFilterTestCases,
          ...propIsFilterableTestCases,
          ...propIsMapOptionsTestCases,
          ...propErrorTestCases,
          ...propLabelDebounceTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YSelectField,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toStrictEqual(testCase.expected)
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotListTestCases,
          ...slotAnnotationTestCases,
          ...slotDropdownListTopTestCases,
          ...slotDropdownListBottomTestCases,
          ...slotBeforeTestCases,
        ]) {
          it(
            `Slot "${testCase.slot}" должен быть ${testCase.case}`,
            () => {
              const wrapper = mount(
                YSelectField,
                {
                  props: { value: '' },
                  slots: {
                    before: () => undefined,
                    list: () => undefined,
                    annotation: () => undefined,
                    'empty-state-actions': () => undefined,
                    'dropdown-list-top': () => undefined,
                    'dropdown-list-bottom': () => undefined,
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
        for (const { emitEventName, eventName, payload, case: eventCase } of vueInputEvents) {
          it(
            `Должен вызывать событие "${emitEventName}" ${eventCase}`,
            () => {
              const wrapper = mount(
                YSelectField,
                { props: { value: '' } },
              )

              const coreSelectField = wrapper.find(tagName)

              coreSelectField.trigger(eventName, payload ? { detail: payload } : undefined)

              expect(wrapper.emitted()).toHaveProperty(emitEventName)
              if (payload) {
                expect(wrapper.emitted(emitEventName)?.[0][0]).toEqual(payload.value)
              }
            },
          )
        }
      },
    )
  },
)
