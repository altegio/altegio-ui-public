import type { Meta, StoryObj } from '@storybook/angular'

import { AltFieldAvatar } from '~ng/ui/fieldAvatar'
import altCoreFieldAvatarStoryMeta from '~core/ui/fieldAvatar/stories/FieldAvatar.stories'

/**
 * Angular wrapper for Core FieldAvatar
 */
const meta: Meta<AltFieldAvatar> = {
  title: 'Inputs/Partials/⚠️ FieldAvatar',
  id: 'fieldAvatar',
  parameters: { controls: { sort: 'alpha' } },
  component: AltFieldAvatar,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltFieldAvatar
        [disabled]="disabled"
        [size]="size"
        [photo]="photo"
        [initials]="initials"
        [icon]="icon"
        style="border: 1px dashed;width: min-content;display: inline-flex;"
      ></AltFieldAvatar>`,
  }),
  argTypes: { ...altCoreFieldAvatarStoryMeta.argTypes },
  args: { ...altCoreFieldAvatarStoryMeta.args },
} satisfies Meta<AltFieldAvatar>

export default meta
type Story = StoryObj<AltFieldAvatar>

export const Playground: Story = { args: {} }
