import type { ILocale } from '../types'

export const en: ILocale = {
  name: 'English',
  code: 'en-US',
  shortCode: 'en',
  dir: 'ltr',
  messages: {
    cancel: 'Cancel',
    good: 'Good',
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
    firstDayOfWeek: 0, // Воскресенье
  },
}
