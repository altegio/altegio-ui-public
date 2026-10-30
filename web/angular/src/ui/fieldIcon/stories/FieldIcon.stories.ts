import type { Meta, StoryObj } from '@storybook/angular'

import { AltFieldIcon } from '~ng/ui/fieldIcon'
import altCoreFieldIconStoryMeta from '~core/ui/fieldIcon/stories/FieldIcon.stories'

/**
 * Angular wrapper for Core FieldIcon
 */
const meta: Meta<AltFieldIcon> = {
  title: 'Inputs/Partials/⚠️ FieldIcon',
  id: 'fieldIcon',
  parameters: { controls: { sort: 'alpha' } },
  component: AltFieldIcon,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltFieldIcon
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
        [hoverable]="hoverable"
        [clickable]="clickable"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></AltFieldIcon>`,
  }),
  argTypes: { ...altCoreFieldIconStoryMeta.argTypes },
  args: { ...altCoreFieldIconStoryMeta.args },
} satisfies Meta<AltFieldIcon>

export default meta
type Story = StoryObj<AltFieldIcon>

export const Playground: Story = { args: {} }
