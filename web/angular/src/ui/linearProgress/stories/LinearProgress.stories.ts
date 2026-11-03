import type { Meta, StoryObj } from '@storybook/angular'
import { AltLinearProgress } from '~ng/ui/linearProgress'
import altCoreLinearProgressStoryMeta from '~core/ui/linearProgress/stories/LinearProgress.stories'

/**
 * Angular wrapper for Core LinearProgress.
 */
const meta: Meta<AltLinearProgress> = {
  title: '✅ LinearProgress',
  id: 'linearprogress',
  parameters: { controls: { sort: 'alpha' } },
  component: AltLinearProgress,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltLinearProgress
        style="max-width: 360px;"
        [value]="value"
        [max]="max"
        [indeterminate]="indeterminate"
        [size]="size"
        [variant]="variant"
        [accessibleName]="accessibleName"
        [valueText]="valueText"
      ></AltLinearProgress>
    `,
  }),
  argTypes: altCoreLinearProgressStoryMeta.argTypes,
  args: altCoreLinearProgressStoryMeta.args,
}

export default meta
type Story = StoryObj<AltLinearProgress>

export const Playground: Story = { args: {} }
