import type { Meta, StoryObj } from '@storybook/angular'

import { YCardCheckbox } from '~ng/ui/cardCheckbox'
import yCardCheckboxStoryMeta from '~core/ui/cardCheckbox/stories/CardCheckbox.stories'

/**
 * Angular-обертка над CardCheckbox
 */
const meta: Meta<YCardCheckbox> = {
  title: 'Cards/Partials/✅ CardCheckbox',
  id: 'cardCheckbox',
  parameters: { controls: { sort: 'alpha' } },
  component: YCardCheckbox,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YCardCheckbox
        [disabled]="disabled"
        [size]="size"
        [checked]="checked"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></YCardCheckbox>`,
  }),
  argTypes: { ...yCardCheckboxStoryMeta.argTypes },
  args: { ...yCardCheckboxStoryMeta.args },
} satisfies Meta<YCardCheckbox>

export default meta
type Story = StoryObj<YCardCheckbox>

export const Playground: Story = { args: {} }
