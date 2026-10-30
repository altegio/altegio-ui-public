import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { AltCoreSimpleCheckboxTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { AltCoreSimpleCheckbox } from '~core/index'
import { createVueSimpleCheckboxProps, type IAltVueSimpleCheckboxProps } from '~vue/ui/simpleCheckbox/models/types'
import { AltSimpleCheckbox } from '~vue/ui/simpleCheckbox'


const {
  indeterminate: defaultIndeterminate,
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
  error: defaultError,
} = createVueSimpleCheckboxProps()

const propIndeterminateTestCases: TPropTestCase<IAltVueSimpleCheckboxProps, 'indeterminate'>[] = [
  { prop: 'indeterminate', case: 'true', value: true, expected: true },
  { prop: 'indeterminate', case: 'false', value: false, expected: false },
  { prop: 'indeterminate', case: 'undefined', value: undefined, expected: defaultIndeterminate },
]

const propSizeTestCases: TPropTestCase<IAltVueSimpleCheckboxProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propDisabledTestCases: TPropTestCase<IAltVueSimpleCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propHoveredTestCases: TPropTestCase<IAltVueSimpleCheckboxProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false, ', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

const propErrorTestCases: TPropTestCase<IAltVueSimpleCheckboxProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: defaultError },
]


describe(
  'Vue/AltSimpleCheckbox',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreSimpleCheckbox,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propIndeterminateTestCases,
          ...propSizeTestCases,
          ...propDisabledTestCases,
          ...propHoveredTestCases,
          ...propErrorTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const checked = ref(false)
              const wrapper = mount(
                AltSimpleCheckbox,
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
        it.skip(
          'Should emit "update:modelValue" when the checkbox state changes',
          async() => {
            const wrapper = mount(
              AltSimpleCheckbox,
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
