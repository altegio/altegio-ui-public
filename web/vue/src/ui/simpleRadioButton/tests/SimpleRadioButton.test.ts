import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { AltCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'
import { AltCoreSimpleRadioButton } from '~core/index'
import { propSizeTestCases, propDisabledTestCases, propHoveredTestCases, propErrorTestCases } from './cases/props'
import { AltSimpleRadioButton } from '~vue/ui/simpleRadioButton'

describe(
  'Vue/AltSimpleRadioButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreSimpleRadioButton,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propSizeTestCases,
          ...propDisabledTestCases,
          ...propHoveredTestCases,
          ...propErrorTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const checked = ref(false)
              const wrapper = mount(
                AltSimpleRadioButton,
                {
                  props: {
                    [testCase.prop]: testCase.value,
                    modelValue: checked.value,
                  },
                },
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
      'Events',
      () => {
        it(
          'Should emit "update:modelValue" when the checkbox state changes',
          async() => {
            const wrapper = mount(
              AltSimpleRadioButton,
              { props: { modelValue: false } },
            )

            const coreElement = wrapper.find(tagName)

            coreElement.trigger('checked', { detail: { checked: true } })

            await wrapper.vm.$nextTick()
            expect(wrapper.emitted()).toHaveProperty('update:modelValue')
          },
        )
      },
    )
  },
)
