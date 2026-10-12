import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { text, empty } from '~shared/tests/slotContents'
import { YCoreToggle } from '~core/index'
import { YCoreToggleTagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'
import { EYSizes } from '~shared/types/global'
import { YToggle } from '~vue/ui/toggle'
import type { IYVueToggleProps } from '~vue/ui/toggle/models/types'

// Unit test cases:
const propCheckedTestCases: TPropTestCase<IYVueToggleProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'включен', value: true, expected: true },
  { prop: 'modelValue', case: 'выключен', value: false, expected: false },
  { prop: 'modelValue', case: 'undefined', value: undefined, expected: false },
]
const propDisabledTestCases: TPropTestCase<IYVueToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'включен', value: true, expected: true },
  { prop: 'disabled', case: 'выключен', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]
const propLabelTextTestCases: TPropTestCase<IYVueToggleProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelText', case: 'без контента', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]
const propLabelTooltipTextTestCases: TPropTestCase<IYVueToggleProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'без контента', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]
const propAnnotationTextTestCases: TPropTestCase<IYVueToggleProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'с контентом', value: text, expected: text },
  { prop: 'annotationText', case: 'без контента', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]
const propLabelOverflowDebounceCases: TPropTestCase<IYVueToggleProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'с задержкой', value: 200, expected: 200 },
  { prop: 'labelOverflowDebounce', case: 'без задержки', value: undefined, expected: 300 },
]
const propAlignmentCases: TPropTestCase<IYVueToggleProps, 'alignment'>[] = [
  { prop: 'alignment', case: 'выравнивание по центру', value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'выравнивание по верху', value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: 'без выравнивания', value: undefined, expected: EYCoreLabelAlignment.CENTER },
]
const propSizeCases: TPropTestCase<IYVueToggleProps, 'size'>[] = [
  { prop: 'size', case: 'размер M', value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'размер S', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'размер не указан', value: undefined, expected: EYSizes.SMALL },
]

const slotLabelTestCases: TSlotTestCase[] = [
  { slot: 'label', case: 'с контентом', content: text },
  { slot: 'label', case: 'без контента', content: empty },
]
const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'annotation', case: 'с контентом', content: text },
  { slot: 'annotation', case: 'без контента', content: empty },
]

describe(
  'Vue/YToggle',
  () => {
    beforeAll(() => {
      if (!customElements.get(YCoreToggleTagName)) {
        customElements.define(
          YCoreToggleTagName,
          YCoreToggle,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propAlignmentCases,
              ...propAnnotationTextTestCases,
              ...propDisabledTestCases,
              ...propLabelOverflowDebounceCases,
              ...propLabelTextTestCases,
              ...propLabelTooltipTextTestCases,
              ...propSizeCases,
            ]) {
              it(
                `Prop ${testCase.prop} должен быть ${testCase.case} и иметь значение ${testCase.value}`,
                () => {
                  const wrapper = mount(
                    YToggle,
                    {
                      props: {
                        [testCase.prop]: testCase.value,
                        modelValue: false,
                      },
                    },
                  )

                  const coreElement = wrapper.find(YCoreToggleTagName)

                  expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propCheckedTestCases) {
              it(
                `Prop ${testCase.prop} должен быть ${testCase.case} и иметь значение ${testCase.value}`,
                () => {
                  const wrapper = mount(
                    YToggle,
                    { props: { modelValue: testCase.value } },
                  )

                  const coreElement = wrapper.find(YCoreToggleTagName)

                  expect(coreElement.element.checked).toBe(testCase.expected)
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            it.skip(
              'Должен вызывать событие "update:modelValue" при клике',
              async() => {
                const wrapper = mount(
                  YToggle,
                  { props: { modelValue: false } },
                )

                const coreElement = wrapper.find(YCoreToggleTagName)

                await coreElement.trigger('click')

                await wrapper.vm.$nextTick()

                expect(wrapper.emitted()).toHaveProperty('update:modelValue')
              },
            )
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
                `Компонент должен содержать слот ${testCase.slot} со значением ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YToggle,
                    { slots: { [testCase.slot]: testCase.content } },
                  )
                  const slotContent = wrapper.find(`${YCoreToggleTagName} [slot="${testCase.slot}"]`)

                  expect(slotContent.exists()).toBe(true)
                  expect(slotContent.text()).toBe(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)
