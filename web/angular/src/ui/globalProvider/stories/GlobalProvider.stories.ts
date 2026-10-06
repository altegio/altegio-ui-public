import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { fn } from '@storybook/test'
import { omit } from 'radash'

import { YGlobalProvider } from '../GlobalProvider.component'
import yGlobalProviderStoryMeta from '~core/ui/globalProvider/stories/GlobalProvider.stories'
import { TestConsumer } from './TestConsumer.component'
import { I18nConsumer } from './I18nConsumer.component'
import { QueuePlugin } from '~core/ui/globalProvider/plugins/queue'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'
import { en } from '~core/i18n'

/**
 * Angular-обертка над GlobalProvider
 */
const meta: Meta<YGlobalProvider> = {
  title: '🔍 GlobalProvider',
  id: 'globalProvider',
  parameters: { controls: { sort: 'alpha' } },
  component: YGlobalProvider,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    moduleMetadata: {
      imports: [
        CommonModule,
        TestConsumer,
        I18nConsumer,
      ],
    },
    template: `
      <YGlobalProvider [plugins]="plugins" (ready)="ready">
        <TestConsumer />
        
        <I18nConsumer />
      </YGlobalProvider>`,
  }),
  argTypes: {},
  args: {
    ...omit(
      yGlobalProviderStoryMeta.args ?? {},
      ['onReady'],
    ),
    ready: fn(),
    plugins: [
      // Плагин для очереди уведомлений с задержкой 5 секунд
      new QueuePlugin({
        id: 'notifications',
        defaultDelay: 5000,
      }),
      // Плагин для очереди задач с задержкой 10 секунд
      new QueuePlugin({
        id: 'tasks',
        defaultDelay: 10000,
      }),
      // Плагин интернационализации с английской локализацией
      new I18nPlugin(en),
    ],
  },
} satisfies Meta<YGlobalProvider>

export default meta
type Story = StoryObj<YGlobalProvider>

export const Playground: Story = { args: {} }
