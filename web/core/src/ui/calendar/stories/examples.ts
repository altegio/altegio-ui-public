import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { fn } from 'storybook/test'
import type { StoryObj } from '@storybook/web-components'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'
import { ru, en } from '~core/i18n'

import type {
  IYCoreCalendarProps,
} from '~core/ui/calendar/models/types'
import type { TYCoreCalendarEvents } from '~core/ui/calendar/models/types/events'
import type { ILocale } from '~core/i18n'

// Register the components
import '~core/ui/calendar'
import '~core/ui/globalProvider'

// Story meta type
type TYCoreCalendarMeta = IYCoreCalendarProps & TYCoreCalendarEvents & { localeData: ILocale }
type Story = StoryObj<TYCoreCalendarMeta>

/**
 * Builds a calendar template wrapped in a localization plugin
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
  // Localization plugin with the selected locale
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
 * Calendar with the Russian locale
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
  name: 'Russian locale',
}

/**
 * Calendar with the English locale
 */
export const EnglishCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    ...RussianCalendar.args,
    localeData: en,
  },
  name: 'English locale',
}

/**
 * Calendar restricted to days 5–25 of the current month
 */
export const DateRangeCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    ...EnglishCalendar.args,
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 25).toISOString(),
  },
  name: 'With date limits',
}

/**
 * Date range calendar
 */
export const RangeDateCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    ...EnglishCalendar.args,
    isRange: true,
  },
  name: 'Date range selection',
}

/**
 * Disabled calendar
 */
export const DisabledCalendar: Story = {
  render: (args) => createCalendarTemplate(args),
  args: {
    ...EnglishCalendar.args,
    disabled: true,
  },
  name: 'Disabled calendar',
}
