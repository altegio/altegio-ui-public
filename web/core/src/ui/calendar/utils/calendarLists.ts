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
 * Получить список годов в заданном диапазоне
 * @param minDate Минимальная дата
 * @param maxDate Максимальная дата
 */
export const getYearsList = (minDate = '', maxDate = ''): IDropdownListItem[] => {
  const minYear = minDate ? parseDate(minDate).year() : getDefaultMinDate().year()
  const maxYear = maxDate ? parseDate(maxDate).year() : getDefaultMaxDate().year()

  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i).map((year) => ({
    id: year.toString(),
    label: year,
  }))
}

export const getPrevMonthDays = (currentDate: Dayjs) => {
  const lastDay = currentDate.startOf('month').subtract(1, 'day')
    .day()
  const lastDate = currentDate.startOf('month').subtract(1, 'day')
    .date()

  return Array.from({ length: lastDay }, (_, i) => lastDate - lastDay + i + 1)
}

export const getNextMonthDays = (currentDate: Dayjs) => {
  const lastDay = currentDate.endOf('month').day()
  return Array.from({ length: 7 - lastDay }, (_, i) => i + 1)
}

export const getCurrentMonthDays = (currentDate: Dayjs) => {
  const lastDate = currentDate.endOf('month').date()
  return Array.from({ length: lastDate }, (_, i) => i + 1)
}
