import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreStatusProps,
  EAltCoreStatusVariant,
  type IAltCoreStatusProps,
} from '~core/ui/status/models/types'
import { AltCoreStatusTagName as tagName } from '~shared/constants'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'

import '~core/ui/status'
import '~core/ui/link'

const { variant, text, size } = createCoreStatusProps()

/**
 * ## Core Status
 * A card with the outcome of an action or the state of a process.
 *
 * - `waiting`, `success` and `error` set the color and the icon; `icon` replaces the icon.
 * - The message is a live region: `error` uses `role="alert"`, the other variants `role="status"`.
 * - The default slot takes extra content under the text, such as a link or a button.
 */
const meta: Meta<IAltCoreStatusProps> = {
  title: '✅ Status',
  id: 'status',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-status
      .variant=${args.variant}
      .text=${args.text}
      .size=${args.size}
      style="max-width: 566px;"
    ></alt-core-status>
  `,
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: Object.values(EAltCoreStatusVariant),
      description: 'State: color and icon',
      ...getComponentStateTable(variant),
    },
    text: {
      control: { type: 'text' },
      description: 'Message',
      ...getComponentContentTable(text),
    },
    size: {
      ...sizeArgType([EAltSizes.MEDIUM, EAltSizes.LARGE]),
      description: 'Padding and corner radius',
      ...getComponentStateTable(size),
    },
    icon: {
      control: false,
      description: 'Icon that replaces the variant icon',
      ...getComponentContentTable(),
    },
  },
  args: {
    variant,
    text: 'The request has been sent. We will reply within a day.',
    size,
  },
}

export default meta
type Story = StoryObj<IAltCoreStatusProps>

export const Playground: Story = {}

export const Variants: Story = {
  parameters: { docs: { description: { story: 'The three states in both sizes, with slotted content.' } } },
  render: () => html`
    <div style="display: grid; gap: 16px; max-width: 566px;">
      <alt-core-status variant="waiting" text="Your request is being reviewed."></alt-core-status>

      <alt-core-status variant="success" size="medium" text="Thank you for your feedback!"></alt-core-status>

      <alt-core-status variant="error" text="You have no access to electronic tips. Contact your manager.">
        <alt-core-link href="#">How to get access</alt-core-link>
      </alt-core-status>
    </div>
  `,
}
