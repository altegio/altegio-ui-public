import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { AltCoreRadioButtonGroupTagName as tagName } from '~shared/constants'
import { AltCoreRadioButtonGroup } from '~core/ui/radioButtonGroup'
import { AltRadioButtonGroup } from '~vue/ui/radioButtonGroup'
import {
  propSizeTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propDirectionTestCases,
} from './cases/props'

describe(
  'Vue/AltRadioButtonGroup',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreRadioButtonGroup,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propSizeTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propDirectionTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const checked = ref(false)
              const wrapper = mount(
                AltRadioButtonGroup,
                {
                  props: {
                    [testCase.prop]: testCase.value,
                    modelValue: checked.value,
                  },
                },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should emit "update:modelValue" on the core component change event',
          async() => {
            const wrapper = mount(
              AltRadioButtonGroup,
              { props: { modelValue: false } },
            )

            const coreElement = wrapper.find(tagName)

            coreElement.trigger('change', { detail: { value: '' } })

            await wrapper.vm.$nextTick()
            expect(wrapper.emitted()).toHaveProperty('update:modelValue')
          },
        )
      },
    )
  },
)
