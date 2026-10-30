import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreDatePickerTagName } from '~shared/constants'

import { AltDatePicker } from '~vue/ui/datePicker'
import { AltCoreDatePicker } from '~core/ui/datePicker'

import {
  propModelValueCases,
  propNameCases,
  propPlaceholderCases,
  propDisabledCases,
  propReadonlyCases,
  propRequiredCases,
  propSizeTestCases,
  propLabelDebounceCases,
  propLabelTextCases,
  propLabelTooltipTextCases,
  propIsRangeCases,
  propMaxDateCases,
  propMinDateCases,
  propAnnotationTextCases,
  propCalendarHeaderSelectorsCases,
  propErrorsCases,
} from './cases/props'

const tagName = AltCoreDatePickerTagName

describe(
  'Vue/AltDatePicker',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreDatePicker,
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
                ...propNameCases,
                ...propPlaceholderCases,
                ...propDisabledCases,
                ...propReadonlyCases,
                ...propRequiredCases,
                ...propSizeTestCases,
                ...propLabelDebounceCases,
                ...propLabelTextCases,
                ...propLabelTooltipTextCases,
                ...propIsRangeCases,
                ...propMaxDateCases,
                ...propMinDateCases,
                ...propAnnotationTextCases,
                ...propCalendarHeaderSelectorsCases,
                ...propErrorsCases,
            ]) {
              it(
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                () => {
                  const wrapper = mount(
                    AltDatePicker,
                    { props: { [testCase.prop]: testCase.value, modelValue: undefined } },
                  )

                  const coreElement = wrapper.find(tagName).element as AltCoreDatePicker

                  if (Array.isArray(testCase.value)) {
                    expect(coreElement[testCase.prop]).toStrictEqual(testCase.expected)
                  } else {
                    expect(coreElement[testCase.prop]).toBe(testCase.expected)
                  }
                },
              )
            }

            for (const testCase of propModelValueCases) {
              it(
                `Prop "${testCase.prop}" should set date on the core component`,
                () => {
                  const wrapper = mount(
                    AltDatePicker,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as AltCoreDatePicker

                  expect(coreElement.date).toBe(testCase.expected)
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            it(
              'Should emit "update:modelValue" on date pick',
              async() => {
                const wrapper = mount(
                  AltDatePicker,
                  { props: { modelValue: '' } },
                )

                const coreElement = wrapper.find(tagName)

                coreElement.trigger(
                  'pick',
                  { detail: { value: ' ' } },
                )

                await wrapper.vm.$nextTick()
                expect(wrapper.emitted()).toHaveProperty('update:modelValue')
              },
            )
          },
        )
      },
    )
  },
)
