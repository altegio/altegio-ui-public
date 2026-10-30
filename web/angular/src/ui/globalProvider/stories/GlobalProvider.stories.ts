import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { fn } from 'storybook/test'
import { omit } from 'radash'

import { AltGlobalProvider } from '../GlobalProvider.component'
import altGlobalProviderStoryMeta from '~core/ui/globalProvider/stories/GlobalProvider.stories'
import { TestConsumer } from './TestConsumer.component'
import { I18nConsumer } from './I18nConsumer.component'
import { QueuePlugin } from '~core/ui/globalProvider/plugins/queue'
import { I18nPlugin } from '~core/ui/globalProvider/plugins/i18n'
import { en } from '~core/i18n'

/**
 * Angular wrapper for GlobalProvider
 */
const meta: Meta<AltGlobalProvider> = {
  title: '🔍 GlobalProvider',
  id: 'globalProvider',
  parameters: { controls: { sort: 'alpha' } },
  component: AltGlobalProvider,
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
      <AltGlobalProvider [plugins]="plugins" (ready)="ready">
        <TestConsumer />
        
        <I18nConsumer />
      </AltGlobalProvider>`,
  }),
  argTypes: {},
  args: {
    ...omit(
      altGlobalProviderStoryMeta.args ?? {},
      ['onReady'],
    ),
    ready: fn(),
    plugins: [
      // Notification queue with a 5-second delay
      new QueuePlugin({
        id: 'notifications',
        defaultDelay: 5000,
      }),
      // Task queue with a 10-second delay
      new QueuePlugin({
        id: 'tasks',
        defaultDelay: 10000,
      }),
      // Internationalization plugin with the English locale
      new I18nPlugin(en),
    ],
  },
} satisfies Meta<AltGlobalProvider>

export default meta
type Story = StoryObj<AltGlobalProvider>

export const Playground: Story = { args: {} }
