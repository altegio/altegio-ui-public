import dayjs, { type Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isToday from 'dayjs/plugin/isToday'
import isBetween from 'dayjs/plugin/isBetween'
import weekday from 'dayjs/plugin/weekday'
import locale from 'dayjs/locale/ru'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(customParseFormat)
dayjs.extend(isToday)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.extend(weekday)
dayjs.locale(locale)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export const FORMAT_YEAR = 'YYYY'
export const FORMAT_MONTH = 'MMMM'
export const FORMAT_WEEKDAY_SHORT = 'dd'
export const FORMAT_DATE_DMY = 'DD.MM.YYYY'
export const FORMAT_DATE = 'YYYY-MM-DD'

export const getDefaultMinDate = () => dayjs('01.01.1900', FORMAT_DATE_DMY)
export const getDefaultMaxDate = () => dayjs().add(1, 'year').endOf('year')

export const parseDate = (date?: string | Date | Dayjs, format: string | string[] = [FORMAT_DATE_DMY, FORMAT_DATE]): Dayjs => {
  if (!date) return dayjs()

  return typeof date === 'string' ? dayjs(date, format) : dayjs(date)
}

export function formatDate(date: string | Date | Dayjs, format = FORMAT_DATE): string {
  return dayjs.isDayjs(date)
    ? date.format(format)
    : dayjs(date).format(format)
}
