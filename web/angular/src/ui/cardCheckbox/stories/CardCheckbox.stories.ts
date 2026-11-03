import type { Meta, StoryObj } from '@storybook/angular'

import { AltCardCheckbox } from '~ng/ui/cardCheckbox'
import altCardCheckboxStoryMeta from '~core/ui/cardCheckbox/stories/CardCheckbox.stories'

/**
 * Angular wrapper for CardCheckbox
 */
const meta: Meta<AltCardCheckbox> = {
  title: 'Cards/Partials/✅ CardCheckbox',
  id: 'cardCheckbox',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCardCheckbox,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltCardCheckbox
        [disabled]="disabled"
        [size]="size"
        [checked]="checked"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></AltCardCheckbox>`,
  }),
  argTypes: { ...altCardCheckboxStoryMeta.argTypes },
  args: { ...altCardCheckboxStoryMeta.args },
} satisfies Meta<AltCardCheckbox>

export default meta
type Story = StoryObj<AltCardCheckbox>

export const Playground: Story = { args: {} }
