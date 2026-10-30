import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { pick } from 'radash'

import {
  type IAltCoreFieldAvatarProps,
} from '~core/ui/fieldAvatar/models/types'
import {
  AltCoreFieldAvatarTagName as tagName,
} from '~shared/constants'

import altCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import altCoreAvatarStoryMeta from '~core/ui/avatar/stories/Avatar.stories'

import '~core/ui/fieldAvatar'

/**
 * ## Core FieldAvatar
 */
const meta: Meta<IAltCoreFieldAvatarProps> = {
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
      <alt-core-field-avatar
        .disabled=${disabled}
        .size=${size}
        .photo=${photo}
        .initials=${initials}
        .icon=${icon}
        style="border: 1px dashed;"
      ></alt-core-field-avatar>
    `
  },
  argTypes: {
    ...pick(altCoreFieldWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size']),
    ...pick(altCoreAvatarStoryMeta.argTypes ?? {}, ['photo', 'initials', 'icon']),
  },
  args: {
    ...pick(altCoreFieldWrapperStoryMeta.args ?? {}, ['disabled', 'size']),
    ...pick(altCoreAvatarStoryMeta.args ?? {}, ['photo', 'initials', 'icon']),
    photo: 'https://i.pravatar.cc/300',
  },
} satisfies Meta<IAltCoreFieldAvatarProps>

export default meta
type Story = StoryObj<IAltCoreFieldAvatarProps>

export const Playground: Story = { args: {} }
