import { html } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreDropdownExternalProps,
  type IAltCoreDropdownProps,
  EAltCoreDropdownTrigger,
  EAltCoreDropdownPlacement,
  EAltCoreDropdownStrategy,
  createCoreDropdownProps,
} from '../models/types'
import { AltCoreDropdownTagName as tagName } from '~shared/constants'
import { getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { onVisibleEmit } from '~shared/.storybook/argTypes'
import type { TAltCoreDropdownActionEvents } from '../models/types/events'

import '~core/ui/dropdown'
import '~core/ui/simpleButton'

export interface IAltCoreDropdownStorySlots {
  showActivatorSlot: boolean
  showContentSlot: boolean
}

export const mapTriggerToLabel: Record<EAltCoreDropdownTrigger, string> = {
  [EAltCoreDropdownTrigger.CLICK]: 'Click me',
  [EAltCoreDropdownTrigger.HOVER]: 'Hover over me',
  [EAltCoreDropdownTrigger.MANUAL]: 'Manual control',
}

const {
  trigger,
  isOpen,
  placement,
  strategy,
  padding,
  offset,
  transition,
  disabled,
  inline,
} = createCoreDropdownProps()

type TAltCoreMetaDropdown = Meta<IAltCoreDropdownProps & TAltCoreDropdownActionEvents & IAltCoreDropdownStorySlots>

/**
 * ## Core Dropdown
 */
const meta: TAltCoreMetaDropdown = {
  title: '⚙️ Dropdown',
  id: 'dropdown',
  component: tagName,
  tags: ['autodocs'],
  render: ({
    trigger,
    isOpen,
    placement,
    strategy,
    offset,
    padding,
    transition,
    disabled,
    inline,
    showActivatorSlot,
    showContentSlot,
    onVisible,
    onClickOutside,
  }) => html`
    <alt-core-dropdown
      .trigger=${trigger}
      .placement=${placement}
      .strategy=${strategy}
      .transition=${transition}
      .offset=${offset}
      .padding=${padding}
      .disabled=${disabled}
      .inline=${inline}
      ?is-open=${isOpen}
      @change-visible=${onVisible}
      @click-outside=${onClickOutside}
    >
      <div slot="activator">
        ${
          showActivatorSlot
            ? 'showActivatorSlot'
            : html`
              <alt-core-simple-button>${
                trigger
                  ? mapTriggerToLabel[trigger]
                  : mapTriggerToLabel[EAltCoreDropdownTrigger.CLICK]
              }</alt-core-simple-button>
            `
        }
      </div>

      <div slot="content" style="background-color: rgb(0 0 255 / 30%); border-radius: 10px; padding: 10px;">
        ${
          showContentSlot
            ? 'showContentSlot'
            : 'Dropdown content'
        }
      </div>
    </alt-core-dropdown>
  `,
  argTypes: {
    trigger: {
      control: 'select',
      options: Object.values(EAltCoreDropdownTrigger),
      description: 'Dropdown trigger',
      ...getComponentStateTable(trigger),
    },
    isOpen: {
      control: 'boolean',
      description: 'Control dropdown visibility in manual mode',
      ...getComponentStateTable(isOpen),
    },
    placement: {
      control: 'select',
      options: Object.values(EAltCoreDropdownPlacement),
      description: 'Dropdown placement',
      ...getComponentStateTable(placement),
    },
    strategy: {
      control: 'select',
      options: Object.values(EAltCoreDropdownStrategy),
      description: 'Positioning strategy',
      ...getComponentStateTable(strategy),
    },
    offset: {
      control: 'number',
      description: 'Dropdown offset',
      ...getComponentStateTable(offset),
    },
    padding: {
      control: 'number',
      description: 'Dropdown padding',
      ...getComponentStateTable(padding),
    },
    transition: {
      control: 'select',
      options: ['fade'],
      description: 'Dropdown entrance animation',
      ...getComponentStateTable(transition),
    },
    disabled: {
      control: 'boolean',
      description: 'Control the active state',
      ...getComponentStateTable(disabled),
    },
    inline: {
      control: 'boolean',
      description: 'Control the inline mode of the activator',
      ...getComponentStateTable(inline),
    },

    showActivatorSlot: {
      control: 'boolean',
      description: 'Show the "activator" slot',
      ...storyControlsTable,
    },
    showContentSlot: {
      control: 'boolean',
      description: 'Show the "content" slot',
      ...storyControlsTable,
    },

    onVisible: onVisibleEmit,
    onClickOutside: {
      ...onVisibleEmit,
      description: 'Emitted when clicking outside the dropdown',
    },
  },
  args: {
    ...createCoreDropdownExternalProps(),
    onVisible: fn(),
    onClickOutside: fn(),
  },
}

export default meta
type Story = StoryObj<TAltCoreMetaDropdown>

export const Playground: Story = { args: { } }
