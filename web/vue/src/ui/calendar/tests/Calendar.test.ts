import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreCalendarTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import { AltCalendar } from '~vue/ui/calendar'
import type { IAltVueCalendarProps } from '~vue/ui/calendar/models/types'
import { AltCoreCalendar } from '~core/ui/calendar'

const tagName = AltCoreCalendarTagName

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IAltVueCalendarProps, 'disabled'>[] = [
  { prop: 'disabled', case: '', value: true, expected: true },
  { prop: 'disabled', case: '', value: false, expected: false },
  { prop: 'disabled', case: '', value: undefined, expected: false },
]
const propHeaderSelectorsTestCases: TPropTestCase<IAltVueCalendarProps, 'headerSelectors'>[] = [
  { prop: 'headerSelectors', case: '', value: true, expected: true },
  { prop: 'headerSelectors', case: '', value: false, expected: false },
  { prop: 'headerSelectors', case: '', value: undefined, expected: true },
]
const propMinDateTestCases: TPropTestCase<IAltVueCalendarProps, 'minDate'>[] = [
  { prop: 'minDate', case: '', value: text, expected: text },
  { prop: 'minDate', case: '', value: empty, expected: empty },
  { prop: 'minDate', case: '', value: undefined, expected: undefined },
]
const propMaxDateTestCases: TPropTestCase<IAltVueCalendarProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: '', value: text, expected: text },
  { prop: 'maxDate', case: '', value: empty, expected: empty },
  { prop: 'maxDate', case: '', value: undefined, expected: undefined },
]
const isRange: TPropTestCase<IAltVueCalendarProps, 'isRange'>[] = [
  { prop: 'isRange', case: '', value: true, expected: true },
  { prop: 'isRange', case: '', value: false, expected: false },
  { prop: 'isRange', case: '', value: undefined, expected: false },
]
const propModelValueTestCases: TPropTestCase<IAltVueCalendarProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: '', value: text, expected: text },
  { prop: 'modelValue', case: '', value: empty, expected: empty },
  { prop: 'modelValue', case: '', value: undefined, expected: undefined },
]

describe(
  'Vue/AltCalendar',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreCalendar,
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
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                () => {
                  const wrapper = mount(
                    AltCalendar,
                    { props: { [testCase.prop]: testCase.value, modelValue: undefined } },
                  )

                  const coreElement = wrapper.find(tagName).element as AltCoreCalendar

                  expect(coreElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propModelValueTestCases) {
              it(
                `Prop "${testCase.prop}" should set date on the core component`,
                () => {
                  const wrapper = mount(
                    AltCalendar,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as AltCoreCalendar

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
              'Should emit "update:modelValue" on day cell click',
              async() => {
                const wrapper = mount(
                  AltCalendar,
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
