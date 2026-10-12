import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'
import { fn } from '@storybook/test'
import { onSelectEmit } from '~shared/.storybook/argTypes'
import {
  createCoreCalendarExternalProps,
  type IYCoreCalendarProps,
  type TYCoreCalendarEvents,
} from '~core/ui/calendar/models/types'
import {
  YCoreCalendarTagName as tagName,
} from '~shared/constants'

import '~core/ui/calendar'
import '~core/ui/globalProvider'

import { getComponentContentTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { locales } from '~core/i18n/locales'
import type { ILocale } from '~core/i18n'

// Импортируем примеры использования календаря
import * as Examples from './examples'
import dayjs from 'dayjs'
import { formatDate } from '~shared/utils/dateTime'

const { headerSelectors, disabled, isRange, minDate, maxDate } = createCoreCalendarExternalProps()

export type TStoryProps = { localeData: ILocale }
type TYCoreCalendarMeta = IYCoreCalendarProps & TYCoreCalendarEvents & TStoryProps

/**
 * ## Core Calendar
 *
 * A calendar with locale support and date range selection.
 * To localize the calendar, wrap it in GlobalProvider with I18nPlugin.
 */
const meta: Meta<TYCoreCalendarMeta> = {
  title: '✅ Calendar',
  id: 'calendar',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    isRange,
    headerSelectors,
    minDate,
    maxDate,
    onSelect,
    localeData,
  }) => {
    return html`
        <y-core-calendar
          .isRange=${isRange}
          .disabled=${disabled}
          .headerSelectors=${headerSelectors}
          min-date=${ifDefined(minDate && formatDate(dayjs(minDate)))}
          max-date=${ifDefined(maxDate && formatDate(dayjs(maxDate)))}
          @select=${onSelect}
          .locale=${localeData}
        ></y-core-calendar>
    `
  },
  argTypes: {
    isRange: {
      control: 'boolean',
      description: 'Date range selection mode',
      ...getComponentStateTable(isRange),
    },
    disabled: {
      control: 'boolean',
      description: 'Control the active state',
      ...getComponentStateTable(disabled),
    },
    headerSelectors: {
      control: 'boolean',
      description: 'Month and year selector display mode',
      ...getComponentStateTable(headerSelectors),
    },
    minDate: {
      control: 'date',
      description: 'Earliest selectable date',
      ...getComponentContentTable(minDate),
    },
    maxDate: {
      control: 'date',
      description: 'Latest selectable date',
      ...getComponentContentTable(maxDate),
    },
    localeData: {
      control: { type: 'select' },
      options: Object.keys(locales),
      mapping: locales,
      description: 'Calendar locale',
      ...storyControlsTable,
    },
    onSelect: onSelectEmit,
  },
  args: { headerSelectors, disabled, isRange, minDate, maxDate, onSelect: fn(), localeData: locales['en-US'] },
}

export default meta
type Story = StoryObj<TYCoreCalendarMeta>

/**
 * Basic calendar with configurable properties
 */
export const Playground: Story = { args: {} }

// Экспортируем примеры календаря с разными локализациями
export const RussianLocale = Examples.RussianCalendar
export const EnglishLocale = Examples.EnglishCalendar

// Экспортируем примеры с различными функциональными возможностями
export const DateRange = Examples.DateRangeCalendar
export const RangeSelection = Examples.RangeDateCalendar
export const Disabled = Examples.DisabledCalendar
