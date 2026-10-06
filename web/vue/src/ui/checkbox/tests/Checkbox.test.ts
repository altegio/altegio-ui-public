import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { text, empty, number } from '~shared/tests/slotContents'
import { YCoreCheckboxTagName as tagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { YCoreCheckbox } from '~core/ui/checkbox'
import { YCheckbox } from '~vue/ui/checkbox'
import type { IYVueCheckboxProps } from '~vue/ui/checkbox/models/types'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'

const propIndeterminateTestCases: TPropTestCase<IYVueCheckboxProps, 'indeterminate'>[] = [
  { prop: 'indeterminate', case: 'true', value: true, expected: true },
  { prop: 'indeterminate', case: 'false', value: false, expected: false },
  { prop: 'indeterminate', case: 'undefined', value: undefined, expected: false },
]

const propRequiredTestCases: TPropTestCase<IYVueCheckboxProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: false },
]

const propSizeTestCases: TPropTestCase<IYVueCheckboxProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EYSizes.SMALL },
]

const propDisabledTestCases: TPropTestCase<IYVueCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]

const propLabelTextTestCases: TPropTestCase<IYVueCheckboxProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelTooltipTextTestCases: TPropTestCase<IYVueCheckboxProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]

const propAnnotationTextTestCases: TPropTestCase<IYVueCheckboxProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'текст', value: text, expected: text },
  { prop: 'annotationText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelOverflowDebounceTestCases: TPropTestCase<IYVueCheckboxProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'текст', value: Number(number), expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: 300 },
]

const propAlignmentTestCases: TPropTestCase<IYVueCheckboxProps, 'alignment'>[] = [
  { prop: 'alignment', case: EYCoreLabelAlignment.TOP, value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EYCoreLabelAlignment.CENTER, value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: EYCoreLabelAlignment.CENTER },
]

const propErrorsTestCases: TPropTestCase<IYVueCheckboxProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: undefined },
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
  'Vue/YCheckbox',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCheckbox,
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
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const checked = ref(false)
              const wrapper = mount(
                YCheckbox,
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
                YCheckbox,
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
          'Должен вызывать событие "update:modelValue" при изменении состояния чекбокса',
          async() => {
            const wrapper = mount(
              YCheckbox,
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
