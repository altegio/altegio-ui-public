import type { Meta, StoryObj } from '@storybook/angular'
import { AltStatus } from '~ng/ui/status'
import altCoreStatusStoryMeta from '~core/ui/status/stories/Status.stories'

/**
 * Angular wrapper for Core Status. Projected content goes under the text.
 */
const meta: Meta<AltStatus> = {
  title: '✅ Status',
  id: 'status',
  parameters: { controls: { sort: 'alpha' } },
  component: AltStatus,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltStatus
        style="max-width: 566px;"
        [variant]="variant"
        [text]="text"
        [size]="size"
      ></AltStatus>
    `,
  }),
  argTypes: altCoreStatusStoryMeta.argTypes,
  args: altCoreStatusStoryMeta.args,
}

export default meta
type Story = StoryObj<AltStatus>

export const Playground: Story = { args: {} }
