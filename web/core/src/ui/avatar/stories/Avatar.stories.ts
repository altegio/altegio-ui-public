import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/avatar'

import {
  type IAltCoreAvatarExternalProps,
  createCoreAvatarProps,
} from '../models/types'
import {
  AltCoreAvatarTagName as tagName,
} from '~shared/constants'
import { EAltSizes } from '~shared/types/global'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { altSearch, altRocket } from '~shared/icons'

const { size, initials, photo, icon, disabled } = createCoreAvatarProps()

const iconOptions = {
  search: altSearch,
  rocket: altRocket,
}

/**
 * ## Avatar
 *
 * Displays a user avatar.
 *
 * ### Use cases
 * - Display a user photo
 * - Display initials when no photo is available
 * - Choose a size to suit the context
 *
 * ### Note
 * Use https://i.pravatar.cc for sample avatar images
 * Several image sizes are available, for example:
 * - https://i.pravatar.cc/150
 * - https://i.pravatar.cc/300
 * - https://i.pravatar.cc/500
 */
const meta: Meta<IAltCoreAvatarExternalProps> = {
  title: 'Avatar',
  id: 'avatar',
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({
    size,
    initials,
    photo,
    icon,
    disabled,
  }) => {
    return html`
      <alt-core-avatar
        size=${ifDefined(size)} 
        initials=${ifDefined(initials)}
        photo=${ifDefined(photo)}
        .icon=${icon}
        .disabled=${disabled}
      ></alt-core-avatar>
    `
  },
  argTypes: {
    size: {
      control: 'select',
      options: [EAltSizes.LARGE, EAltSizes.MEDIUM, EAltSizes.SMALL, EAltSizes.EXTRA_SMALL],
      description: 'Avatar size',
      ...getComponentContentTable(size),
    },
    initials: {
      control: 'text',
      description: 'User initials',
      ...getComponentContentTable(initials),
    },
    photo: {
      control: 'text',
      description: 'Photo URL',
      ...getComponentContentTable(photo),
    },
    icon: {
      control: { type: 'select' },
      description: 'Icon displayed in the button',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(icon),
    },
    disabled: {
      control: 'boolean',
      description: 'Avatar disabled state',
      ...getComponentContentTable(disabled),
    },
  },
  args: {
    size: EAltSizes.MEDIUM,
    initials: 'Altegio Clients',
    disabled: false,
  },
} satisfies Meta<IAltCoreAvatarExternalProps>

export default meta
type Story = StoryObj<IAltCoreAvatarExternalProps>

// Basic example
export const Playground: Story = { args: { photo: '' } }

// All sizes
export const AllSizes: Story = {
  render: ({ disabled }) => html`
    <div style="display: flex; align-items: center; gap: 10px;">
      <alt-core-avatar size="extra-small" initials="Altegio Clients" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="small" initials="Altegio Clients" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="medium" initials="Altegio Clients" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="large" initials="Altegio Clients" .disabled=${disabled}></alt-core-avatar>
    </div>
  `,
}

// With a photo
export const WithPhotoAllSizes: Story = {
  render: ({ disabled }) => html`
    <div style="display: flex; align-items: center; gap: 10px;">
      <alt-core-avatar size="extra-small" photo="https://i.pravatar.cc/300" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="small" photo="https://i.pravatar.cc/300" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="medium" photo="https://i.pravatar.cc/300" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="large" photo="https://i.pravatar.cc/300" .disabled=${disabled}></alt-core-avatar>
    </div>
  `,
}

// With a photo that fails to load
export const WithPhotoErrorAllSizes: Story = {
  render: ({ disabled }) => html`
    <div style="display: flex; align-items: center; gap: 10px;">
      <alt-core-avatar size="extra-small" photo="invalid-url" initials="Altegio Clients" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="small" photo="invalid-url" initials="Altegio Clients" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="medium" photo="invalid-url" initials="Altegio Clients" .disabled=${disabled}></alt-core-avatar>
      
      <alt-core-avatar size="large" photo="invalid-url" initials="Altegio Clients" .disabled=${disabled}></alt-core-avatar>
    </div>
  `,
}

// With an icon
export const WithIconAllSizes: Story = {
  render: ({ disabled }) => html`
    <div style="display: flex; align-items: center; gap: 10px;">
      <alt-core-avatar size="extra-small" .icon=${altSearch} .disabled=${disabled}></alt-core-avatar>

      <alt-core-avatar size="small" .icon=${altSearch} .disabled=${disabled}></alt-core-avatar>

      <alt-core-avatar size="medium" .icon=${altSearch} .disabled=${disabled}></alt-core-avatar>

      <alt-core-avatar size="large" .icon=${altSearch} .disabled=${disabled}></alt-core-avatar>
    </div>
  `,
}
