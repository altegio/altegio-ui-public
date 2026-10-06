import type { Meta, StoryObj } from '@storybook/angular'

import { YCalendar } from '~ng/ui/calendar'
import { YGlobalProvider } from '~ng/ui/globalProvider'
import yCalendarStoryMeta, { type TStoryProps } from '~core/ui/calendar/stories/Calendar.stories'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'
import { en, ru } from '~core/i18n'
import { I18nCalendar } from '~ng/ui/calendar/stories/I18nCalendar.component'
import { action } from '@storybook/addon-actions'

type TYCalendarStoryMeta = YCalendar & TStoryProps

/**
 * Angular wrapper for Calendar
 */
const meta: Meta<TYCalendarStoryMeta> = {
  title: '✅ Calendar',
  id: 'calendar',
  parameters: { controls: { sort: 'alpha' } },
  component: YCalendar,
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
      moduleMetadata: { imports: [YGlobalProvider] },
      template: `
          <YCalendar
            [date]="date"
            [isRange]="isRange"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [disabled]="disabled"
            [headerSelectors]="headerSelectors"
            [locale]="localeData"
            (select)=onSelect($event)
        >
          </YCalendar>
      `,
    }
  },
  argTypes: { ...yCalendarStoryMeta.argTypes },
  args: { ...yCalendarStoryMeta.args },
} satisfies Meta<TYCalendarStoryMeta>

export default meta
type Story = StoryObj<YCalendar>

export const Playground: Story = { args: {} }

/**
 * With the Russian locale
 */
export const WithRussianLocale: Story = {
  render: (args) => ({

    props: { ...args, plugins: [new I18nPlugin(ru)] },
    moduleMetadata: { imports: [YGlobalProvider, I18nCalendar] },
    template: `
      <YGlobalProvider [plugins]="plugins" (ready)="ready">
        <I18nCalendar />
      </YGlobalProvider>
    `,
  }),
}

/**
 * With the English locale
 */
export const WithEnglishLocale: Story = {
  render: (args) => ({
    props: { ...args, plugins: [new I18nPlugin(en)] },
    moduleMetadata: { imports: [YGlobalProvider, I18nCalendar] },
    template: ` 
      <YGlobalProvider [plugins]="plugins" (ready)="ready">
        <I18nCalendar />
      </YGlobalProvider>
    `,
  }),
}
