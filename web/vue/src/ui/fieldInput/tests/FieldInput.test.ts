import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreFieldInputTagName as tagName } from '~shared/constants'

import YFieldInput from '~vue/ui/fieldInput/FieldInput.vue'
import { YCoreFieldInput } from '~core/ui/fieldInput'
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
  'Vue/YFieldInput',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreFieldInput,
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
                `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство value у core компонента на "${String(testCase.expected)}"`,
                () => {
                  const wrapper = mount(
                    YFieldInput,
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
                `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
                () => {
                  const wrapper = mount(
                    YFieldInput,
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
                `Должен вызывать событие "${emitEventName}" ${eventCase}`,
                () => {
                  const wrapper = mount(
                    YFieldInput,
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
