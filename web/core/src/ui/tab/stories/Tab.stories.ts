/**
 * ## Tab
 * Компонент таба для компонента табов
 */
import { html } from 'lit/static-html.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import { YCoreTabTagName as tagName } from '~shared/constants'
import { createCoreTabExternalProps, type IYCoreTabExternalProps } from '~core/ui/tab/models/types/external'
import { createCoreTabInternalProps } from '~core/ui/tab/models/types/internal'
import {
  disabled as disabledArgType,
  active as activeArgType,
} from '~shared/.storybook/argTypes'
import { getComponentContentTable, storyControlsTable } from '~shared/.storybook/tables'
import { EYCoreTagVariant } from '~core/ui/tag/models/types'

import '~core/ui/tab'
import '~core/ui/icon'
import '~core/ui/tag'

import { iconOptions } from '~core/ui/icon/stories/Icon.stories.ts'
import { nothing } from 'lit'
import { yAi } from '~shared/icons'
import { EYSizes } from '~shared/types/global.ts'

export interface IYCoreTabStorySlots {
  showBeforeSlot: boolean
  showAfterSlot: boolean
}

type IYCoreTabStoryMeta = IYCoreTabExternalProps & IYCoreTabStorySlots

const { text, isCounterVisible, isTagVisible, tagVariant, counterValue, leftIconSize, tagText, locator, locatorTag, locatorCounter } = {
  ...createCoreTabExternalProps(),
  ...createCoreTabInternalProps(),
}

const meta: Meta<IYCoreTabStoryMeta> = {
  title: '✅ Tab',
  id: 'tab',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    leftIcon,
    leftIconSize,
    active,
    disabled,
    text,
    isCounterVisible,
    isTagVisible,
    tagText,
    tagVariant,
    counterValue,
    showBeforeSlot,
    showAfterSlot,
  }) => html`
    <y-core-tab
      .leftIcon=${leftIcon}
      .leftIconSize=${leftIconSize}
      .active=${active}
      .disabled=${disabled}
      .text=${text}
      .isCounterVisible=${isCounterVisible}
      .isTagVisible=${isTagVisible}
      .tagText=${tagText}
      .tagVariant=${tagVariant}
      .counterValue=${counterValue}
    >
      ${showBeforeSlot
        ? html`
            <div slot="before">
              <y-core-icon .icon=${yAi} size="16px"></y-core-icon>
            </div>
          `
      : nothing}
        
      
      ${showAfterSlot
        ? html`
            <div slot="after">
              <y-core-tag .variant=${EYCoreTagVariant.ACCENT} .size=${EYSizes.SMALL}>Slot Tag</y-core-tag>
            </div>
          `
      : nothing}
    </y-core-tab>
  `,
  argTypes: {
    active: activeArgType,
    disabled: disabledArgType,
    leftIcon: {
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Иконка слева от текста',
      ...getComponentContentTable(),
    },
    leftIconSize: {
      type: 'string',
      description: 'Размер иконки слева, width и height. Подробнее - https://developer.mozilla.org/ru/docs/Web/CSS/width / https://developer.mozilla.org/ru/docs/Web/CSS/height',
      ...getComponentContentTable(leftIconSize),
    },
    locator: {
      type: 'string',
      description: 'Локатор',
      ...getComponentContentTable(locator),
    },
    locatorCounter: {
      type: 'string',
      description: 'Локатор счетчика',
      ...getComponentContentTable(locatorTag),
    },
    locatorTag: {
      type: 'string',
      description: 'Локатор тега',
      ...getComponentContentTable(locatorCounter),
    },
    text: {
      type: 'string',
      description: 'Текст',
      ...getComponentContentTable(text),
    },
    isCounterVisible: {
      type: 'boolean',
      description: 'Делает счетчик видимым',
      ...getComponentContentTable(isCounterVisible),
    },
    counterValue: {
      type: 'number',
      description: 'Значение для счетчика',
      ...getComponentContentTable(counterValue),
    },
    isTagVisible: {
      type: 'boolean',
      description: 'Делает тег справа от текста видимым (также нужно указать еще текст для тега)',
      ...getComponentContentTable(isTagVisible),
    },
    tagText: {
      type: 'string',
      description: 'Текст внутри тега',
      ...getComponentContentTable(tagText),
    },
    tagVariant: {
      control: 'select',
      options: Object.values(EYCoreTagVariant),
      description: 'Вариант тега',
      ...getComponentContentTable(tagVariant),
    },
    showBeforeSlot: {
      type: 'boolean',
      description: 'Показать слот "before" - слот контента перед текстом таба',
      ...storyControlsTable,
    },
    showAfterSlot: {
      type: 'boolean',
      description: 'Показать слот "after" - слот контента после текста таба',
      ...storyControlsTable,
    },
  },
  args: {
    ...createCoreTabExternalProps(),
    text: 'Tab 1',
    tagVariant,
    tagText: '',
    leftIconSize,
    showBeforeSlot: false,
    showAfterSlot: false,
  },
} satisfies Meta<IYCoreTabStoryMeta>

export default meta
type Story = StoryObj<IYCoreTabStoryMeta>

export const Playground: Story = {}
