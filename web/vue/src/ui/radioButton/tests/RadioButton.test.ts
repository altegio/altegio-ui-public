import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { YCoreRadioButtonTagName as tagName } from '~shared/constants'
import { YCoreRadioButton } from '~core/ui/radioButton'
import { YRadioButton } from '~vue/ui/radioButton'
import {
  propRequiredTestCases,
  propSizeTestCases,
  propDisabledTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propAnnotationTextTestCases,
  propLabelOverflowDebounceTestCases,
  propAlignmentTestCases,
  propErrorsTestCases,
} from './cases/props'
import { slotLabelTestCases, slotAnnotationTestCases } from './cases/slots'

describe(
  'Vue/YRadioButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreRadioButton,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propRequiredTestCases,
          ...propSizeTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propAnnotationTextTestCases,
          ...propLabelOverflowDebounceTestCases,
          ...propAlignmentTestCases,
          ...propErrorsTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const checked = ref(false)
              const wrapper = mount(
                YRadioButton,
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
      'Slots',
      () => {
        for (const testCase of [
          ...slotLabelTestCases,
          ...slotAnnotationTestCases,
        ]) {
          it(
            `Slot "${testCase.slot}" должен быть ${testCase.case}`,
            () => {
              const wrapper = mount(
                YRadioButton,
                { props: { modelValue: false }, slots: { [testCase.slot]: testCase.content } },
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
        it(
          'Должен вызывать событие "update:modelValue" при изменении состояния чекбокса',
          async() => {
            const wrapper = mount(
              YRadioButton,
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
