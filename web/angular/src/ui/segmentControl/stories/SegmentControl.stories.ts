import type { Meta, StoryObj } from '@storybook/angular'

import altCoreSegmentControlStoryMeta from '~core/ui/segmentControl/stories/SegmentControl.stories'

import { AltSegmentControl } from '~ng/ui/segmentControl'
import { action } from 'storybook/actions'

/**
 * Angular wrapper for Core SegmentControl
 */
const meta: Meta<AltSegmentControl> = {
  title: 'SegmentControl/✅ SegmentControl',
  id: 'segmentControl',
  parameters: { controls: { sort: 'alpha' } },
  component: AltSegmentControl,
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
        <AltSegmentControl
          [options]="options"
          [size]="size"
          [manual]="manual"
          (click)="onClick($event)"
          [(value)]="value"
        >
        </AltSegmentControl>`,
    }
  },
  argTypes: { ...altCoreSegmentControlStoryMeta.argTypes },
  args: { ...altCoreSegmentControlStoryMeta.args },
} satisfies Meta<AltSegmentControl>

export default meta
type Story = StoryObj<AltSegmentControl>

export const Playground: Story = { args: {} }
