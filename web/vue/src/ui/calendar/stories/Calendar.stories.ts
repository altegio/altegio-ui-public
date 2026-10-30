import type { Meta, StoryObj } from '@storybook/vue3'

import { AltCalendar } from '~vue/ui/calendar'
import { type IAltVueCalendarProps } from '~vue/ui/calendar/models/types'
import altCoreCalendarStoryMeta, { type TStoryProps } from '~core/ui/calendar/stories/Calendar.stories'
import { AltGlobalProvider } from '~vue/ui/globalProvider'
import { locales } from '~core/i18n/locales'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'

type TVueCalendarStoryMeta = IAltVueCalendarProps & TStoryProps

/**
 * Vue wrapper for Core Calendar
 */
const meta: Meta<TVueCalendarStoryMeta> = {
  title: '✅ Calendar',
  id: 'calendar',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltCalendar, AltGlobalProvider },
    setup() {
      return { args }
    },
    template: ` 
      <AltCalendar v-bind="args" :locale="args.localeData">
      </AltCalendar>
    `,
  }),
  argTypes: { ...altCoreCalendarStoryMeta.argTypes },
  args: { ...altCoreCalendarStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithRussianLocale: Story = {
  render: (args) => ({
    components: { AltCalendar, AltGlobalProvider },
    setup() {
      const i18nPlugin = new I18nPlugin(locales['ru-RU'])
      return { args, plugins: [i18nPlugin] }
    },
    template: `
      <AltGlobalProvider :plugins="plugins">
        <AltCalendar v-bind="args" />
      </AltGlobalProvider>
    `,
  }),
  name: 'With the Russian locale via GlobalProvider',
}

export const WithEnglishLocale: Story = {
  render: (args) => ({
    components: { AltCalendar, AltGlobalProvider },
    setup() {
      const i18nPlugin = new I18nPlugin(locales['en-US'])
      return { args, plugins: [i18nPlugin] }
    },
    template: `
      <AltGlobalProvider :plugins="plugins">
        <AltCalendar v-bind="args" />
      </AltGlobalProvider>
    `,
  }),
  name: 'With the English locale via GlobalProvider',
}
