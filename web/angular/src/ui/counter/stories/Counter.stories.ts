import type { Meta, StoryObj } from '@storybook/angular'

import { AltCounter } from '~ng/ui/counter'
import altCoreCounterStoryMeta from '~core/ui/counter/stories/Counter.stories'

/**
 * Angular wrapper for Core Counter
 */
const meta: Meta<AltCounter> = {
  title: '✅ Counter',
  id: 'counter',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCounter,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    return {
      props: { ...args },
      template: `
      <AltCounter
        [size]="size"
        [value]="value"
        [variant]="variant"
        [disabled]="disabled"
        [withPlusSign]="withPlusSign"
      ></AltCounter>
    `,
    }
  },
  argTypes: { ...altCoreCounterStoryMeta.argTypes },
  args: { ...altCoreCounterStoryMeta.args },
} satisfies Meta<AltCounter>

export default meta
type Story = StoryObj<AltCounter>

export const Playground: Story = {}
