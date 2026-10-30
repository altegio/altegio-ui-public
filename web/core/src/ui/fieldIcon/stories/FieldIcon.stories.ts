import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { pick } from 'radash'

import {
  type IAltCoreFieldIconProps,
} from '~core/ui/fieldIcon/models/types'
import {
  AltCoreFieldIconTagName as tagName,
} from '~shared/constants'

import altCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import altCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'

import '~core/ui/fieldIcon'

/**
 * ## Core FieldIcon
 */
const meta: Meta<IAltCoreFieldIconProps> = {
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
      <alt-core-field-icon
        .disabled=${disabled}
        .readonly=${readonly}
        .size=${size}
        .icon=${icon}
        .clickable=${clickable}
        style="border: 1px dashed;"
      ></alt-core-field-icon>
    `
  },
  argTypes: {
    ...pick(altCoreFieldWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size', 'clickable', 'readonly']),
    ...pick(altCoreIconStoryMeta.argTypes ?? {}, ['icon']),
  },
  args: {
    ...pick(altCoreFieldWrapperStoryMeta.args ?? {}, ['disabled', 'size', 'clickable', 'readonly']),
    ...pick(altCoreIconStoryMeta.args ?? {}, ['icon']),
  },
} satisfies Meta<IAltCoreFieldIconProps>

export default meta
type Story = StoryObj<IAltCoreFieldIconProps>

export const Playground: Story = { args: {} }
