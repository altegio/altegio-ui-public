import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreDatePickerTagName } from '~shared/constants'

import { YDatePicker } from '~vue/ui/datePicker'
import { YCoreDatePicker } from '~core/ui/datePicker'

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

const tagName = YCoreDatePickerTagName

describe(
  'Vue/YDatePicker',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreDatePicker,
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
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                () => {
                  const wrapper = mount(
                    YDatePicker,
                    { props: { [testCase.prop]: testCase.value, modelValue: undefined } },
                  )

                  const coreElement = wrapper.find(tagName).element as YCoreDatePicker

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
                `Prop "${testCase.prop}" должен изменить свойство date у core компонента`,
                () => {
                  const wrapper = mount(
                    YDatePicker,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as YCoreDatePicker

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
              'Должен вызывать событие "update:modelValue" при выборе даты',
              async() => {
                const wrapper = mount(
                  YDatePicker,
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
