import type { Meta, StoryObj } from '@storybook/angular'

import { AltTip } from '~ng/ui/tip'
import altCoreTipStoryMeta from '~core/ui/tip/stories/Tip.stories'
import '~core/ui/simpleButton'

/**
 * Angular wrapper for Core Tip
 */
const meta: Meta<AltTip> = {
  title: 'Tips/🔍 Tip',
  id: 'tip',
  parameters: { controls: { sort: 'alpha' } },
  component: AltTip,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
        <AltTip
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
        </AltTip>
      </div>`,
  }),
  argTypes: { ...altCoreTipStoryMeta.argTypes },
  args: { ...altCoreTipStoryMeta.args },
} satisfies Meta<AltTip>

export default meta
type Story = StoryObj<AltTip>

export const Playground: Story = { args: {} }
