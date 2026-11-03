import { html, nothing } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'

import {
  createCoreBannerProps,
  EAltCoreBannerLayout,
  EAltCoreBannerVariant,
  type IAltCoreBannerProps,
  type TAltCoreBannerEvents,
} from '~core/ui/banner/models/types'
import { AltCoreBannerTagName as tagName } from '~shared/constants'
import {
  getComponentContentTable,
  getComponentEmitsTable,
  getComponentSlotsTable,
  getComponentStateTable,
  storyControlsTable,
} from '~shared/.storybook/tables'
import { altBell, altInfo, altRocket } from '~shared/icons'

import '~core/ui/banner'
import '~core/ui/button'

export interface IAltCoreBannerStoryProps extends IAltCoreBannerProps {
  isActionsSlotExists: boolean
}

type TAltCoreBannerStoryMeta = IAltCoreBannerStoryProps & TAltCoreBannerEvents

const {
  variant,
  layout,
  title,
  description,
  icon,
  hideIcon,
  closable,
  closeLabel,
} = createCoreBannerProps()

const iconOptions = {
  default: undefined,
  bell: altBell,
  rocket: altRocket,
  info: altInfo,
}

const renderActions = () => html`
  <alt-core-button slot="actions" size="small" variant="primary" label="Primary action"></alt-core-button>
  
  <alt-core-button slot="actions" size="small" variant="outline" label="Secondary action"></alt-core-button>
`

/**
 * ## Core Banner
 * Shows a prominent message about the current context: information, a result, a warning, or an error.
 *
 * - `inline` banners sit inside the content; `page` banners span the top of a page or section.
 * - Warning and danger banners use `role="alert"`, the other variants use `role="status"`.
 * - The close button is an icon button labelled by `close-label`; the banner emits `close` and leaves hiding to the consumer.
 */
const meta: Meta<TAltCoreBannerStoryMeta> = {
  title: '✅ Banner',
  id: 'banner',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-banner
      .variant=${args.variant}
      .layout=${args.layout}
      .title=${args.title}
      .description=${args.description}
      .icon=${args.icon}
      .hideIcon=${args.hideIcon}
      .closable=${args.closable}
      .closeLabel=${args.closeLabel}
      @close=${action('close')}
    >
      ${args.isActionsSlotExists ? renderActions() : nothing}
    </alt-core-banner>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(EAltCoreBannerVariant),
      description: 'Color and default icon of the banner',
      ...getComponentStateTable(variant),
    },
    layout: {
      control: { type: 'inline-radio' },
      options: Object.values(EAltCoreBannerLayout),
      description: '`inline` — a rounded block inside the content, `page` — a full-width strip at the top of a page',
      ...getComponentStateTable(layout),
    },
    title: {
      type: 'string',
      description: 'Bold first line',
      ...getComponentContentTable(title),
    },
    description: {
      type: 'string',
      description: 'Message text. The default slot replaces it',
      ...getComponentContentTable(description),
    },
    icon: {
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Replaces the variant icon',
      ...getComponentContentTable(icon?.name),
    },
    hideIcon: {
      control: { type: 'boolean' },
      description: 'Hides the icon',
      ...getComponentStateTable(hideIcon),
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Shows the close button',
      ...getComponentStateTable(closable),
    },
    closeLabel: {
      type: 'string',
      description: 'Accessible name of the close button',
      ...getComponentContentTable(closeLabel),
    },
    isActionsSlotExists: {
      control: { type: 'boolean' },
      description: 'Fill the `actions` slot',
      ...storyControlsTable,
      ...getComponentSlotsTable('actions', 'empty'),
    },
    onClose: {
      type: 'function',
      description: 'Emitted when the close button is clicked',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    variant,
    layout,
    title: 'Payment is overdue',
    description: 'Pay the invoice by the end of the week to keep online booking enabled.',
    icon,
    hideIcon,
    closable: true,
    closeLabel,
    isActionsSlotExists: true,
  },
} satisfies Meta<TAltCoreBannerStoryMeta>

export default meta
type Story = StoryObj<TAltCoreBannerStoryMeta>

export const Playground: Story = {}

export const Variants: Story = {
  parameters: { docs: { description: { story: 'All color variants.' } } },
  render: () => {
    const banners = repeat(
      Object.values(EAltCoreBannerVariant),
      (variant) => variant,
      (variant) => html`
        <alt-core-banner
          .variant=${variant}
          .title=${variant}
          description="Message text that explains what happened and what to do next."
        ></alt-core-banner>
      `,
    )

    return html`<div style="display: grid; gap: 12px;">${banners}</div>`
  },
}

export const PageLayout: Story = {
  parameters: { docs: { description: { story: 'Full-width banners for the top of a page.' } } },
  render: () => html`
    <div style="display: grid; gap: 12px;">
      <alt-core-banner
        layout="page"
        variant="danger"
        description="The connection to the payment provider is lost. Card payments are unavailable."
      >
        <alt-core-button slot="actions" size="small" variant="primary" label="Reconnect"></alt-core-button>
      </alt-core-banner>
      
      <alt-core-banner
        layout="page"
        variant="invert"
        closable
        description="Scheduled maintenance tonight from 02:00 to 03:00 UTC."
      ></alt-core-banner>
      
      <alt-core-banner
        layout="page"
        variant="accent"
        hide-icon
        closable
        description="Try the new online booking widget for free for 14 days."
      >
        <alt-core-button slot="actions" size="small" variant="primary" label="Try it"></alt-core-button>
      </alt-core-banner>
    </div>
  `,
}

export const RichContent: Story = {
  parameters: { docs: { description: { story: 'The default slot replaces `description` and accepts markup such as links.' } } },
  render: () => html`
    <alt-core-banner variant="warning" title="Check the tax settings">
      The VAT rate changed on 1 January. <a href="#settings">Open the settings</a> to update your price lists.
    </alt-core-banner>
  `,
}
