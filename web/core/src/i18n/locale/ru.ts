import type { ILocale } from '../types'

export const ru: ILocale = {
  name: 'Русский',
  code: 'ru-RU',
  shortCode: 'ru',
  dir: 'ltr',
  messages: {
    cancel: 'Отменить',
    good: 'Хорошо',
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
        currency: 'RUB',
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    },
    firstDayOfWeek: 1, // Понедельник
  },
}
