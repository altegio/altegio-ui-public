import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { YCoreRadioButtonGroupTagName as tagName } from '~shared/constants'
import { YCoreRadioButtonGroup } from '~core/ui/radioButtonGroup'
import { YRadioButtonGroup } from '~vue/ui/radioButtonGroup'
import {
  propSizeTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propDirectionTestCases,
} from './cases/props'

describe(
  'Vue/YRadioButtonGroup',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreRadioButtonGroup,
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
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const checked = ref(false)
              const wrapper = mount(
                YRadioButtonGroup,
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
          'Должен вызывать событие "update:modelValue" при событии change core компонента',
          async() => {
            const wrapper = mount(
              YRadioButtonGroup,
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
