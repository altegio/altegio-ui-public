import { html } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/tip'

import {
  createCoreTipProps,
  type IAltCoreTipProps,
  EAltCoreTipType,
} from '../models/types'
import {
  AltCoreTipTagName as tagName,
} from '~shared/constants'

import { storyControlsTable } from '~shared/.storybook/tables'

import '~core/ui/simpleButton'

import altCoreDropdownStoryMeta from '~core/ui/dropdown/stories/Dropdown.stories'
import { onVisibleEmit } from '~shared/.storybook/argTypes'
import type { TAltCoreTipActionEvents } from '../models/types/events'

const { type, offset, padding } = createCoreTipProps()

export interface IAltCoreLinkStoryProps {
  tipContent: string
}

type AltCoreTipMeta = Meta<IAltCoreTipProps & IAltCoreLinkStoryProps & TAltCoreTipActionEvents>

/**
 * ## Core Tip
 */
const meta: AltCoreTipMeta = {
  title: 'Tip',
  id: 'tip',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({ type, trigger, isOpen, placement, strategy, offset, padding, transition, tipContent, inline }) => {
    return html`
      <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
        <alt-core-tip .type=${type} .trigger=${trigger} .isOpen=${isOpen} .placement=${placement} .strategy=${strategy} .offset=${offset} .padding=${padding} .transition=${transition} .inline=${inline}>
          <alt-core-simple-button slot="activator">
            <span>Click me</span>
          </alt-core-simple-button>

          <div slot="content">${tipContent}</div>
        </alt-core-tip>
      </div>
    `
  },
  argTypes: {
    ...altCoreDropdownStoryMeta.argTypes,
    type: {
      control: 'select',
      description: 'Dropdown and text color',
      options: Object.values(EAltCoreTipType),
    },
    onVisible: onVisibleEmit,
    tipContent: {
      type: 'string',
      description: 'Text displayed through the component slot',
      ...storyControlsTable,
    },
    disabled: {
      control: 'boolean',
      description: 'Control the active state',
    },
  },
  args: {
    ...altCoreDropdownStoryMeta.args,
    padding,
    type,
    offset,
    onVisible: fn(),
    tipContent: 'Hint',
  },
} satisfies AltCoreTipMeta

export default meta
type Story = StoryObj<IAltCoreTipProps>

export const Playground: Story = { args: {} }
