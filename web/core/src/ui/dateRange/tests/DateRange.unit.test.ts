import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import {
  AltCoreDateRangeTagName as tagName,
  AltCoreDatePickerTagName,
  AltCoreFieldInputTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getShadowElement, sleep } from '~shared/tests/utils'

import '~core/ui/dateRange'

import {
  createCoreDateRangeProps,
  DATE_RANGE_PLACEHOLDER,
  type DateRangeChangeEvent,
} from '~core/ui/dateRange/models/types'
import type { AltCoreDatePicker } from '~core/ui/datePicker'
import type { AltCoreFieldInput } from '~core/ui/fieldInput'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreDateRangeProps(),
)

const getPicker = () => getShadowElement(component, AltCoreDatePickerTagName) as AltCoreDatePicker

const getInputElement = () => {
  const fieldInput = getShadowElement(getPicker(), AltCoreFieldInputTagName) as AltCoreFieldInput | null

  if (!fieldInput?.inputElement) throw new Error('inputElement not found')

  return fieldInput.inputElement
}

const listenToChange = () => {
  const handleChange = vi.fn((event: Event) => (event as DateRangeChangeEvent).detail)
  component.addEventListener('change', handleChange)

  return {
    handleChange,
    stop: () => {
      component.removeEventListener('change', handleChange)
    },
  }
}

describe(
  'Core/AltCoreDateRange/Unit',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    it(
      'Should render a date picker in range mode with the range placeholder',
      () => {
        const picker = getPicker()

        expect(picker.isRange).toBe(true)
        expect(picker.placeholder).toBe(DATE_RANGE_PLACEHOLDER)
      },
    )

    describe(
      'Props',
      () => {
        it(
          'Props "from" and "to" should set the picker range',
          async() => {
            await updateComponent({ props: { from: '2025-07-08', to: '2025-07-09' } })

            expect(getPicker().date).toEqual(['2025-07-08', '2025-07-09'])
          },
        )

        it(
          'An incomplete range should leave the picker empty',
          async() => {
            await updateComponent({ props: { from: '2025-07-08', to: undefined } })

            expect(getPicker().date).toBe('')
          },
        )

        it(
          'Other props should not reset the picker range',
          async() => {
            await updateComponent({ props: { from: '2025-07-08', to: '2025-07-09' } })

            const date = getPicker().date

            await updateComponent({ props: { from: '2025-07-08', to: '2025-07-09', labelText: 'Period' } })

            expect(getPicker().date).toBe(date)
          },
        )

        it(
          'Should forward the field props to the picker',
          async() => {
            await updateComponent({
              props: {
                labelText: 'Period',
                annotationText: 'Hint',
                placeholder: 'Pick a period',
                required: true,
                disabled: true,
                readonly: true,
                error: true,
                errors: ['Error'],
                minDate: '2025-01-01',
                maxDate: '2025-12-31',
                name: 'period',
              },
            })

            const picker = getPicker()

            expect(picker.labelText).toBe('Period')
            expect(picker.annotationText).toBe('Hint')
            expect(picker.placeholder).toBe('Pick a period')
            expect(picker.required).toBe(true)
            expect(picker.disabled).toBe(true)
            expect(picker.readonly).toBe(true)
            expect(picker.error).toBe(true)
            expect(picker.errors).toEqual(['Error'])
            expect(picker.minDate).toBe('2025-01-01')
            expect(picker.maxDate).toBe('2025-12-31')
            expect(picker.name).toBe('period')
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'A typed range should emit "change" with ISO dates',
          async() => {
            const { handleChange, stop } = listenToChange()
            const inputElement = getInputElement()

            inputElement.value = '08.07.2025 - 09.07.2025'
            inputElement.dispatchEvent(new Event('input'))

            await sleep(0)
            stop()

            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(handleChange.mock.results[0]?.value).toEqual({ from: '2025-07-08', to: '2025-07-09' })
          },
        )

        it(
          'A reversed typed range should be ordered',
          async() => {
            const { handleChange, stop } = listenToChange()
            const inputElement = getInputElement()

            inputElement.value = '09.07.2025 - 08.07.2025'
            inputElement.dispatchEvent(new Event('input'))

            await sleep(0)
            stop()

            expect(handleChange.mock.results[0]?.value).toEqual({ from: '2025-07-08', to: '2025-07-09' })
          },
        )

        it(
          'A range picked in the calendar should emit "change" with ISO dates',
          () => {
            const { handleChange, stop } = listenToChange()

            getPicker().dispatchEvent(new CustomEvent('pick', { detail: { value: ['2025-07-08', '2025-07-09'] } }))

            stop()

            expect(handleChange.mock.results[0]?.value).toEqual({ from: '2025-07-08', to: '2025-07-09' })
          },
        )

        it(
          'Clearing the field should emit "change" with null dates',
          () => {
            const { handleChange, stop } = listenToChange()

            getPicker().dispatchEvent(new CustomEvent('pick', { detail: { value: '' } }))

            stop()

            expect(handleChange.mock.results[0]?.value).toEqual({ from: null, to: null })
          },
        )

        it(
          'The inner "pick" event should not leave the component',
          () => {
            const handlePick = vi.fn()
            component.addEventListener('pick', handlePick)

            getPicker().dispatchEvent(new CustomEvent('pick', { detail: { value: '' }, bubbles: true, composed: true }))

            component.removeEventListener('pick', handlePick)

            expect(handlePick).not.toHaveBeenCalled()
          },
        )
      },
    )
  },
)
