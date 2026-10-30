import type { Meta, StoryObj } from '@storybook/angular'
import { AltPopover } from '~ng/ui/popover'
import altCorePopoverStoryMeta from '~core/ui/popover/stories/Popover.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from 'storybook/actions'

/**
 * Angular wrapper for Core Popover
 */
const meta: Meta<AltPopover> = {
  title: 'Tips/⚠️ Popover',
  id: 'popover',
  parameters: { controls: { sort: 'alpha' } },
  component: AltPopover,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const handlers = {
      onSubmit: action('submit'),
      onCancel: action('cancel'),
    }

    return {
      props: {
        ...args,
        ...handlers,
        LOREM_IPSUM,
      },
      template: `
        <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
          <AltPopover
            [trigger]="trigger"
            [isOpen]="isOpen"
            [offset]="offset"
            [padding]="padding"
            [placement]="placement"
            [strategy]="strategy"
            [type]="type"
            [transition]="transition"
            [cancelText]="cancelText"
            [submitText]="submitText"
            [disabled]="disabled"
            [inline]="inline"
            (cancel)="onCancel()"
            (submit)="onSubmit()"
          >
            <div popover-activator>
              <span>Click me</span>
            </div>
            
            <div popover-content>
                <span style="width: 218px;display: block;">{{isLongText ? LOREM_IPSUM : 'Popover content'}}</span>
            </div>
          </AltPopover>
        </div>`,
    }
  },
  argTypes: { ...altCorePopoverStoryMeta.argTypes },
  args: { ...altCorePopoverStoryMeta.args },
} satisfies Meta<AltPopover>

export default meta
type Story = StoryObj<AltPopover>

export const Playground: Story = { args: {} }
