import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { text, empty } from '~shared/tests/slotContents'
import { AltCoreToggle } from '~core/index'
import { AltCoreToggleTagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'
import { EAltSizes } from '~shared/types/global'
import { AltToggle } from '~vue/ui/toggle'
import type { IAltVueToggleProps } from '~vue/ui/toggle/models/types'

// Unit test cases:
const propCheckedTestCases: TPropTestCase<IAltVueToggleProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'enabled', value: true, expected: true },
  { prop: 'modelValue', case: 'disabled', value: false, expected: false },
  { prop: 'modelValue', case: 'undefined', value: undefined, expected: false },
]
const propDisabledTestCases: TPropTestCase<IAltVueToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: true, expected: true },
  { prop: 'disabled', case: 'disabled', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]
const propLabelTextTestCases: TPropTestCase<IAltVueToggleProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]
const propLabelTooltipTextTestCases: TPropTestCase<IAltVueToggleProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]
const propAnnotationTextTestCases: TPropTestCase<IAltVueToggleProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with content', value: text, expected: text },
  { prop: 'annotationText', case: 'without content', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]
const propLabelOverflowDebounceCases: TPropTestCase<IAltVueToggleProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'with a delay', value: 200, expected: 200 },
  { prop: 'labelOverflowDebounce', case: 'without a delay', value: undefined, expected: 300 },
]
const propAlignmentCases: TPropTestCase<IAltVueToggleProps, 'alignment'>[] = [
  { prop: 'alignment', case: 'center alignment', value: EAltCoreLabelAlignment.CENTER, expected: EAltCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'top alignment', value: EAltCoreLabelAlignment.TOP, expected: EAltCoreLabelAlignment.TOP },
  { prop: 'alignment', case: 'without alignment', value: undefined, expected: EAltCoreLabelAlignment.CENTER },
]
const propSizeCases: TPropTestCase<IAltVueToggleProps, 'size'>[] = [
  { prop: 'size', case: 'size M', value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'size S', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'size not set', value: undefined, expected: EAltSizes.SMALL },
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
  'Vue/AltToggle',
  () => {
    beforeAll(() => {
      if (!customElements.get(AltCoreToggleTagName)) {
        customElements.define(
          AltCoreToggleTagName,
          AltCoreToggle,
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
                    AltToggle,
                    {
                      props: {
                        [testCase.prop]: testCase.value,
                        modelValue: false,
                      },
                    },
                  )

                  const coreElement = wrapper.find(AltCoreToggleTagName)

                  expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propCheckedTestCases) {
              it(
                `Prop ${testCase.prop} should be ${testCase.case} and have value ${testCase.value}`,
                () => {
                  const wrapper = mount(
                    AltToggle,
                    { props: { modelValue: testCase.value } },
                  )

                  const coreElement = wrapper.find(AltCoreToggleTagName)

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
                  AltToggle,
                  { props: { modelValue: false } },
                )

                const coreElement = wrapper.find(AltCoreToggleTagName)

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
                    AltToggle,
                    { slots: { [testCase.slot]: testCase.content } },
                  )
                  const slotContent = wrapper.find(`${AltCoreToggleTagName} [slot="${testCase.slot}"]`)

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
