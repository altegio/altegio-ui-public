import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreMultipleSelectFieldTagName } from '~shared/constants'

import { AltCoreMultipleSelectField } from '~core/ui/multipleSelectField'
import {
  propAnnotationTextTestCases,
  propAutofocusTestCases,
  propDisabledTestCases,
  propErrorsTestCases, propErrorTestCases,
  propFilterCallbackTestCases,
  propIsCustomFilterTestCases,
  propIsFilterableTestCases, propIsMapOptionsTestCases,
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
} from '~vue/ui/multipleSelectField/tests/cases/props'
import { AltMultipleSelectField } from '~web/vue/src'
import {
  slotAnnotationTestCases, slotDropdownListBottomTestCases,
  slotDropdownListTopTestCases,
} from '~vue/ui/multipleSelectField/tests/cases/slots'
import { vueInputEvents } from '~vue/ui/multipleSelectField/tests/cases/events'

const tagName = AltCoreMultipleSelectFieldTagName

describe(
  'Vue/AltMultipleSelectField',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreMultipleSelectField,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [...propValueTestCases]) {
          it(
            `Prop "${testCase.prop}" "${testCase.case}" should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                AltMultipleSelectField,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element.value).toStrictEqual(testCase.expected)
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
          ...propLabelDebounceTestCases,
          ...propErrorTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                AltMultipleSelectField,
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
          ...slotAnnotationTestCases,
          ...slotDropdownListTopTestCases,
          ...slotDropdownListBottomTestCases,
        ]) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            () => {
              const wrapper = mount(
                AltMultipleSelectField,
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
            `Should emit "${emitEventName}" ${eventCase}`,
            () => {
              const wrapper = mount(
                AltMultipleSelectField,
                { props: { value: '' } },
              )

              const coreSelectField = wrapper.find(tagName)

              coreSelectField.trigger(eventName, payload ? { detail: payload } : undefined)

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
