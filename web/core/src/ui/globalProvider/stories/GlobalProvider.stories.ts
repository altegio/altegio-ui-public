import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreGlobalProviderProps,
  type IYCoreGlobalProviderProps,
  type TYCoreGlobalProviderEvents,
} from '../models/types'
import {
  YCoreGlobalProviderTagName as tagName,
} from '~shared/constants'
import { QueuePlugin } from '../plugins/queue'

import './TestConsumer.core'
import '~core/ui/globalProvider'

/**
 * ## CoreGlobalProvider
 *
 * GlobalProvider supplies a shared context to nested components.
 * Use it to manage shared application data, state, and services.
 *
 * Plugins extend its functionality.
 */
const meta: Meta<IYCoreGlobalProviderProps & TYCoreGlobalProviderEvents> = {
  title: '✅ GlobalProvider',
  id: 'globalProvider',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  argTypes: {
    plugins: {
      control: false,
      description: 'Global provider plugins',
    },
  },
}

export default meta
type Story = StoryObj<IYCoreGlobalProviderProps & TYCoreGlobalProviderEvents>

/**
 * Basic example with the queue plugin
 */
export const Empty: Story = {
  render: ({ onReady }) => {
    // Создаем экземпляр плагина очереди
    const queuePlugin = new QueuePlugin({
      id: 'queue',
      defaultDelay: 1000,
    })

    const queuePlugin2 = new QueuePlugin({
      id: 'queue2',
      defaultDelay: 2000,
    })

    return html`
      <y-core-global-provider 
        .plugins=${[queuePlugin, queuePlugin2]}
        @ready=${onReady}
      >
        <y-core-test-consumer>Consumer</y-core-test-consumer>
      </y-core-global-provider>
    `
  },
  args: {
    ...createCoreGlobalProviderProps(),
    onReady: fn(),
  },
}
