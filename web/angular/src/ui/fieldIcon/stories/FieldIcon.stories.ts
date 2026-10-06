import type { Meta, StoryObj } from '@storybook/angular'

import { YFieldIcon } from '~ng/ui/fieldIcon'
import yCoreFieldIconStoryMeta from '~core/ui/fieldIcon/stories/FieldIcon.stories'

/**
 * Angular-обертка над Core FieldIcon
 */
const meta: Meta<YFieldIcon> = {
  title: 'Inputs/Partials/⚠️ FieldIcon',
  id: 'fieldIcon',
  parameters: { controls: { sort: 'alpha' } },
  component: YFieldIcon,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YFieldIcon
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
        [hoverable]="hoverable"
        [clickable]="clickable"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></YFieldIcon>`,
  }),
  argTypes: { ...yCoreFieldIconStoryMeta.argTypes },
  args: { ...yCoreFieldIconStoryMeta.args },
} satisfies Meta<YFieldIcon>

export default meta
type Story = StoryObj<YFieldIcon>

export const Playground: Story = { args: {} }
