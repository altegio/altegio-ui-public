import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { YCoreSimpleToggleTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { YCoreSimpleToggle } from '~core/index'
import { createVueSimpleToggleProps, type IYVueSimpleToggleProps } from '~vue/ui/simpleToggle/models/types'
import { YSimpleToggle } from '~vue/ui/simpleToggle'

const {
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
} = createVueSimpleToggleProps()

const propSizeTestCases: TPropTestCase<IYVueSimpleToggleProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propDisabledTestCases: TPropTestCase<IYVueSimpleToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propHoveredTestCases: TPropTestCase<IYVueSimpleToggleProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

describe(
  'Vue/YSimpleToggle',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreSimpleToggle,
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
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const modelValue = ref(false)
              const wrapper = mount(
                YSimpleToggle,
                {
                  props: {
                    [testCase.prop]: testCase.value,
                    modelValue: modelValue.value,
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
          'Должен вызывать событие "update:modelValue" при изменении состояния переключателя',
          async() => {
            const wrapper = mount(
              YSimpleToggle,
              { props: { modelValue: false } },
            )

            const coreToggle = wrapper.find(tagName)

            coreToggle.element.dispatchEvent(new CustomEvent(
              'checked',
              { detail: { checked: true } },
            ))

            await wrapper.vm.$nextTick()

            expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
          },
        )
      },
    )
  },
)
