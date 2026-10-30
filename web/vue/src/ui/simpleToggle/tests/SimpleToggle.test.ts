import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { AltCoreSimpleToggleTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { AltCoreSimpleToggle } from '~core/index'
import { createVueSimpleToggleProps, type IAltVueSimpleToggleProps } from '~vue/ui/simpleToggle/models/types'
import { AltSimpleToggle } from '~vue/ui/simpleToggle'

const {
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
} = createVueSimpleToggleProps()

const propSizeTestCases: TPropTestCase<IAltVueSimpleToggleProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propDisabledTestCases: TPropTestCase<IAltVueSimpleToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propHoveredTestCases: TPropTestCase<IAltVueSimpleToggleProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

describe(
  'Vue/AltSimpleToggle',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreSimpleToggle,
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
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const modelValue = ref(false)
              const wrapper = mount(
                AltSimpleToggle,
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
          'Should emit "update:modelValue" when the toggle state changes',
          async() => {
            const wrapper = mount(
              AltSimpleToggle,
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
