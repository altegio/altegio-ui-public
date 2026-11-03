import type { ILocale } from '../types'

export const en: ILocale = {
  name: 'English',
  code: 'en-US',
  shortCode: 'en',
  dir: 'ltr',
  messages: {
    cancel: 'Cancel',
    close: 'Close',
    good: 'Good',
    of: 'of',
    pagination: 'Pagination',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    itemsPerPage: 'Items per page',
    scrollLeft: 'Scroll left',
    scrollRight: 'Scroll right',
    clear: 'Clear',
    increase: 'Increase',
    decrease: 'Decrease',
    countryCode: 'Country code',
    chooseDate: 'Choose date',
    move: 'Move',
    moveHint: 'Use the up and down arrow keys to change the order',
    moveAcrossHint: 'Use the up and down arrow keys to change the order and to move the item to the previous or next group',
    rating: 'Rating',
  },
  formatters: {
    date: {
      short: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      },
      medium: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
      long: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
      },
      monthYear: {
        month: 'long',
        year: 'numeric',
      },
      monthOnly: { month: 'long' },
      yearOnly: { year: 'numeric' },
      dayOfWeek: { weekday: 'short' },
      weekday: {
        narrow: { weekday: 'narrow' },
        short: { weekday: 'short' },
        long: { weekday: 'long' },
      },
      month: {
        numeric: { month: 'numeric' },
        narrow: { month: 'narrow' },
        short: { month: 'short' },
        long: { month: 'long' },
      },
    },
    number: {
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
      currency: {
        style: 'currency',
        currency: 'USD',
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    },
    firstDayOfWeek: 0, // Sunday
  },
}
