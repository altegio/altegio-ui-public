import type { Meta, StoryObj } from '@storybook/angular'

import { AltCardRadio } from '~ng/ui/cardRadio'
import altCardRadioStoryMeta from '~core/ui/cardRadio/stories/CardRadio.stories'

/**
 * Angular wrapper for CardRadio
 */
const meta: Meta<AltCardRadio> = {
  title: 'Cards/Partials/✅ CardRadio',
  id: 'cardRadio',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCardRadio,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltCardRadio
        [disabled]="disabled"
        [size]="size"
        [checked]="checked"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></AltCardRadio>`,
  }),
  argTypes: { ...altCardRadioStoryMeta.argTypes },
  args: { ...altCardRadioStoryMeta.args },
} satisfies Meta<AltCardRadio>

export default meta
type Story = StoryObj<AltCardRadio>

export const Playground: Story = { args: {} }
