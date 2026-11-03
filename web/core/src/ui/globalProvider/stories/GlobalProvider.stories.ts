import { html } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreGlobalProviderProps,
  type IAltCoreGlobalProviderProps,
  type TAltCoreGlobalProviderEvents,
} from '../models/types'
import {
  AltCoreGlobalProviderTagName as tagName,
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
const meta: Meta<IAltCoreGlobalProviderProps & TAltCoreGlobalProviderEvents> = {
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
type Story = StoryObj<IAltCoreGlobalProviderProps & TAltCoreGlobalProviderEvents>

/**
 * Basic example with the queue plugin
 */
export const Empty: Story = {
  render: ({ onReady }) => {
    // Create the queue plugin
    const queuePlugin = new QueuePlugin({
      id: 'queue',
      defaultDelay: 1000,
    })

    const queuePlugin2 = new QueuePlugin({
      id: 'queue2',
      defaultDelay: 2000,
    })

    return html`
      <alt-core-global-provider 
        .plugins=${[queuePlugin, queuePlugin2]}
        @ready=${onReady}
      >
        <alt-core-test-consumer>Consumer</alt-core-test-consumer>
      </alt-core-global-provider>
    `
  },
  args: {
    ...createCoreGlobalProviderProps(),
    onReady: fn(),
  },
}
