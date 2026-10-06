import type { Meta, StoryObj } from '@storybook/vue3'
import { YGlobalProvider } from '~vue/ui/globalProvider'
import { type IYVueGlobalProviderProps } from '~vue/ui/globalProvider/models/types'
import yCoreGlobalProviderStoryMeta from '~core/ui/globalProvider/stories/GlobalProvider.stories'
import TestConsumer from './TestConsumer.vue'
import I18nConsumer from './I18nConsumer.vue'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'
import { ru } from '~core/i18n'
import { QueuePlugin } from '~core/ui/globalProvider/plugins/queue'

type TVueGlobalProviderStoryMeta = IYVueGlobalProviderProps

/**
 * Vue-обертка над Core GlobalProvider
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
    components: { YGlobalProvider, TestConsumer },
    setup() {
      return { args }
    },
    template: `
      <YGlobalProvider v-bind="args">
        <TestConsumer />
      </YGlobalProvider>
    `,
  }),
  argTypes: {},
  args: { ...yCoreGlobalProviderStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithTestConsumer: Story = {
  render: () => ({
    components: { YGlobalProvider, TestConsumer },
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
      <YGlobalProvider :plugins="plugins">
        <TestConsumer />
      </YGlobalProvider>
    `,
  }),
}

/**
 * Пример с компонентом локализации (русский)
 */
export const WithI18nConsumerRu: Story = {
  render: () => ({
    components: { YGlobalProvider, I18nConsumer },
    setup() {
      // Создаем плагин локализации с русской локалью
      const i18nPlugin = new I18nPlugin(ru)
      const queuePlugin = new QueuePlugin({
        id: 'queue',
        defaultDelay: 1000,
      })

      return { plugins: [i18nPlugin, queuePlugin] }
    },
    template: `
      <YGlobalProvider :plugins="plugins">
        <I18nConsumer />
      </YGlobalProvider>
    `,
  }),
}
