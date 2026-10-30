import type { Meta, StoryObj } from '@storybook/angular'

import { AltCardIcon } from '~ng/ui/cardIcon'
import altCardIconStoryMeta from '~core/ui/cardIcon/stories/CardIcon.stories'

/**
 * Angular wrapper for CardIcon
 */
const meta: Meta<AltCardIcon> = {
  title: 'Cards/Partials/✅ CardIcon',
  id: 'cardIcon',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCardIcon,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltCardIcon
        [size]="size"
        [icon]="icon"
        [variant]="variant"
        [disabled]="disabled"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></AltCardIcon>`,
  }),
  argTypes: { ...altCardIconStoryMeta.argTypes },
  args: { ...altCardIconStoryMeta.args },
} satisfies Meta<AltCardIcon>

export default meta
type Story = StoryObj<AltCardIcon>

export const Playground: Story = { args: {} }
