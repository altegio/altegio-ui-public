import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { userEvent } from '@vitest/browser/context'
import { capitalize } from 'radash'
import { type Dayjs } from 'dayjs'
import { formatDate, parseDate, FORMAT_MONTH, FORMAT_YEAR } from '~shared/utils/dateTime'
import { YCoreCalendarTagName, YCoreDropdownTagName, YCoreButtonTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getShadowElement, getElementClasses } from '~shared/tests/utils'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createCoreCalendarProps,
  type IYCoreCalendarProps,
} from '~core/ui/calendar/models/types'
import '~core/ui/calendar'
import type { YCoreButton } from '~core/ui/button'
import { ru } from '~core/i18n'

const tagName = YCoreCalendarTagName

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
const initialTestDateRange: IYCoreCalendarProps['date'] = [
  '01-01-2021',
  '02-01-2021',
]
const initialTestMinDate = '10-01-2021'
const initialTestMaxDate = '20-01-2021'

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IYCoreCalendarProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'содержать', value: true },
  { prop: 'disabled', case: 'отсутствовать', value: false },
]
const propHeaderSelectorsTestCases: TPropTestCase<IYCoreCalendarProps, 'headerSelectors'>[] = [
  { prop: 'headerSelectors', case: 'содержать', value: true },
  { prop: 'headerSelectors', case: 'отсутствовать', value: false },
]
const propDateTestCases: TPropTestCase<IYCoreCalendarProps, 'date'>[] = [
  { prop: 'date', case: 'Должен', value: initialTestDate },
  { prop: 'date', case: 'Должен', value: initialTestDateRange },
  { prop: 'date', case: 'Не должен', value: undefined },
]
const propMinDateTestCases: TPropTestCase<IYCoreCalendarProps, 'minDate'>[] = [
  { prop: 'minDate', case: 'Должна быть доступна недоступна', value: initialTestMinDate },
  { prop: 'minDate', case: 'Не должна быть доступна недоступна', value: undefined },
]
const propMaxDateTestCases: TPropTestCase<IYCoreCalendarProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: 'Должна быть доступна недоступна', value: initialTestMaxDate },
  { prop: 'maxDate', case: 'Не должна быть доступна недоступна', value: undefined },
]

describe(
  'Core/YCalendar',
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
            `Ячейка дня должна ${testCase.case} класс ${disabledDayCellCssClass}, если prop ${testCase.prop} ${testCase.value}`,
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
            `Должен ${testCase.case} компонент ${YCoreDropdownTagName}, если prop ${testCase.prop} ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const dropdown = getLocalShadowElement(YCoreDropdownTagName)

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
            `${testCase.case} выставляться месяц и год, если prop ${testCase.prop} ${String(testCase.value)}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const monthButton = getLocalShadowElement(`${YCoreButtonTagName}.${tagName}__month-button`) as YCoreButton | null
              const yearButton = getLocalShadowElement(`${YCoreButtonTagName}.${tagName}__year-button`) as YCoreButton | null

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
            `Ячейка дня ${testCase.case} позже указанной даты, если prop ${testCase.prop} ${testCase.value}`,
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
            `Ячейка дня ${testCase.case} раньше указанной даты, если prop ${testCase.prop} ${testCase.value}`,
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

        it('Должен использовать русскую ru по умолчанию', async() => {
          await updateComponent({ props: { date: '01-01-2025' } })

          const monthButton = getLocalShadowElement(`${YCoreButtonTagName}.${tagName}__month-button`) as YCoreButton | null

          const date = new Date()
          date.setMonth(0)

          const expectedMonth = date.toLocaleString(ru.code, { month: 'long' })

          expect(monthButton?.label?.toLowerCase()).toContain(expectedMonth.toLowerCase())
        })
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Должен вызывать обработчик select при нажатии на ячейку дня',
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
          'Не должен вызывать обработчик select при нажатии на ячейку дня, если установлено свойство disabled',
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
          'Должен вызывать обработчик select при нажатии на ячейку дня c value [string, string], если установлено свойство isRange',
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

            const eventValue = (handleSelect.mock.calls[0]?.[0] as CustomEvent<{ value: IYCoreCalendarProps['date'] }>).detail.value

            expect(handleSelect).toHaveBeenCalledTimes(1)
            expect(Array.isArray(eventValue)).toBe(true)
            expect(typeof eventValue?.[0]).toBe('string')
            expect(typeof eventValue?.[1]).toBe('string')
          },
        )

        it(
          'Должен вызывать обработчик select при нажатии на ячейку дня c value string, если не установлено свойство isRange',
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

            const eventValue = (handleSelect.mock.calls[0]?.[0] as CustomEvent<{ value: IYCoreCalendarProps['date'] }>).detail.value

            expect(handleSelect).toHaveBeenCalledTimes(1)
            expect(typeof eventValue).toBe('string')
          },
        )
      },
    )
  },
)
