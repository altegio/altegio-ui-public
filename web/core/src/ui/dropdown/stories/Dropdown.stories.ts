import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreDropdownExternalProps,
  type IYCoreDropdownProps,
  EYCoreDropdownTrigger,
  EYCoreDropdownPlacement,
  EYCoreDropdownStrategy,
  createCoreDropdownProps,
} from '../models/types'
import { YCoreDropdownTagName as tagName } from '~shared/constants'
import { getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { onVisibleEmit } from '~shared/.storybook/argTypes'
import type { TYCoreDropdownActionEvents } from '../models/types/events'

import '~core/ui/dropdown'
import '~core/ui/simpleButton'

export interface IYCoreDropdownStorySlots {
  showActivatorSlot: boolean
  showContentSlot: boolean
}

export const mapTriggerToLabel: Record<EYCoreDropdownTrigger, string> = {
  [EYCoreDropdownTrigger.CLICK]: 'Нажмите меня',
  [EYCoreDropdownTrigger.HOVER]: 'Наведите меня',
  [EYCoreDropdownTrigger.MANUAL]: 'Управление вручную',
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

type TYCoreMetaDropdown = Meta<IYCoreDropdownProps & TYCoreDropdownActionEvents & IYCoreDropdownStorySlots>

/**
 * ## Core Dropdown
 */
const meta: TYCoreMetaDropdown = {
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
    <y-core-dropdown
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
              <y-core-simple-button>${
                trigger
                  ? mapTriggerToLabel[trigger]
                  : mapTriggerToLabel[EYCoreDropdownTrigger.CLICK]
              }</y-core-simple-button>
            `
        }
      </div>

      <div slot="content" style="background-color: rgb(0 0 255 / 30%); border-radius: 10px; padding: 10px;">
        ${
          showContentSlot
            ? 'showContentSlot'
            : 'Содержимое выпадающей области'
        }
      </div>
    </y-core-dropdown>
  `,
  argTypes: {
    trigger: {
      control: 'select',
      options: Object.values(EYCoreDropdownTrigger),
      description: 'Тип активации выпадающей области',
      ...getComponentStateTable(trigger),
    },
    isOpen: {
      control: 'boolean',
      description: 'Управление видимостью выпадающей области в режиме manual',
      ...getComponentStateTable(isOpen),
    },
    placement: {
      control: 'select',
      options: Object.values(EYCoreDropdownPlacement),
      description: 'Расположение выпадающей области',
      ...getComponentStateTable(placement),
    },
    strategy: {
      control: 'select',
      options: Object.values(EYCoreDropdownStrategy),
      description: 'Стратегия позиционирования',
      ...getComponentStateTable(strategy),
    },
    offset: {
      control: 'number',
      description: 'Смещение выпадающей области',
      ...getComponentStateTable(offset),
    },
    padding: {
      control: 'number',
      description: 'Отступы выпадающей области',
      ...getComponentStateTable(padding),
    },
    transition: {
      control: 'select',
      options: ['fade'],
      description: 'Тип анимации появления выпадающей области',
      ...getComponentStateTable(transition),
    },
    disabled: {
      control: 'boolean',
      description: 'Управление активностью компонента',
      ...getComponentStateTable(disabled),
    },
    inline: {
      control: 'boolean',
      description: 'Управление режимом inline у активатора',
      ...getComponentStateTable(inline),
    },

    showActivatorSlot: {
      control: 'boolean',
      description: 'Показать слот "activator"',
      ...storyControlsTable,
    },
    showContentSlot: {
      control: 'boolean',
      description: 'Показать слот "content"',
      ...storyControlsTable,
    },

    onVisible: onVisibleEmit,
    onClickOutside: {
      ...onVisibleEmit,
      description: 'Событие срабатывает при клике вне выпадающей области',
    },
  },
  args: {
    ...createCoreDropdownExternalProps(),
    onVisible: fn(),
    onClickOutside: fn(),
  },
}

export default meta
type Story = StoryObj<TYCoreMetaDropdown>

export const Playground: Story = { args: { } }
