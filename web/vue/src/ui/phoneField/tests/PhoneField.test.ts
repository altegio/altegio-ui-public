import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCorePhoneFieldTagName as tagName } from '~shared/constants'
import { YPhoneField } from '~vue/ui/phoneField'
import { YCorePhoneField } from '~core/ui/phoneField'

import { vueInputEvents } from './cases/events'
import {
  propAnnotationTextTestCases,
  propAutofocusTestCases, propMinSearchLengthTestCases,
  propDisabledTestCases, propErrorsTestCases,
  propDisabledAutocompleteTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases, propWithoutCodeSelectionTestCases, propSearchFunctionTestCases,
  propDefaultCountryIdTestCases,
  propNameTestCases,
  propPlaceholderTestCases, propReadonlyTestCases, propRequiredTestCases, propSizeTestCases,
  propValueTestCases,
} from './cases/props'
import { slotAnnotationTestCases, slotListTestCases } from './cases/slots'

describe(
  'Vue/YPhoneField',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCorePhoneField,
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
                YPhoneField,
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
          ...propMinSearchLengthTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propAnnotationTextTestCases,
          ...propDisabledAutocompleteTestCases,
          ...propErrorsTestCases,
          ...propWithoutCodeSelectionTestCases,
          ...propReadonlyTestCases,
          ...propSearchFunctionTestCases,
          ...propRequiredTestCases,
          ...propSizeTestCases,
          ...propDefaultCountryIdTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YPhoneField,
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
          ...slotListTestCases,
          ...slotAnnotationTestCases,
        ]) {
          it(
            `Slot "${testCase.slot}" должен быть ${testCase.case}`,
            () => {
              const wrapper = mount(
                YPhoneField,
                {
                  props: { value: '' },
                  slots: {
                    list: () => undefined,
                    annotation: () => undefined,
                    'empty-state-actions': () => undefined,
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
                YPhoneField,
                { props: { value: '' } },
              )

              const corePhoneField = wrapper.find(tagName)

              corePhoneField.trigger(eventName, payload ? { detail: payload } : undefined)

              expect(wrapper.emitted()).toHaveProperty(emitEventName)
              if (payload) {
                expect(JSON.stringify((wrapper.emitted(emitEventName)?.[0][0] as CustomEvent).detail)).toEqual(JSON.stringify(payload))
              }
            },
          )
        }
      },
    )
  },
)
