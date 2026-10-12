/**
 * ## Tab
 * Individual tab for the tabs component
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
      description: 'Icon to the left of the text',
      ...getComponentContentTable(),
    },
    leftIconSize: {
      type: 'string',
      description: 'Left icon width and height. See https://developer.mozilla.org/en-US/docs/Web/CSS/width / https://developer.mozilla.org/en-US/docs/Web/CSS/height',
      ...getComponentContentTable(leftIconSize),
    },
    locator: {
      type: 'string',
      description: 'Data locator',
      ...getComponentContentTable(locator),
    },
    locatorCounter: {
      type: 'string',
      description: 'Data locator for the counter',
      ...getComponentContentTable(locatorTag),
    },
    locatorTag: {
      type: 'string',
      description: 'Data locator for the tag',
      ...getComponentContentTable(locatorCounter),
    },
    text: {
      type: 'string',
      description: 'Text',
      ...getComponentContentTable(text),
    },
    isCounterVisible: {
      type: 'boolean',
      description: 'Show the counter',
      ...getComponentContentTable(isCounterVisible),
    },
    counterValue: {
      type: 'number',
      description: 'Counter value',
      ...getComponentContentTable(counterValue),
    },
    isTagVisible: {
      type: 'boolean',
      description: 'Show a tag to the right of the text; tag text is also required',
      ...getComponentContentTable(isTagVisible),
    },
    tagText: {
      type: 'string',
      description: 'Tag text',
      ...getComponentContentTable(tagText),
    },
    tagVariant: {
      control: 'select',
      options: Object.values(EYCoreTagVariant),
      description: 'Tag variant',
      ...getComponentContentTable(tagVariant),
    },
    showBeforeSlot: {
      type: 'boolean',
      description: 'Show the "before" slot - content before the tab text',
      ...storyControlsTable,
    },
    showAfterSlot: {
      type: 'boolean',
      description: 'Show the "after" slot - content after the tab text',
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
