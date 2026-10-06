import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { pick } from 'radash'

import {
  type IYCoreFieldIconProps,
} from '~core/ui/fieldIcon/models/types'
import {
  YCoreFieldIconTagName as tagName,
} from '~shared/constants'

import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import yCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'

import '~core/ui/fieldIcon'

/**
 * ## Core FieldIcon
 */
const meta: Meta<IYCoreFieldIconProps> = {
  title: 'Inputs/Partials/⚠️ FieldIcon',
  id: 'fieldIcon',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    readonly,
    size,
    icon,
    clickable,
  }) => {
    return html`
      <y-core-field-icon
        .disabled=${disabled}
        .readonly=${readonly}
        .size=${size}
        .icon=${icon}
        .clickable=${clickable}
        style="border: 1px dashed;"
      ></y-core-field-icon>
    `
  },
  argTypes: {
    ...pick(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size', 'clickable', 'readonly']),
    ...pick(yCoreIconStoryMeta.argTypes ?? {}, ['icon']),
  },
  args: {
    ...pick(yCoreFieldWrapperStoryMeta.args ?? {}, ['disabled', 'size', 'clickable', 'readonly']),
    ...pick(yCoreIconStoryMeta.args ?? {}, ['icon']),
  },
} satisfies Meta<IYCoreFieldIconProps>

export default meta
type Story = StoryObj<IYCoreFieldIconProps>

export const Playground: Story = { args: {} }
