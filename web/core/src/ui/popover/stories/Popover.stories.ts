import { html } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/popover'
import '~core/ui/button'

import { AltCorePopoverTagName as tagName } from '~shared/constants'
import {
  createCorePopoverProps,
  type IAltCorePopoverProps,
  type TAltCorePopoverActionEvents,
} from '~core/ui/popover/models/types'
import { getComponentContentTable, getComponentEmitsTable } from '~shared/.storybook/tables'
import {
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

import altCoreTipStoryMeta from '~core/ui/tip/stories/Tip.stories'

const {
  submitText,
  cancelText,
} = createCorePopoverProps()

type TAltCorePopoverMeta = Meta<IAltCorePopoverProps & TAltCorePopoverActionEvents & ITextStoryProps>

/**
 * ## Core Popover
 *
 */
const meta: TAltCorePopoverMeta = {
  title: 'Popover',
  id: 'popover',
  component: tagName,
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    trigger,
    isOpen,
    offset,
    padding,
    placement,
    strategy,
    type,
    transition,
    submitText,
    cancelText,
    isLongText,
    inline,
    onCancel,
    onSubmit,
  }) => html`
    <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
      <alt-core-popover
        .trigger=${trigger}
        .isOpen=${isOpen}
        .offset=${offset}
        .padding=${padding}
        .placement=${placement}
        .strategy=${strategy}
        .type=${type}
        .transition=${transition}
        .submitText=${submitText}
        .cancelText=${cancelText}
        .inline=${inline}
        @cancel=${onCancel}
        @submit=${onSubmit}
      >
        <alt-core-button label="Click me" slot="activator"></alt-core-button>
        
        <div slot="content">
          <span style="width: 218px;display: block;">${isLongText ? LOREM_IPSUM : 'Popover content'}</span>
        </div>
      </alt-core-popover>
    </div>
  `,
  argTypes: {
    ...altCoreTipStoryMeta.argTypes,
    submitText: {
      type: 'string',
      description: 'Confirm button text',
      ...getComponentContentTable(submitText),
    },
    cancelText: {
      type: 'string',
      description: 'Cancel button text',
      ...getComponentContentTable(cancelText),
    },
    onCancel: {
      type: 'function',
      description: 'Popover close event',
      ...getComponentEmitsTable(),
    },
    onSubmit: {
      type: 'function',
      description: 'Action confirmation event',
      ...getComponentEmitsTable(),
    },
    isLongText: isLongTextArgType,
  },
  args: {
    ...altCoreTipStoryMeta.args,
    submitText: 'Next',
    cancelText: 'Cancel',
    onCancel: fn(),
    onSubmit: fn(),
  },
}

export default meta
type Story = StoryObj<IAltCorePopoverProps>

export const Playground: Story = { args: {} }
