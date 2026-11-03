import type { ILocale } from '../types'

export const ru: ILocale = {
  name: 'Русский',
  code: 'ru-RU',
  shortCode: 'ru',
  dir: 'ltr',
  messages: {
    cancel: 'Отменить',
    close: 'Закрыть',
    good: 'Хорошо',
    of: 'из',
    pagination: 'Пагинация',
    previousPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    previousMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    itemsPerPage: 'Записей на странице',
    scrollLeft: 'Прокрутить влево',
    scrollRight: 'Прокрутить вправо',
    clear: 'Очистить',
    increase: 'Увеличить',
    decrease: 'Уменьшить',
    countryCode: 'Код страны',
    chooseDate: 'Выберите дату',
    move: 'Переместить',
    moveHint: 'Порядок меняется стрелками вверх и вниз',
    moveAcrossHint: 'Стрелки вверх и вниз меняют порядок и переносят элемент в предыдущую или следующую группу',
    rating: 'Оценка',
    breadcrumb: 'Навигационная цепочка',
    steps: 'Шаги',
    stepDone: 'выполнен',
    stepError: 'ошибка',
    stepDisabled: 'недоступен',
    validationRequired: 'Заполните это поле',
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
    firstDayOfWeek: 1, // Monday
  },
}
