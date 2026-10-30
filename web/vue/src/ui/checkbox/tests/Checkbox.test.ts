import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { text, empty, number } from '~shared/tests/slotContents'
import { AltCoreCheckboxTagName as tagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { AltCoreCheckbox } from '~core/ui/checkbox'
import { AltCheckbox } from '~vue/ui/checkbox'
import type { IAltVueCheckboxProps } from '~vue/ui/checkbox/models/types'
import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'

const propIndeterminateTestCases: TPropTestCase<IAltVueCheckboxProps, 'indeterminate'>[] = [
  { prop: 'indeterminate', case: 'true', value: true, expected: true },
  { prop: 'indeterminate', case: 'false', value: false, expected: false },
  { prop: 'indeterminate', case: 'undefined', value: undefined, expected: false },
]

const propRequiredTestCases: TPropTestCase<IAltVueCheckboxProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: false },
]

const propSizeTestCases: TPropTestCase<IAltVueCheckboxProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EAltSizes.SMALL },
]

const propDisabledTestCases: TPropTestCase<IAltVueCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]

const propLabelTextTestCases: TPropTestCase<IAltVueCheckboxProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'text', value: text, expected: text },
  { prop: 'labelText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelTooltipTextTestCases: TPropTestCase<IAltVueCheckboxProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]

const propAnnotationTextTestCases: TPropTestCase<IAltVueCheckboxProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'text', value: text, expected: text },
  { prop: 'annotationText', case: 'empty string', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelOverflowDebounceTestCases: TPropTestCase<IAltVueCheckboxProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'text', value: Number(number), expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: 300 },
]

const propAlignmentTestCases: TPropTestCase<IAltVueCheckboxProps, 'alignment'>[] = [
  { prop: 'alignment', case: EAltCoreLabelAlignment.TOP, value: EAltCoreLabelAlignment.TOP, expected: EAltCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EAltCoreLabelAlignment.CENTER, value: EAltCoreLabelAlignment.CENTER, expected: EAltCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: EAltCoreLabelAlignment.CENTER },
]

const propErrorsTestCases: TPropTestCase<IAltVueCheckboxProps, 'errors'>[] = [
  { prop: 'errors', case: 'array with errors', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'empty array', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: undefined },
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
  'Vue/AltCheckbox',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreCheckbox,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propIndeterminateTestCases,
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
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const checked = ref(false)
              const wrapper = mount(
                AltCheckbox,
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
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            () => {
              const wrapper = mount(
                AltCheckbox,
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
        it.skip(
          'Should emit "update:modelValue" when the checkbox state changes',
          async() => {
            const wrapper = mount(
              AltCheckbox,
              { props: { modelValue: false } },
            )

            const coreCheckbox = wrapper.find(tagName)

            await coreCheckbox.trigger('click')

            await wrapper.vm.$nextTick()

            expect(wrapper.emitted()).toHaveProperty('update:modelValue')
          },
        )
      },
    )
  },
)
