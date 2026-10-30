import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { capitalize } from 'radash'
import { type Dayjs } from 'dayjs'
import { formatDate, parseDate, FORMAT_MONTH, FORMAT_YEAR } from '~shared/utils/dateTime'
import { AltCoreCalendarTagName, AltCoreDropdownTagName, AltCoreButtonTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getShadowElement, getElementClasses } from '~shared/tests/utils'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createCoreCalendarProps,
  type IAltCoreCalendarProps,
} from '~core/ui/calendar/models/types'
import '~core/ui/calendar'
import type { AltCoreButton } from '~core/ui/button'
import { en } from '~core/i18n'

const tagName = AltCoreCalendarTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCalendarProps(),
)

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

const getDateMonthString = (date: Dayjs) => {
  return capitalize(formatDate(date, FORMAT_MONTH))
}

const dayCellSelector = `.${tagName}__day:not(.${tagName}__day_out-of-month)`
const disabledDayCellCssClass = `${tagName}__day_disabled`
const initialTestDate = '01-01-2021'
const initialTestDateRange: IAltCoreCalendarProps['date'] = [
  '01-01-2021',
  '02-01-2021',
]
const initialTestMinDate = '10-01-2021'
const initialTestMaxDate = '20-01-2021'

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IAltCoreCalendarProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'have', value: true },
  { prop: 'disabled', case: 'not have', value: false },
]
const propHeaderSelectorsTestCases: TPropTestCase<IAltCoreCalendarProps, 'headerSelectors'>[] = [
  { prop: 'headerSelectors', case: 'have', value: true },
  { prop: 'headerSelectors', case: 'not have', value: false },
]
const propDateTestCases: TPropTestCase<IAltCoreCalendarProps, 'date'>[] = [
  { prop: 'date', case: 'Should', value: initialTestDate },
  { prop: 'date', case: 'Should', value: initialTestDateRange },
  { prop: 'date', case: 'Should not', value: undefined },
]
const propMinDateTestCases: TPropTestCase<IAltCoreCalendarProps, 'minDate'>[] = [
  { prop: 'minDate', case: 'should be disabled', value: initialTestMinDate },
  { prop: 'minDate', case: 'should not be disabled', value: undefined },
]
const propMaxDateTestCases: TPropTestCase<IAltCoreCalendarProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: 'should be disabled', value: initialTestMaxDate },
  { prop: 'maxDate', case: 'should not be disabled', value: undefined },
]

describe(
  'Core/AltCalendar',
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

    describe(
      'Props',
      () => {
        for (const testCase of propDisabledTestCases) {
          it(
            `Day cell should ${testCase.case} class ${disabledDayCellCssClass} when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const dayCell = getLocalShadowElement(dayCellSelector)
              const dayCellClasses = getElementClasses(dayCell)

              if (testCase.value) {
                expect(dayCellClasses).toContain(disabledDayCellCssClass)
              } else {
                expect(dayCellClasses).not.toContain(disabledDayCellCssClass)
              }
            },
          )
        }

        for (const testCase of propHeaderSelectorsTestCases) {
          it(
            `Should ${testCase.case} component ${AltCoreDropdownTagName} when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const dropdown = getLocalShadowElement(AltCoreDropdownTagName)

              if (testCase.value) {
                expect(dropdown).not.toBeNull()
              } else {
                expect(dropdown).toBeNull()
              }
            },
          )
        }

        for (const testCase of propDateTestCases) {
          it(
            `${testCase.case} set the month and year when prop ${testCase.prop} is ${String(testCase.value)}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const monthButton = getLocalShadowElement(`${AltCoreButtonTagName}.${tagName}__month-button`) as AltCoreButton | null
              const yearButton = getLocalShadowElement(`${AltCoreButtonTagName}.${tagName}__year-button`) as AltCoreButton | null

              let testCaseDate = parseDate()

              if (typeof testCase.value === 'string') {
                testCaseDate = parseDate(String(testCase.value))
              } else if (Array.isArray(testCase.value)) {
                testCaseDate = parseDate(testCase.value[0])
              }

              expect(monthButton?.label).toBe(getDateMonthString(testCaseDate))
              expect(yearButton?.label).toBe(formatDate(testCaseDate, FORMAT_YEAR))
            },
          )
        }

        for (const testCase of propMaxDateTestCases) {
          it(
            `Day cells ${testCase.case} after the given date when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value, date: testCase.value } })

              if (testCase.value) {
                const maxDateDay = parseDate(testCase.value).date()
                const maxDateDayCell = getLocalShadowElement(`${dayCellSelector}[data-value="${maxDateDay}"]`)

                const maxDateDayCellClasses = getElementClasses(maxDateDayCell)
                const nextCellClasses = getElementClasses(maxDateDayCell?.nextElementSibling)

                expect(maxDateDayCellClasses).not.toContain(disabledDayCellCssClass)
                expect(nextCellClasses).toContain(disabledDayCellCssClass)
              } else {
                const disabledDayCell = getLocalShadowElement(`.${disabledDayCellCssClass}`)
                expect(disabledDayCell).toBeNull()
              }
            },
          )
        }

        for (const testCase of propMinDateTestCases) {
          it(
            `Day cells ${testCase.case} before the given date when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value, date: testCase.value } })


              if (testCase.value) {
                const minDateDay = parseDate(testCase.value).date()
                const minDateDayCell = getLocalShadowElement(`${dayCellSelector}[data-value="${minDateDay}"]`)

                const minDateDayCellClasses = getElementClasses(minDateDayCell)
                const prevCellClasses = getElementClasses(minDateDayCell?.previousElementSibling)

                expect(minDateDayCellClasses).not.toContain(disabledDayCellCssClass)
                expect(prevCellClasses).toContain(disabledDayCellCssClass)
              } else {
                const disabledDayCell = getLocalShadowElement(`.${disabledDayCellCssClass}`)
                expect(disabledDayCell).toBeNull()
              }
            },
          )
        }

        it('Uses the page language locale, English here, by default', async() => {
          await updateComponent({ props: { date: '01-01-2025' } })

          const monthButton = getLocalShadowElement(`${AltCoreButtonTagName}.${tagName}__month-button`) as AltCoreButton | null

          const date = new Date()
          date.setMonth(0)

          const expectedMonth = date.toLocaleString(en.code, { month: 'long' })

          expect(monthButton?.label?.toLowerCase()).toContain(expectedMonth.toLowerCase())
        })
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should call the select handler on day cell click',
          async() => {
            const handleSelect = vi.fn()

            const dayCell = getLocalShadowElement(dayCellSelector)

            if (!dayCell) return

            component.addEventListener(
              'select',
              handleSelect,
            )

            await userEvent.click(dayCell)

            expect(handleSelect).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Should not call the select handler on day cell click when disabled is set',
          async() => {
            const handleSelect = vi.fn()

            const dayCell = getLocalShadowElement(dayCellSelector)

            if (!dayCell) return

            component.addEventListener(
              'select',
              handleSelect,
            )

            await updateComponent({ props: { disabled: true } })

            await userEvent.click(dayCell)

            expect(handleSelect).not.toHaveBeenCalled()
          },
        )

        it(
          'Should call the select handler with a [string, string] value on day cell click when isRange is set',
          async() => {
            const handleSelect = vi.fn()

            component.addEventListener(
              'select',
              handleSelect,
            )
            await updateComponent({ props: { isRange: true } })

            const dayCell = getLocalShadowElement(dayCellSelector)
            const secondDayCell = getLocalShadowElement(`${dayCellSelector} + ${dayCellSelector}`)

            if (!dayCell || !secondDayCell) return

            await userEvent.click(dayCell)
            await userEvent.click(secondDayCell)

            const eventValue = (handleSelect.mock.calls[0]?.[0] as CustomEvent<{ value: IAltCoreCalendarProps['date'] }>).detail.value

            expect(handleSelect).toHaveBeenCalledTimes(1)
            expect(Array.isArray(eventValue)).toBe(true)
            expect(typeof eventValue?.[0]).toBe('string')
            expect(typeof eventValue?.[1]).toBe('string')
          },
        )

        it(
          'Should call the select handler with a string value on day cell click when isRange is not set',
          async() => {
            const handleSelect = vi.fn()

            component.addEventListener(
              'select',
              handleSelect,
            )
            await updateComponent({ props: { isRange: false } })

            const dayCell = getLocalShadowElement(dayCellSelector)
            if (!dayCell) return

            await userEvent.click(dayCell)

            const eventValue = (handleSelect.mock.calls[0]?.[0] as CustomEvent<{ value: IAltCoreCalendarProps['date'] }>).detail.value

            expect(handleSelect).toHaveBeenCalledTimes(1)
            expect(typeof eventValue).toBe('string')
          },
        )
      },
    )
  },
)
