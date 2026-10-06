import type { Meta, StoryObj } from '@storybook/angular'

import yCoreSegmentControlStoryMeta from '~core/ui/segmentControl/stories/SegmentControl.stories'

import { YSegmentControl } from '~ng/ui/segmentControl'
import { action } from '@storybook/addon-actions'

/**
 * Angular-обертка над Core SegmentControl
 */
const meta: Meta<YSegmentControl> = {
  title: 'SegmentControl/✅ SegmentControl',
  id: 'segmentControl',
  parameters: { controls: { sort: 'alpha' } },
  component: YSegmentControl,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    return {
      props: {
        ...args,
        onClick: action('click'),
      },
      template: `
        <YSegmentControl
          [options]="options"
          [size]="size"
          [manual]="manual"
          (click)="onClick($event)"
          [(value)]="value"
        >
        </YSegmentControl>`,
    }
  },
  argTypes: { ...yCoreSegmentControlStoryMeta.argTypes },
  args: { ...yCoreSegmentControlStoryMeta.args },
} satisfies Meta<YSegmentControl>

export default meta
type Story = StoryObj<YSegmentControl>

export const Playground: Story = { args: {} }
