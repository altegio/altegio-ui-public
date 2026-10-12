import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { YCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'
import { YCoreSimpleRadioButton } from '~core/index'
import { propSizeTestCases, propDisabledTestCases, propHoveredTestCases, propErrorTestCases } from './cases/props'
import { YSimpleRadioButton } from '~vue/ui/simpleRadioButton'

describe(
  'Vue/YSimpleRadioButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreSimpleRadioButton,
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
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const checked = ref(false)
              const wrapper = mount(
                YSimpleRadioButton,
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
          'Должен вызывать событие "update:modelValue" при изменении состояния чекбокса',
          async() => {
            const wrapper = mount(
              YSimpleRadioButton,
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
