import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { fn } from '@storybook/test'
import type { StoryObj } from '@storybook/web-components'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'
import { ru, en } from '~core/i18n'

import type {
  IYCoreCalendarProps,
} from '~core/ui/calendar/models/types'
import type { TYCoreCalendarEvents } from '~core/ui/calendar/models/types/events'
import type { ILocale } from '~core/i18n'

// Импортируем компоненты
import '~core/ui/calendar'
import '~core/ui/globalProvider'

// Определяем тип для метаинформации историй
type TYCoreCalendarMeta = IYCoreCalendarProps & TYCoreCalendarEvents & { localeData: ILocale }
type Story = StoryObj<TYCoreCalendarMeta>

/**
 * Функция для создания шаблона календаря с плагином локализации
 */
const createCalendarTemplate = ({
  disabled,
  isRange,
  headerSelectors,
  minDate,
  maxDate,
  onSelect,
  localeData,
}: TYCoreCalendarMeta) => {
  // Создаем плагин локализации с выбранной локалью
  const i18nPlugin = new I18nPlugin(localeData)

  return html`
    <y-core-global-provider .plugins=${[i18nPlugin]}>
      <y-core-calendar
        .isRange=${isRange}
        .disabled=${disabled}
        .headerSelectors=${headerSelectors}
        min-date=${ifDefined(minDate)}
        max-date=${ifDefined(maxDate)}
        @select=${onSelect}
      ></y-core-calendar>
    </y-core-global-provider>
  `
}

/**
 * Пример календаря с русской локализацией
 */
export const RussianCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    localeData: ru,
    isRange: false,
    headerSelectors: true,
    disabled: false,
    minDate: undefined,
    maxDate: undefined,
    onSelect: fn(),
  },
  name: 'Русская локализация',
}

/**
 * Пример календаря с английской локализацией
 */
export const EnglishCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    ...RussianCalendar.args,
    localeData: en,
  },
  name: 'Английская локализация',
}

/**
 * Календарь с ограничением дат (текущий месяц, с 5 по 25 число)
 */
export const DateRangeCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    ...RussianCalendar.args,
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 25).toISOString(),
  },
  name: 'С ограничением дат',
}

/**
 * Календарь для выбора диапазона дат
 */
export const RangeDateCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    ...RussianCalendar.args,
    isRange: true,
  },
  name: 'Выбор диапазона дат',
}

/**
 * Неактивный календарь
 */
export const DisabledCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    ...RussianCalendar.args,
    disabled: true,
  },
  name: 'Неактивный календарь',
}
