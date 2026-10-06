import type { Meta, StoryObj } from '@storybook/angular'

import { YCardRadio } from '~ng/ui/cardRadio'
import yCardRadioStoryMeta from '~core/ui/cardRadio/stories/CardRadio.stories'

/**
 * Angular-обертка над CardRadio
 */
const meta: Meta<YCardRadio> = {
  title: 'Cards/Partials/✅ CardRadio',
  id: 'cardRadio',
  parameters: { controls: { sort: 'alpha' } },
  component: YCardRadio,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YCardRadio
        [disabled]="disabled"
        [size]="size"
        [checked]="checked"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></YCardRadio>`,
  }),
  argTypes: { ...yCardRadioStoryMeta.argTypes },
  args: { ...yCardRadioStoryMeta.args },
} satisfies Meta<YCardRadio>

export default meta
type Story = StoryObj<YCardRadio>

export const Playground: Story = { args: {} }
