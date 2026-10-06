import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreColorIconProps,
  EYCoreColorIconVariant,
  EYCoreColorIconSize,
  type IYCoreColorIconProps,
} from '~core/ui/colorIcon/models/types'
import { YCoreColorIconTagName as tagName } from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'
import {
  disabled as disabledArgType,
  numericSize as numericSizeArgType,
} from '~shared/.storybook/argTypes'
import yCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'
import { yMagic } from '~shared/icons'

import '~core/ui/colorIcon'

const { size, variant, disabled } = createCoreColorIconProps()

type TYCoreColorIconMeta = Meta<IYCoreColorIconProps>

/**
 * ## Core ColorIcon
 */
const meta: TYCoreColorIconMeta = {
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
      <y-core-color-icon
        .icon=${icon}
        .size=${size}
        .variant=${variant}
        .disabled=${disabled}
      >
      </y-core-color-icon>
    `
  },
  argTypes: {
    ...pick(yCoreIconStoryMeta.argTypes ?? {}, ['icon']),
    size: {
      ...numericSizeArgType(Object.values(EYCoreColorIconSize)),
      ...getComponentStateTable(size),
    },
    variant: {
      control: 'select',
      options: Object.values(EYCoreColorIconVariant),
      description: 'Icon variant',
      ...getComponentStateTable(variant),
    },
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
  },
  args: {
    icon: yMagic,
    size: EYCoreColorIconSize.X_24,
    variant: EYCoreColorIconVariant.GREY,
    disabled: false,
  },
} satisfies TYCoreColorIconMeta

export default meta
type Story = StoryObj<IYCoreColorIconProps>

export const Playground: Story = { args: {} }
