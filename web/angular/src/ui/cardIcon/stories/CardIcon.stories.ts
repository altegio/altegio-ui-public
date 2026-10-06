import type { Meta, StoryObj } from '@storybook/angular'

import { YCardIcon } from '~ng/ui/cardIcon'
import yCardIconStoryMeta from '~core/ui/cardIcon/stories/CardIcon.stories'

/**
 * Angular-обертка над CardIcon
 */
const meta: Meta<YCardIcon> = {
  title: 'Cards/Partials/✅ CardIcon',
  id: 'cardIcon',
  parameters: { controls: { sort: 'alpha' } },
  component: YCardIcon,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YCardIcon
        [size]="size"
        [icon]="icon"
        [variant]="variant"
        [disabled]="disabled"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></YCardIcon>`,
  }),
  argTypes: { ...yCardIconStoryMeta.argTypes },
  args: { ...yCardIconStoryMeta.args },
} satisfies Meta<YCardIcon>

export default meta
type Story = StoryObj<YCardIcon>

export const Playground: Story = { args: {} }
