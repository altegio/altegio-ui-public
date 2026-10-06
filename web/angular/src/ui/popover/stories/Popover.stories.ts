import type { Meta, StoryObj } from '@storybook/angular'
import { YPopover } from '~ng/ui/popover'
import yCorePopoverStoryMeta from '~core/ui/popover/stories/Popover.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from '@storybook/addon-actions'

/**
 * Angular-обертка над Core Popover
 */
const meta: Meta<YPopover> = {
  title: 'Tips/⚠️ Popover',
  id: 'popover',
  parameters: { controls: { sort: 'alpha' } },
  component: YPopover,
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
          <YPopover
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
              <span>Нажмите на меня</span>
            </div>
            
            <div popover-content>
                <span style="width: 218px;display: block;">{{isLongText ? LOREM_IPSUM : 'Контент поповера'}}</span>
            </div>
          </YPopover>
        </div>`,
    }
  },
  argTypes: { ...yCorePopoverStoryMeta.argTypes },
  args: { ...yCorePopoverStoryMeta.args },
} satisfies Meta<YPopover>

export default meta
type Story = StoryObj<YPopover>

export const Playground: Story = { args: {} }
