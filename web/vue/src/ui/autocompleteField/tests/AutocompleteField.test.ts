import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreAutocompleteFieldTagName as tagName } from '~shared/constants'
import { YAutocompleteField } from '~vue/ui/autocompleteField'
import { YCoreAutocompleteField } from '~core/ui/autocompleteField'

import { vueInputEvents } from './cases/events'
import {
  propAnnotationTextTestCases,
  propAutofocusTestCases,
  propMinSearchLengthTestCases,
  propDisabledTestCases,
  propErrorsTestCases,
  propDisabledAutocompleteTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propSearchFunctionTestCases,
  propNameTestCases,
  propPlaceholderTestCases,
  propReadonlyTestCases,
  propRequiredTestCases,
  propSizeTestCases,
  propValueTestCases,
} from './cases/props'
import { slotAnnotationTestCases, slotListTestCases } from './cases/slots'

describe(
  'Vue/YAutocompleteField',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreAutocompleteField,
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
                YAutocompleteField,
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
          ...propReadonlyTestCases,
          ...propSearchFunctionTestCases,
          ...propRequiredTestCases,
          ...propSizeTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YAutocompleteField,
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
                YAutocompleteField,
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
                YAutocompleteField,
                { props: { value: '' } },
              )

              const coreAutocompleteField = wrapper.find(tagName)

              coreAutocompleteField.trigger(eventName, payload ? { detail: payload } : undefined)

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
