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
  { prop: 'modelValue', case: 'enabled', value: true, expected: true },
  { prop: 'modelValue', case: 'disabled', value: false, expected: false },
  { prop: 'modelValue', case: 'undefined', value: undefined, expected: false },
]
const propDisabledTestCases: TPropTestCase<IYVueToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: true, expected: true },
  { prop: 'disabled', case: 'disabled', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]
const propLabelTextTestCases: TPropTestCase<IYVueToggleProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]
const propLabelTooltipTextTestCases: TPropTestCase<IYVueToggleProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]
const propAnnotationTextTestCases: TPropTestCase<IYVueToggleProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with content', value: text, expected: text },
  { prop: 'annotationText', case: 'without content', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]
const propLabelOverflowDebounceCases: TPropTestCase<IYVueToggleProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'with a delay', value: 200, expected: 200 },
  { prop: 'labelOverflowDebounce', case: 'without a delay', value: undefined, expected: 300 },
]
const propAlignmentCases: TPropTestCase<IYVueToggleProps, 'alignment'>[] = [
  { prop: 'alignment', case: 'center alignment', value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'top alignment', value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: 'without alignment', value: undefined, expected: EYCoreLabelAlignment.CENTER },
]
const propSizeCases: TPropTestCase<IYVueToggleProps, 'size'>[] = [
  { prop: 'size', case: 'size M', value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'size S', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'size not set', value: undefined, expected: EYSizes.SMALL },
]

const slotLabelTestCases: TSlotTestCase[] = [
  { slot: 'label', case: 'with content', content: text },
  { slot: 'label', case: 'without content', content: empty },
]
const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'annotation', case: 'with content', content: text },
  { slot: 'annotation', case: 'without content', content: empty },
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
                `Prop ${testCase.prop} should be ${testCase.case} and have value ${testCase.value}`,
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
                `Prop ${testCase.prop} should be ${testCase.case} and have value ${testCase.value}`,
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
              'Should emit "update:modelValue" on click',
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
                `The component should contain slot ${testCase.slot} ${testCase.case}`,
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
