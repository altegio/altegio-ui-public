import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { pick } from 'radash'

import {
  type IYCoreFieldAvatarProps,
} from '~core/ui/fieldAvatar/models/types'
import {
  YCoreFieldAvatarTagName as tagName,
} from '~shared/constants'

import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import yCoreAvatarStoryMeta from '~core/ui/avatar/stories/Avatar.stories'

import '~core/ui/fieldAvatar'

/**
 * ## Core FieldAvatar
 */
const meta: Meta<IYCoreFieldAvatarProps> = {
  title: 'Inputs/Partials/⚠️ FieldAvatar',
  id: 'fieldAvatar',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    size,
    photo,
    initials,
    icon,
  }) => {
    return html`
      <y-core-field-avatar
        .disabled=${disabled}
        .size=${size}
        .photo=${photo}
        .initials=${initials}
        .icon=${icon}
        style="border: 1px dashed;"
      ></y-core-field-avatar>
    `
  },
  argTypes: {
    ...pick(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size']),
    ...pick(yCoreAvatarStoryMeta.argTypes ?? {}, ['photo', 'initials', 'icon']),
  },
  args: {
    ...pick(yCoreFieldWrapperStoryMeta.args ?? {}, ['disabled', 'size']),
    ...pick(yCoreAvatarStoryMeta.args ?? {}, ['photo', 'initials', 'icon']),
    photo: 'https://i.pravatar.cc/300',
  },
} satisfies Meta<IYCoreFieldAvatarProps>

export default meta
type Story = StoryObj<IYCoreFieldAvatarProps>

export const Playground: Story = { args: {} }
