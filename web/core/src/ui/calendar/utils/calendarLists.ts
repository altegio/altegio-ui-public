import { capitalize } from 'radash'
import { type Dayjs } from 'dayjs'

import { parseDate, FORMAT_MONTH, FORMAT_WEEKDAY_SHORT, getDefaultMaxDate, getDefaultMinDate } from '~shared/utils/dateTime'
import type { IDropdownListItem } from '~shared/types/global'

export const getWeekDays = () => {
  return Array.from({ length: 7 }, (_, i) => parseDate().weekday(i)
    .format(FORMAT_WEEKDAY_SHORT))
}

export const getMonthList = (): IDropdownListItem[] => {
  return [...Array(12).keys()].map((key) => {
    return {
      id: key.toString(),
      label: capitalize(parseDate().month(key)
        .format(FORMAT_MONTH)),
    }
  })
}

/**
 * Returns the years within the given range
 * @param minDate Minimum date
 * @param maxDate Maximum date
 */
export const getYearsList = (minDate = '', maxDate = ''): IDropdownListItem[] => {
  const minYear = minDate ? parseDate(minDate).year() : getDefaultMinDate().year()
  const maxYear = maxDate ? parseDate(maxDate).year() : getDefaultMaxDate().year()

  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i).map((year) => ({
    id: year.toString(),
    label: year,
  }))
}

/**
 * Number of days of the previous month that fill the first week of the month
 * @param currentDate Date in the month
 * @param firstDayOfWeek First day of the week: 0 for Sunday, 1 for Monday
 */
const getLeadingDaysCount = (currentDate: Dayjs, firstDayOfWeek: number) => (currentDate.startOf('month').day() - firstDayOfWeek + 7) % 7

/**
 * Days of the previous month that fill the first week of the month
 * @param currentDate Date in the month
 * @param firstDayOfWeek First day of the week: 0 for Sunday, 1 for Monday
 */
export const getPrevMonthDays = (currentDate: Dayjs, firstDayOfWeek = 1) => {
  const count = getLeadingDaysCount(currentDate, firstDayOfWeek)
  const lastDate = currentDate.startOf('month').subtract(1, 'day')
    .date()

  return Array.from({ length: count }, (_, i) => lastDate - count + i + 1)
}

/**
 * Days of the next month that fill the last week of the month
 * @param currentDate Date in the month
 * @param firstDayOfWeek First day of the week: 0 for Sunday, 1 for Monday
 */
export const getNextMonthDays = (currentDate: Dayjs, firstDayOfWeek = 1) => {
  const filled = getLeadingDaysCount(currentDate, firstDayOfWeek) + currentDate.daysInMonth()

  return Array.from({ length: (7 - filled % 7) % 7 }, (_, i) => i + 1)
}

export const getCurrentMonthDays = (currentDate: Dayjs) => {
  const lastDate = currentDate.endOf('month').date()
  return Array.from({ length: lastDate }, (_, i) => i + 1)
}
