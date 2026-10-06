import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreCalendarTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import { YCalendar } from '~vue/ui/calendar'
import type { IYVueCalendarProps } from '~vue/ui/calendar/models/types'
import { YCoreCalendar } from '~core/ui/calendar'

const tagName = YCoreCalendarTagName

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IYVueCalendarProps, 'disabled'>[] = [
  { prop: 'disabled', case: '', value: true, expected: true },
  { prop: 'disabled', case: '', value: false, expected: false },
  { prop: 'disabled', case: '', value: undefined, expected: false },
]
const propHeaderSelectorsTestCases: TPropTestCase<IYVueCalendarProps, 'headerSelectors'>[] = [
  { prop: 'headerSelectors', case: '', value: true, expected: true },
  { prop: 'headerSelectors', case: '', value: false, expected: false },
  { prop: 'headerSelectors', case: '', value: undefined, expected: true },
]
const propMinDateTestCases: TPropTestCase<IYVueCalendarProps, 'minDate'>[] = [
  { prop: 'minDate', case: '', value: text, expected: text },
  { prop: 'minDate', case: '', value: empty, expected: empty },
  { prop: 'minDate', case: '', value: undefined, expected: undefined },
]
const propMaxDateTestCases: TPropTestCase<IYVueCalendarProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: '', value: text, expected: text },
  { prop: 'maxDate', case: '', value: empty, expected: empty },
  { prop: 'maxDate', case: '', value: undefined, expected: undefined },
]
const isRange: TPropTestCase<IYVueCalendarProps, 'isRange'>[] = [
  { prop: 'isRange', case: '', value: true, expected: true },
  { prop: 'isRange', case: '', value: false, expected: false },
  { prop: 'isRange', case: '', value: undefined, expected: false },
]
const propModelValueTestCases: TPropTestCase<IYVueCalendarProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: '', value: text, expected: text },
  { prop: 'modelValue', case: '', value: empty, expected: empty },
  { prop: 'modelValue', case: '', value: undefined, expected: undefined },
]

describe(
  'Vue/YCalendar',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCalendar,
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
              ...propDisabledTestCases,
              ...propHeaderSelectorsTestCases,
              ...propMinDateTestCases,
              ...propMaxDateTestCases,
              ...isRange,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                () => {
                  const wrapper = mount(
                    YCalendar,
                    { props: { [testCase.prop]: testCase.value, modelValue: undefined } },
                  )

                  const coreElement = wrapper.find(tagName).element as YCoreCalendar

                  expect(coreElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propModelValueTestCases) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство date у core компонента`,
                () => {
                  const wrapper = mount(
                    YCalendar,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as YCoreCalendar

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
              'Должен вызывать событие "update:modelValue" при клике на ячейку дня',
              async() => {
                const wrapper = mount(
                  YCalendar,
                  { props: { modelValue: '' } },
                )

                const coreCalendar = wrapper.find(tagName)

                coreCalendar.trigger(
                  'select',
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
