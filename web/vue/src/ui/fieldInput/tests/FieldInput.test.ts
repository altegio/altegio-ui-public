import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreFieldInputTagName as tagName } from '~shared/constants'

import AltFieldInput from '~vue/ui/fieldInput/FieldInput.vue'
import { AltCoreFieldInput } from '~core/ui/fieldInput'
import {
  propAutocompleteTestCases,
  propAutofocusTestCases,
  propDisabledTestCases,
  propHideSpaceLeftTestCases, propHideSpaceRightTestCases,
  propMaxlengthTestCases,
  propNameTestCases,
  propPlaceholderTestCases,
  propReadonlyTestCases,
  propRequiredTestCases,
  propSizeTestCases,
  propTypeTestCases,
  propValueTestCases,
} from '~vue/ui/fieldInput/tests/cases/props'
import { vueInputEvents } from '~vue/ui/fieldInput/tests/cases/events'

describe(
  'Vue/AltFieldInput',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreFieldInput,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [...propValueTestCases]) {
              it(
                `Prop "${testCase.prop}" (${testCase.case}) should set value on the core component to "${String(testCase.expected)}"`,
                () => {
                  const wrapper = mount(
                    AltFieldInput,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName)

                  expect(coreElement.element.value).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [
              ...propDisabledTestCases,
              ...propReadonlyTestCases,
              ...propSizeTestCases,
              ...propNameTestCases,
              ...propPlaceholderTestCases,
              ...propAutofocusTestCases,
              ...propRequiredTestCases,
              ...propTypeTestCases,
              ...propMaxlengthTestCases,
              ...propHideSpaceLeftTestCases,
              ...propHideSpaceRightTestCases,
              ...propAutocompleteTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
                () => {
                  const wrapper = mount(
                    AltFieldInput,
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
          'Events',
          () => {
            for (const { emitEventName, eventName, payload, case: eventCase } of vueInputEvents) {
              it(
                `Should emit "${emitEventName}" ${eventCase}`,
                () => {
                  const wrapper = mount(
                    AltFieldInput,
                    { props: { value: '' } },
                  )

                  const coreFieldInput = wrapper.find(tagName)

                  coreFieldInput.trigger(eventName, payload ? { detail: payload } : undefined)

                  expect(wrapper.emitted()).toHaveProperty(emitEventName)
                  if (payload) {
                    expect(JSON.stringify(wrapper.emitted(emitEventName)?.[0][0])).toEqual(JSON.stringify(payload.value))
                  }
                },
              )
            }
          },
        )
      },
    )
  },
)
