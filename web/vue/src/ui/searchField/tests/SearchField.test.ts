import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreFieldIconTagName, AltCoreTextFieldTagName } from '~shared/constants'
import { AltCoreTextField } from '~core/index'
import { AltSearchField } from '~vue/ui/searchField'
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

    describe(
      'Events',
      () => {
        it(
          'Should emit "update:modelValue" with the value of the core input event',
          () => {
            const wrapper = mount(
              AltSearchField,
              { props: { modelValue: '' } },
            )

            wrapper.find(AltCoreTextFieldTagName).element.dispatchEvent(new CustomEvent(
              'input',
              { detail: { value: 'search' } },
            ))

            expect(wrapper.emitted('update:modelValue')).toEqual([['search']])
          },
        )

        for (const emitName of ['focus', 'blur', 'clear'] as const) {
          it(
            `Should re-emit the core "${emitName}" event`,
            () => {
              const wrapper = mount(
                AltSearchField,
                { props: { modelValue: '' } },
              )
              const event = new CustomEvent(emitName)

              wrapper.find(AltCoreTextFieldTagName).element.dispatchEvent(event)

              expect(wrapper.emitted(emitName)).toEqual([[event]])
            },
          )
        }

        it(
          'Should emit "click-search-icon" on search icon click',
          async() => {
            const wrapper = mount(
              AltSearchField,
              { props: { modelValue: '' } },
            )

            await wrapper.find(AltCoreFieldIconTagName).trigger('click')

            expect(wrapper.emitted('click-search-icon')).toHaveLength(1)
          },
        )
      },
    )
  },
)
