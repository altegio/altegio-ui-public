import type { Meta, StoryObj } from '@storybook/angular'

import { YFieldAvatar } from '~ng/ui/fieldAvatar'
import yCoreFieldAvatarStoryMeta from '~core/ui/fieldAvatar/stories/FieldAvatar.stories'

/**
 * Angular-обертка над Core FieldAvatar
 */
const meta: Meta<YFieldAvatar> = {
  title: 'Inputs/Partials/⚠️ FieldAvatar',
  id: 'fieldAvatar',
  parameters: { controls: { sort: 'alpha' } },
  component: YFieldAvatar,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YFieldAvatar
        [disabled]="disabled"
        [size]="size"
        [photo]="photo"
        [initials]="initials"
        [icon]="icon"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></YFieldAvatar>`,
  }),
  argTypes: { ...yCoreFieldAvatarStoryMeta.argTypes },
  args: { ...yCoreFieldAvatarStoryMeta.args },
} satisfies Meta<YFieldAvatar>

export default meta
type Story = StoryObj<YFieldAvatar>

export const Playground: Story = { args: {} }
