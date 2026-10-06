import type { Meta, StoryObj } from '@storybook/angular'

import { YCounter } from '~ng/ui/counter'
import yCoreCounterStoryMeta from '~core/ui/counter/stories/Counter.stories'

/**
 * Angular wrapper for Core Counter
 */
const meta: Meta<YCounter> = {
  title: '✅ Counter',
  id: 'counter',
  parameters: { controls: { sort: 'alpha' } },
  component: YCounter,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    return {
      props: { ...args },
      template: `
      <YCounter
        [size]="size"
        [value]="value"
        [variant]="variant"
        [disabled]="disabled"
        [withPlusSign]="withPlusSign"
      ></YCounter>
    `,
    }
  },
  argTypes: { ...yCoreCounterStoryMeta.argTypes },
  args: { ...yCoreCounterStoryMeta.args },
} satisfies Meta<YCounter>

export default meta
type Story = StoryObj<YCounter>

export const Playground: Story = {}
