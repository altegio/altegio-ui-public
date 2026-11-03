import type { Meta, StoryObj } from '@storybook/angular'

import { AltCalendar } from '~ng/ui/calendar'
import { AltGlobalProvider } from '~ng/ui/globalProvider'
import altCalendarStoryMeta, { type TStoryProps } from '~core/ui/calendar/stories/Calendar.stories'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'
import { en, ru } from '~core/i18n'
import { I18nCalendar } from '~ng/ui/calendar/stories/I18nCalendar.component'
import { action } from 'storybook/actions'

type TAltCalendarStoryMeta = AltCalendar & TStoryProps

/**
 * Angular wrapper for Calendar
 */
const meta: Meta<TAltCalendarStoryMeta> = {
  title: '✅ Calendar',
  id: 'calendar',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCalendar,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const i18nPlugin = new I18nPlugin(args.localeData)

    return {
      props: {
        ...args,
        plugins: [i18nPlugin],
        onSelect: action('select'),
      },
      moduleMetadata: { imports: [AltGlobalProvider] },
      template: `
          <AltCalendar
            [date]="date"
            [isRange]="isRange"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [disabled]="disabled"
            [headerSelectors]="headerSelectors"
            [locale]="localeData"
            (select)=onSelect($event)
        >
          </AltCalendar>
      `,
    }
  },
  argTypes: { ...altCalendarStoryMeta.argTypes },
  args: { ...altCalendarStoryMeta.args },
} satisfies Meta<TAltCalendarStoryMeta>

export default meta
type Story = StoryObj<AltCalendar>

export const Playground: Story = { args: {} }

/**
 * With the Russian locale
 */
export const WithRussianLocale: Story = {
  render: (args) => ({

    props: { ...args, plugins: [new I18nPlugin(ru)] },
    moduleMetadata: { imports: [AltGlobalProvider, I18nCalendar] },
    template: `
      <AltGlobalProvider [plugins]="plugins" (ready)="ready">
        <I18nCalendar />
      </AltGlobalProvider>
    `,
  }),
}

/**
 * With the English locale
 */
export const WithEnglishLocale: Story = {
  render: (args) => ({
    props: { ...args, plugins: [new I18nPlugin(en)] },
    moduleMetadata: { imports: [AltGlobalProvider, I18nCalendar] },
    template: ` 
      <AltGlobalProvider [plugins]="plugins" (ready)="ready">
        <I18nCalendar />
      </AltGlobalProvider>
    `,
  }),
}
