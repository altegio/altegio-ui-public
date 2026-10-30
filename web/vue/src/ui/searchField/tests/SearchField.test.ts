import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreTextFieldTagName } from '~shared/constants'
import { AltCoreTextField } from '~core/index'
import { AltSearchField } from '~vue/ui/searchField'
// import type { IAltCoreFieldInputInputEvent } from '~core/ui/textField/models/types'

// import { eventsVueCases } from './cases/events'
import { propSizeTestCases, propDisabledTestCases, propLabelTextTestCases, propLabelTooltipTextTestCases, propLabelDebounceTestCases, propErrorsTestCases, propAutofocusTestCases, propErrorTestCases, propNameTestCases, propPlaceholderTestCases, propModelValueTestCases } from './cases/props'

describe(
  'Vue/AltSearchField',
  () => {
    beforeAll(() => {
      if (!customElements.get(AltCoreTextFieldTagName)) {
        customElements.define(
          AltCoreTextFieldTagName,
          AltCoreTextField,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [...propModelValueTestCases]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                AltSearchField,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(AltCoreTextFieldTagName)

              expect(coreElement.element.value).toBe(testCase.expected)
            },
          )
        }
        for (const testCase of [
          ...propNameTestCases,
          ...propPlaceholderTestCases,
          ...propAutofocusTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propLabelDebounceTestCases,
          ...propErrorTestCases,
          ...propErrorsTestCases,
          ...propSizeTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                AltSearchField,
                {
                  props: {
                    modelValue: '',
                    [testCase.prop]: testCase.value,
                  },
                },
              )

              const coreElement = wrapper.find(AltCoreTextFieldTagName)

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

    // TODO: Add event tests
    // describe(
    //   'Events',
    //   () => {
    //     for (const { emitName, event, payload, case: eventCase } of eventsVueCases) {
    //       it.skip(
    //         `Should emit "${emitName}" ${eventCase}`,
    //         () => {
    //           const wrapper = mount(
    //             AltSearchField,
    //             { props: { modelValue: '' } },
    //           )

    //           const coreInput = wrapper.find(tagName).element
    //           coreInput.dispatchEvent(event)

    //           expect(wrapper.emitted()).toHaveProperty(emitName)
    //           expect(JSON.stringify((wrapper.emitted(emitName)?.[0][0] as CustomEvent<IAltCoreFieldInputInputEvent>).detail)).toEqual(JSON.stringify(payload))
    //         },
    //       )

    //       it.skip(
    //         `Should not emit "${emitName}" ${eventCase} when the component is disabled`,
    //         () => {
    //           const wrapper = mount(
    //             AltSearchField,
    //             { props: { modelValue: '', disabled: true } },
    //           )

    //           const coreInput = wrapper.find(tagName).element
    //           coreInput.dispatchEvent(event)

    //           expect(wrapper.emitted()).not.toHaveProperty(emitName)
    //         },
    //       )
    //     }
    //   },
    // )
  },
)
