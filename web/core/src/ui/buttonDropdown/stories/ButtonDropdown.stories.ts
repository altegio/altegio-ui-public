import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { omit, pick } from 'radash'
import { fn } from '@storybook/test'
import { type Meta, type StoryObj } from '@storybook/web-components'
import { action } from '@storybook/addon-actions'

import '~core/ui/buttonDropdown'

import { YCoreButtonDropdownTagName as tagName } from '~shared/constants'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { EFrameworkName } from '~shared/.storybook/enums/frameworkName'
import { getComponentStateTable, getComponentSlotsTable } from '~shared/.storybook/tables'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { EYSizes } from '~shared/types/global'

import { createCoreButtonDropdownProps, type IYCoreButtonDropdownProps } from '~core/ui/buttonDropdown/models/types'
import { EYCoreButtonDropdownIconTypes } from '~core/ui/buttonDropdown/models/types/internal'
import { EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'

import yCoreDropdownStoryMeta, { type IYCoreDropdownStorySlots } from '~core/ui/dropdown/stories/Dropdown.stories'
import yCoreDropdownListStoryMeta from '~core/ui/dropdownList/stories/DropdownList.stories'
import yCoreButtonStoryMeta from '~core/ui/button/stories/Button.stories'

import {
  createButtonDropdownParameters,
  BUTTON_DROPDOWN_STORIES_CONFIG,
  type TButtonDropdownStoryEmits,
} from './ButtonDropdown.stories.utils'

const SIZES = [EYSizes.SMALL, EYSizes.MEDIUM, EYSizes.LARGE] as const

/**
 * ButtonDropdown story properties
 */
export interface IButtonDropdownStoryProps extends IYCoreButtonDropdownProps, ITextStoryProps {}

/**
 * ButtonDropdown slots
 */
/**
 * ButtonDropdown slots:
 * - showActivatorSlot: Show activator slot content. Clicking this content opens the dropdown.
 * - showContentSlot: Show content slot content. This content appears in the open dropdown.
 */
export interface IButtonDropdownStorySlots {
  showActivatorSlot: boolean
  showContentSlot: boolean
}

export interface IYCoreButtonDropdownStorySlots extends IYCoreDropdownStorySlots {}

const { autoClose, iconType, variant } = createCoreButtonDropdownProps()

const yCoreButtonOmitKeys = ['iconLeft', 'iconRight', 'href', 'target', 'variant', 'onClick'] as const
const yCoreDropdownListPickKeys = ['items', 'onItemClick'] as const
const yCoreDropdownPickKeys = ['isOpen', 'showActivatorSlot', 'showContentSlot', 'onVisible'] as const

type TButtonDropdownStoryArgs = IYCoreButtonDropdownProps &
  IButtonDropdownStoryProps &
  TButtonDropdownStoryEmits &
  IButtonDropdownStorySlots
type TButtonDropdownStoryMeta = Meta<TButtonDropdownStoryArgs>

const parameters = createButtonDropdownParameters(EFrameworkName.LIT)

const meta: TButtonDropdownStoryMeta = {
  title: 'Buttons/🔍 ButtonDropdown',
  id: 'buttonDropdown',
  parameters: parameters,
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({
    disabled,
    loading,
    fullWidth,
    isOpen,
    autoClose,
    variant,
    size,
    iconType,
    items,
    label,
    alignment,
    showActivatorSlot,
    showContentSlot,
    isLongText,
  }) => {
    const handlers = {
      onItemClick: () => {
        action('onItemClick')()
      },
      onVisible: () => {
        action('onVisible')()
      },
    }

    return html`
      <div style="padding: 50px 50px 350px; margin: 20px; border: 1px dashed black; border-radius: 8px; overflow: auto">
        <y-core-button-dropdown
          label=${ifDefined(isLongText ? LOREM_IPSUM : label)}
          size=${ifDefined(size)}
          .disabled=${disabled}
          .loading=${loading}
          .fullWidth=${fullWidth}
          .isOpen=${isOpen}
          .autoClose=${autoClose}
          .variant=${variant}
          .iconType=${iconType}
          .items=${items}
          .alignment=${alignment}
          @item-click=${handlers.onItemClick}
          @change-visible=${handlers.onVisible}
        >
          ${showActivatorSlot && html` <span slot="activator"> ActivatorSlot </span> `}
          ${showContentSlot && html` <span slot="content"> ContentSlot </span> `}
        </y-core-button-dropdown>
      </div>
    `
  },
  argTypes: {
    ...omit(yCoreButtonStoryMeta.argTypes ?? {}, [...yCoreButtonOmitKeys]),
    ...pick(yCoreDropdownListStoryMeta.argTypes ?? {}, [...yCoreDropdownListPickKeys]),
    ...pick(yCoreDropdownStoryMeta.argTypes ?? {}, [...yCoreDropdownPickKeys]),
    variant: {
      control: { type: 'select' },
      description: 'Button style',
      options: Object.values(EYCoreSimpleButtonVariant),
      ...getComponentStateTable(variant),
    },
    iconType: {
      control: { type: 'radio' },
      options: Object.values(EYCoreButtonDropdownIconTypes),
      description: 'Icon placement (left or right)',
      ...getComponentStateTable(iconType),
    },
    autoClose: {
      control: { type: 'boolean' },
      description: 'Close the dropdown when its content slot is clicked',
      ...getComponentStateTable(autoClose),
    },
    showActivatorSlot: {
      type: 'boolean',
      description:
        '**Show activator slot content**\n\nClicking the activator content opens the dropdown.',
      ...getComponentSlotsTable('activator', 'nothing'),
    },
    showContentSlot: {
      type: 'boolean',
      description:
        '**Show content slot content**\n\nContent displayed inside the open dropdown.',
      ...getComponentSlotsTable('content', 'nothing'),
    },
  },
  args: {
    ...omit(yCoreButtonStoryMeta.args ?? {}, [...yCoreButtonOmitKeys]),
    ...pick(yCoreDropdownListStoryMeta.args ?? {}, [...yCoreDropdownListPickKeys]),
    ...pick(yCoreDropdownStoryMeta.args ?? {}, [...yCoreDropdownPickKeys]),
    variant,
    iconType,
    autoClose,
    onItemClick: fn(),
    onVisible: fn(),
  },
} satisfies TButtonDropdownStoryMeta

export default meta
type Story = StoryObj<TButtonDropdownStoryArgs>

export const Playground: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Playground.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Playground.args,
}

export const Variants: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <y-core-button-dropdown
        variant="primary"
        label="primary"
        .items=${args.items}
      ></y-core-button-dropdown>

      <y-core-button-dropdown
        variant="outline"
        label="outline"
        .items=${args.items}
      ></y-core-button-dropdown>

      <y-core-button-dropdown
        variant="text"
        label="text"
        .items=${args.items}
      ></y-core-button-dropdown>

      <y-core-button-dropdown
        variant="outline-filled"
        label="outline-filled"
        .items=${args.items}
      ></y-core-button-dropdown>
    </div>
  `,
}

export const Sizes: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Sizes.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => {
    const sizeRows = SIZES.map((size) => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <div style="width: 80px; font-weight: 500;">${size}:</div>
      <y-core-button-dropdown
        label=${size}
        size=${size}
        .items=${args.items}
      ></y-core-button-dropdown>
    </div>
    `)

    return html` <div style="display: grid; gap: 16px;">${sizeRows}</div> `
  },
}

export const States: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.States.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => {
    return html`
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <y-core-button-dropdown
          label="Default"
          .items=${args.items}
        ></y-core-button-dropdown>

        <y-core-button-dropdown
          label="Disabled"
          .disabled=${true}
          .items=${args.items}
        ></y-core-button-dropdown>

        <y-core-button-dropdown
          label="Loading"
          .loading=${true}
          .items=${args.items}
        ></y-core-button-dropdown>

        <y-core-button-dropdown
          label="Open"
          .isOpen=${true}
          .items=${args.items}
        ></y-core-button-dropdown>
      </div>
    `
  },
}

export const IconType: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.args,
  render: (args) => {
    return html`
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <y-core-button-dropdown
          .label=${args.label}
          .iconType=${EYCoreButtonDropdownIconTypes.LEFT}
          .items=${args.items}
        ></y-core-button-dropdown>

        <y-core-button-dropdown
          .label=${args.label}
          .iconType=${EYCoreButtonDropdownIconTypes.RIGHT}
          .items=${args.items}
        ></y-core-button-dropdown>
      </div>
    `
  },
}

export const FullWidth: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.args,
  render: (args) => {
    return html`
      <div style="min-height: 100px;">
        <y-core-button-dropdown
          label="Full-width button"
          .fullWidth=${true}
          .items=${args.items}
        ></y-core-button-dropdown>
      </div>
    `
  },
}
