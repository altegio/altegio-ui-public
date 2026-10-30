import type { Meta, StoryObj } from '@storybook/web-components'
import { html, nothing } from 'lit'

import '~core/ui/tooltip'
import '~core/ui/link'

import {
  createCoreTooltipProps,
  type IAltCoreTooltipProps,
} from '../models/types'
import { AltCoreTooltipTagName as tagName } from '~shared/constants'
import { getComponentContentTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { isLongText as isLongTextArgType } from '~shared/.storybook/argTypes'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { EAltCoreDropdownPlacement } from '~core/ui/dropdown/models/types'

type TTooltipStory = Required<NonNullable<IAltCoreTooltipProps>>
type TTooltipStoryMeta = IAltCoreTooltipProps & IAltCoreLabelStoryProps & { isSlotExists: boolean }

export interface IAltCoreLabelStoryProps extends ITextStoryProps {}

const { text } = { ...createCoreTooltipProps() }

/**
 * Tooltip with text and a link
 * Basic usage example
 */

const meta: Meta<TTooltipStoryMeta> = {
  title: '⚠️ Tooltip',
  id: 'tooltip',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    text,
    disabled,
    placement,
    isLongText,
    isSlotExists,
  }) => {
    const contentSlotText = () => {
      return isLongText ? LOREM_IPSUM : text
    }

    const contentSlotTemplate = () => {
      return isSlotExists
          ? html`
            <div slot="content">Content with a
              <alt-core-link href="https://www.google.com" target="_blank">link</alt-core-link>

              <div>${contentSlotText()}</div>
            </div>`
          : nothing
    }

    return html`
      <div style="padding:50px calc(50% - 60px); width: fit-content;">
        <alt-core-tooltip
          .text=${isLongText ? LOREM_IPSUM : text}
          .disabled=${disabled ?? false}
          .placement=${placement}
        >
          <div slot="activator">Activator</div>
          ${contentSlotTemplate()}
        </alt-core-tooltip>
      </div>
    `
  },
  argTypes: {
    text: {
      type: 'string',
      description: 'Tooltip text',
      ...getComponentContentTable(text),
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'Control the active state',
      ...getComponentStateTable(text),
    },

    placement: {
      control: 'select',
      options: Object.values(EAltCoreDropdownPlacement),
      description: 'Dropdown placement',
    },

    // Story Controls
    isSlotExists: {
      type: 'boolean',
      description: 'Use the content slot',
      control: 'boolean',
      ...storyControlsTable,
    },

    isLongText: isLongTextArgType,
  },
  args: {
    ...createCoreTooltipProps(),
    text: 'Sample tooltip text',
    isLongText: false,
    isSlotExists: true,
  },
} satisfies Meta<TTooltipStoryMeta>

export default meta
type Story = StoryObj<TTooltipStory>

export const Playground: Story = { args: {} }
