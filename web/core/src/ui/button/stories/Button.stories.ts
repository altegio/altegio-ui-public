import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { ifDefined } from 'lit/directives/if-defined.js'
import { omit } from 'radash'

import '~core/ui/button'

import { YCoreButtonTagName as tagName } from '~shared/constants'
import {
  createCoreButtonProps,
  type IYCoreButtonProps,
} from '~core/ui/button/models/types'
import { ySearch, yRocket } from '~shared/icons'
import {
  getComponentContentTable,
} from '~shared/.storybook/tables'
import {
  type ITextStoryProps,
} from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import yCoreSimpleButtonStoryMeta, { type ISimpleButtonStoryEmits } from '~core/ui/simpleButton/stories/SimpleButton.stories'

const iconOptions = {
  search: ySearch,
  rocket: yRocket,
}

const { label, iconLeft, iconRight } = { ...createCoreButtonProps() }

type TButtonStoryMeta = Meta<IYCoreButtonProps & ITextStoryProps & ISimpleButtonStoryEmits>

/**
 * ## Core Button
 *
 */
const meta: TButtonStoryMeta = {
  title: 'Buttons/✅ Button',
  id: 'button',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    href,
    label,
    target,
    variant,
    size,
    disabled,
    loading,
    alignment,
    fullWidth,
    iconLeft,
    iconRight,
    isLongText,
    onClick,
  }) => html`
    <y-core-button
      href=${ifDefined(href)}
      label=${ifDefined(isLongText ? LOREM_IPSUM : label)}
      target=${ifDefined(target)}
      variant=${ifDefined(variant)}
      size=${ifDefined(size)}
      alignment=${ifDefined(alignment)}
      .disabled=${disabled}
      .loading=${loading}
      .fullWidth=${fullWidth}
      .iconLeft=${iconLeft}
      .iconRight=${iconRight}
      @click=${onClick}
    ></y-core-button>
  `,
  argTypes: {
    ...omit(
      yCoreSimpleButtonStoryMeta.argTypes,
      ['text', 'showDefaultSlot', 'hostStyles'],
    ),
    label: {
      type: 'string',
      description: 'Button text',
      ...getComponentContentTable(label),
    },
    iconLeft: {
      control: { type: 'select' },
      description: 'Icon before the button content',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(iconLeft),
    },
    iconRight: {
      control: { type: 'select' },
      description: 'Icon after the button content',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(iconRight),
    },
  },
  args: {
    ...omit(
      yCoreSimpleButtonStoryMeta.args,
      ['text', 'showDefaultSlot', 'hostStyles'],
    ),
    ...createCoreButtonProps(),
    label: 'Button (label prop)',
  },
} satisfies TButtonStoryMeta

export default meta
type Story = StoryObj<TButtonStoryMeta>

export const Playground: Story = { args: {} }
