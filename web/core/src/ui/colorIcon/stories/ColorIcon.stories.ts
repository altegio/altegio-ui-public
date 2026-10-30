import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreColorIconProps,
  EAltCoreColorIconVariant,
  EAltCoreColorIconSize,
  type IAltCoreColorIconProps,
} from '~core/ui/colorIcon/models/types'
import { AltCoreColorIconTagName as tagName } from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'
import {
  disabled as disabledArgType,
  numericSize as numericSizeArgType,
} from '~shared/.storybook/argTypes'
import altCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'
import { altMagic } from '~shared/icons'

import '~core/ui/colorIcon'

const { size, variant, disabled } = createCoreColorIconProps()

type TAltCoreColorIconMeta = Meta<IAltCoreColorIconProps>

/**
 * ## Core ColorIcon
 */
const meta: TAltCoreColorIconMeta = {
  title: 'Icons/⚠️ ColorIcon',
  id: 'colorIcon',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    icon,
    size,
    variant,
    disabled,
  }) => {
    return html`
      <alt-core-color-icon
        .icon=${icon}
        .size=${size}
        .variant=${variant}
        .disabled=${disabled}
      >
      </alt-core-color-icon>
    `
  },
  argTypes: {
    ...pick(altCoreIconStoryMeta.argTypes ?? {}, ['icon']),
    size: {
      ...numericSizeArgType(Object.values(EAltCoreColorIconSize)),
      ...getComponentStateTable(size),
    },
    variant: {
      control: 'select',
      options: Object.values(EAltCoreColorIconVariant),
      description: 'Icon variant',
      ...getComponentStateTable(variant),
    },
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
  },
  args: {
    icon: altMagic,
    size: EAltCoreColorIconSize.X_24,
    variant: EAltCoreColorIconVariant.GREY,
    disabled: false,
  },
} satisfies TAltCoreColorIconMeta

export default meta
type Story = StoryObj<IAltCoreColorIconProps>

export const Playground: Story = { args: {} }
