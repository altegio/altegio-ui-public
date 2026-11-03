import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { omit, pick } from 'radash'
import { fn } from 'storybook/test'
import { type Meta, type StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'

import '~core/ui/buttonDropdown'

import { AltCoreButtonDropdownTagName as tagName } from '~shared/constants'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { EFrameworkName } from '~shared/.storybook/enums/frameworkName'
import { getComponentStateTable, getComponentSlotsTable } from '~shared/.storybook/tables'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'

import { createCoreButtonDropdownProps, type IAltCoreButtonDropdownProps } from '~core/ui/buttonDropdown/models/types'
import { EAltCoreButtonDropdownIconTypes } from '~core/ui/buttonDropdown/models/types/internal'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'

import altCoreDropdownStoryMeta, { type IAltCoreDropdownStorySlots } from '~core/ui/dropdown/stories/Dropdown.stories'
import altCoreDropdownListStoryMeta from '~core/ui/dropdownList/stories/DropdownList.stories'
import altCoreButtonStoryMeta from '~core/ui/button/stories/Button.stories'

import {
  createButtonDropdownParameters,
  BUTTON_DROPDOWN_STORIES_CONFIG,
  type TButtonDropdownStoryEmits,
} from './ButtonDropdown.stories.utils'

const SIZES = [EAltSizes.SMALL, EAltSizes.MEDIUM, EAltSizes.LARGE] as const

/**
 * ButtonDropdown story properties
 */
export interface IButtonDropdownStoryProps extends IAltCoreButtonDropdownProps, ITextStoryProps {}

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

export interface IAltCoreButtonDropdownStorySlots extends IAltCoreDropdownStorySlots {}

const { autoClose, iconType, variant } = createCoreButtonDropdownProps()

const altCoreButtonOmitKeys = ['iconLeft', 'iconRight', 'href', 'target', 'variant', 'onClick'] as const
const altCoreDropdownListPickKeys = ['items', 'onItemClick'] as const
const altCoreDropdownPickKeys = ['isOpen', 'showActivatorSlot', 'showContentSlot', 'onVisible'] as const

type TButtonDropdownStoryArgs = IAltCoreButtonDropdownProps &
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
        <alt-core-button-dropdown
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
        </alt-core-button-dropdown>
      </div>
    `
  },
  argTypes: {
    ...omit(altCoreButtonStoryMeta.argTypes ?? {}, [...altCoreButtonOmitKeys]),
    ...pick(altCoreDropdownListStoryMeta.argTypes ?? {}, [...altCoreDropdownListPickKeys]),
    ...pick(altCoreDropdownStoryMeta.argTypes ?? {}, [...altCoreDropdownPickKeys]),
    variant: {
      control: { type: 'select' },
      description: 'Button style',
      options: Object.values(EAltCoreSimpleButtonVariant),
      ...getComponentStateTable(variant),
    },
    iconType: {
      control: { type: 'radio' },
      options: Object.values(EAltCoreButtonDropdownIconTypes),
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
    ...omit(altCoreButtonStoryMeta.args ?? {}, [...altCoreButtonOmitKeys]),
    ...pick(altCoreDropdownListStoryMeta.args ?? {}, [...altCoreDropdownListPickKeys]),
    ...pick(altCoreDropdownStoryMeta.args ?? {}, [...altCoreDropdownPickKeys]),
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
      <alt-core-button-dropdown
        variant="primary"
        label="primary"
        .items=${args.items}
      ></alt-core-button-dropdown>

      <alt-core-button-dropdown
        variant="outline"
        label="outline"
        .items=${args.items}
      ></alt-core-button-dropdown>

      <alt-core-button-dropdown
        variant="text"
        label="text"
        .items=${args.items}
      ></alt-core-button-dropdown>

      <alt-core-button-dropdown
        variant="outline-filled"
        label="outline-filled"
        .items=${args.items}
      ></alt-core-button-dropdown>
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
      <alt-core-button-dropdown
        label=${size}
        size=${size}
        .items=${args.items}
      ></alt-core-button-dropdown>
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
        <alt-core-button-dropdown
          label="Default"
          .items=${args.items}
        ></alt-core-button-dropdown>

        <alt-core-button-dropdown
          label="Disabled"
          .disabled=${true}
          .items=${args.items}
        ></alt-core-button-dropdown>

        <alt-core-button-dropdown
          label="Loading"
          .loading=${true}
          .items=${args.items}
        ></alt-core-button-dropdown>

        <alt-core-button-dropdown
          label="Open"
          .isOpen=${true}
          .items=${args.items}
        ></alt-core-button-dropdown>
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
        <alt-core-button-dropdown
          .label=${args.label}
          .iconType=${EAltCoreButtonDropdownIconTypes.LEFT}
          .items=${args.items}
        ></alt-core-button-dropdown>

        <alt-core-button-dropdown
          .label=${args.label}
          .iconType=${EAltCoreButtonDropdownIconTypes.RIGHT}
          .items=${args.items}
        ></alt-core-button-dropdown>
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
        <alt-core-button-dropdown
          label="Full-width button"
          .fullWidth=${true}
          .items=${args.items}
        ></alt-core-button-dropdown>
      </div>
    `
  },
}
