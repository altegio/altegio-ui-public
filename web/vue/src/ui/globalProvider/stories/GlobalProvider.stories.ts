import type { Meta, StoryObj } from '@storybook/vue3'
import { AltGlobalProvider } from '~vue/ui/globalProvider'
import { type IAltVueGlobalProviderProps } from '~vue/ui/globalProvider/models/types'
import altCoreGlobalProviderStoryMeta from '~core/ui/globalProvider/stories/GlobalProvider.stories'
import TestConsumer from './TestConsumer.vue'
import I18nConsumer from './I18nConsumer.vue'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'
import { ru } from '~core/i18n'
import { QueuePlugin } from '~core/ui/globalProvider/plugins/queue'

type TVueGlobalProviderStoryMeta = IAltVueGlobalProviderProps

/**
 * Vue wrapper for Core GlobalProvider
 */
const meta: Meta<TVueGlobalProviderStoryMeta> = {
  title: '✅ GlobalProvider',
  id: 'globalProvider',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltGlobalProvider, TestConsumer },
    setup() {
      return { args }
    },
    template: `
      <AltGlobalProvider v-bind="args">
        <TestConsumer />
      </AltGlobalProvider>
    `,
  }),
  argTypes: {},
  args: { ...altCoreGlobalProviderStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithTestConsumer: Story = {
  render: () => ({
    components: { AltGlobalProvider, TestConsumer },
    setup() {
      const queuePlugin = new QueuePlugin({
        id: 'queue',
        defaultDelay: 1000,
      })

      const queuePlugin2 = new QueuePlugin({
        id: 'queue2',
        defaultDelay: 2000,
      })

      return { plugins: [queuePlugin, queuePlugin2] }
    },
    template: `
      <AltGlobalProvider :plugins="plugins">
        <TestConsumer />
      </AltGlobalProvider>
    `,
  }),
}

/**
 * Example with the Russian locale
 */
export const WithI18nConsumerRu: Story = {
  render: () => ({
    components: { AltGlobalProvider, I18nConsumer },
    setup() {
      // Localization plugin with the Russian locale
      const i18nPlugin = new I18nPlugin(ru)
      const queuePlugin = new QueuePlugin({
        id: 'queue',
        defaultDelay: 1000,
      })

      return { plugins: [i18nPlugin, queuePlugin] }
    },
    template: `
      <AltGlobalProvider :plugins="plugins">
        <I18nConsumer />
      </AltGlobalProvider>
    `,
  }),
}
