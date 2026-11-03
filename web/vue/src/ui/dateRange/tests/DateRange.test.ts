import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreDateRangeTagName as tagName } from '~shared/constants'
import { AltDateRange } from '~vue/ui/dateRange'
import type { IAltVueDateRangeProps } from '~vue/ui/dateRange/models/types'
import type { AltCoreDateRange } from '~core/ui/dateRange'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

type TPropKey = Exclude<keyof IAltVueDateRangeProps, 'modelValue'>

const propTestCases: TPropTestCase<Required<IAltVueDateRangeProps>, TPropKey>[] = [
  { prop: 'labelText', case: 'with text', value: 'Period' },
  { prop: 'annotationText', case: 'with text', value: 'Hint' },
  { prop: 'placeholder', case: 'with text', value: 'Pick a period' },
  { prop: 'name', case: 'with text', value: 'period' },
  { prop: 'required', case: 'true', value: true },
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'error', case: 'true', value: true },
  { prop: 'errors', case: 'with messages', value: ['Error'] },
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'minDate', case: 'a date', value: '2025-01-01' },
  { prop: 'maxDate', case: 'a date', value: '2025-12-31' },
]

describe(
  'Vue/AltDateRange',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        () => {
          const wrapper = mount(AltDateRange, { props: { [testCase.prop]: testCase.value } })

          const coreElement = wrapper.find(tagName).element as AltCoreDateRange

          expect(coreElement[testCase.prop]).toEqual(testCase.value)
        },
      )
    }

    it(
      'Prop "modelValue" should set "from" and "to"',
      () => {
        const wrapper = mount(AltDateRange, { props: { modelValue: { from: '2025-07-08', to: '2025-07-09' } } })

        const coreElement = wrapper.find(tagName).element as AltCoreDateRange

        expect(coreElement.from).toBe('2025-07-08')
        expect(coreElement.to).toBe('2025-07-09')
      },
    )

    it(
      'An empty "modelValue" should leave "from" and "to" unset',
      () => {
        const wrapper = mount(AltDateRange)

        const coreElement = wrapper.find(tagName).element as AltCoreDateRange

        expect(coreElement.from).toBeUndefined()
        expect(coreElement.to).toBeUndefined()
      },
    )

    it(
      'The core "change" event should emit "update:modelValue" once',
      () => {
        const wrapper = mount(AltDateRange)

        const detail = { from: '2025-07-08', to: '2025-07-09' }

        wrapper.find(tagName).element.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }))

        expect(wrapper.emitted('update:modelValue')).toEqual([[detail]])
      },
    )
  },
)
