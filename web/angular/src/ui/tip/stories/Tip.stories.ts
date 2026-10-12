import type { Meta, StoryObj } from '@storybook/angular'

import { YTip } from '~ng/ui/tip'
import yCoreTipStoryMeta from '~core/ui/tip/stories/Tip.stories'
import '~core/ui/simpleButton'

/**
 * Angular wrapper for Core Tip
 */
const meta: Meta<YTip> = {
  title: 'Tips/🔍 Tip',
  id: 'tip',
  parameters: { controls: { sort: 'alpha' } },
  component: YTip,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
        <YTip
          [trigger]="trigger"
          [isOpen]="isOpen"
          [offset]="offset"
          [padding]="padding"
          [placement]="placement"
          [strategy]="strategy"
          [type]="type"
          [transition]="transition"
          [disabled]="disabled"
          [inline]="inline"
        >
          <div tip-activator>
            <span>Click me</span>
          </div>
          
          <div tip-content>
            <span>
              {{ tipContent }}
            </span>
          </div>
        </YTip>
      </div>`,
  }),
  argTypes: { ...yCoreTipStoryMeta.argTypes },
  args: { ...yCoreTipStoryMeta.args },
} satisfies Meta<YTip>

export default meta
type Story = StoryObj<YTip>

export const Playground: Story = { args: {} }
