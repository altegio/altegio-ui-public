import type { Meta, StoryObj } from '@storybook/vue3'

import { YCalendar } from '~vue/ui/calendar'
import { type IYVueCalendarProps } from '~vue/ui/calendar/models/types'
import yCoreCalendarStoryMeta, { type TStoryProps } from '~core/ui/calendar/stories/Calendar.stories'
import { YGlobalProvider } from '~vue/ui/globalProvider'
import { locales } from '~core/i18n/locales'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'

type TVueCalendarStoryMeta = IYVueCalendarProps & TStoryProps

/**
 * Vue-обертка над Core Calendar
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
    components: { YCalendar, YGlobalProvider },
    setup() {
      return { args }
    },
    template: ` 
      <YCalendar v-bind="args" :locale="args.localeData">
      </YCalendar>
    `,
  }),
  argTypes: { ...yCoreCalendarStoryMeta.argTypes },
  args: { ...yCoreCalendarStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithRussianLocale: Story = {
  render: (args) => ({
    components: { YCalendar, YGlobalProvider },
    setup() {
      const i18nPlugin = new I18nPlugin(locales['ru-RU'])
      return { args, plugins: [i18nPlugin] }
    },
    template: `
      <YGlobalProvider :plugins="plugins">
        <YCalendar v-bind="args" />
      </YGlobalProvider>
    `,
  }),
  name: 'С русской локализацией через GlobalProvider',
}

export const WithEnglishLocale: Story = {
  render: (args) => ({
    components: { YCalendar, YGlobalProvider },
    setup() {
      const i18nPlugin = new I18nPlugin(locales['en-US'])
      return { args, plugins: [i18nPlugin] }
    },
    template: `
      <YGlobalProvider :plugins="plugins">
        <YCalendar v-bind="args" />
      </YGlobalProvider>
    `,
  }),
  name: 'С английской локализацией через GlobalProvider',
}
