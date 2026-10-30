/**
 * ## Tabs
 */
import { html } from 'lit/static-html.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import { useState, useEffect } from 'storybook/preview-api'

import { AltCoreTabsTagName as tagName } from '~shared/constants'
import { items as itemsArgType } from '~shared/.storybook/argTypes'
import { getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'

import '~core/ui/tabs'
import type { ChangeActiveTabEvent } from '~core/ui/tabs/models/types'
import { createCoreTabsExternalProps } from '~core/ui/tabs/models/types'
import {
  type IAltCoreTabsExternalProps, type IAltCoreTabsItem,
} from '~core/ui/tabs/models/types'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'
import { altAi } from '~shared/icons'
import { repeat } from 'lit/directives/repeat.js'
import { nothing } from 'lit'

export interface IAltCoreTabsStorySlots {
  showDefaultSlot: boolean
}

export type TAltCoreTabsStoryMeta = IAltCoreTabsExternalProps & IAltCoreTabsStorySlots

const TABS_COUNT = 5

const tabDefaultProps = createCoreTabExternalProps()

const { value, tabs } = createCoreTabsExternalProps()

const tabItems: IAltCoreTabsItem[] = Array.from(Array(TABS_COUNT).keys())
  .map((i) => (
    {
      ...tabDefaultProps,
      text: `Tab ${i + 1}`,
    }
  ))
  .concat({
    ...tabDefaultProps,
    text: 'Tab with icon',
    leftIcon: altAi,
    leftIconSize: '16px',
  })
  .concat({
    ...tabDefaultProps,
    text: 'Disabled Tab with icon and counter',
    leftIcon: altAi,
    leftIconSize: '16px',
    isCounterVisible: true,
    counterValue: 16,
    disabled: true,
  })
  .concat({
    ...tabDefaultProps,
    text: 'Tab with icon and counter',
    leftIcon: altAi,
    leftIconSize: '16px',
    isCounterVisible: true,
    counterValue: 16,
  })
  .concat({
    ...tabDefaultProps,
    text: 'Tab with icon and counter and tag',
    leftIcon: altAi,
    leftIconSize: '16px',
    isCounterVisible: true,
    counterValue: 16,
    isTagVisible: true,
    tagText: 'New',
  })

const meta: Meta<TAltCoreTabsStoryMeta> = {
  title: '✅ Tabs',
  id: 'tabs',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    tabs,
    value,
    showDefaultSlot,
  }) => {
    useEffect(() => {
      setActiveTab(value)
    }, [value])

    const [activeTab, setActiveTab] = useState(value)

    const changeTabHandler = (ev: ChangeActiveTabEvent) => {
      const { detail } = ev

      setActiveTab(detail.value)
    }

    const slotTabs = () => {
      if (!tabs) return nothing

      return repeat(
        tabs.slice(0, 3),
        (_, index) => index,
        (item, index) => html`
          <alt-core-tab
            .active=${index === activeTab}
            .disabled=${item.disabled}
            .isTagVisible=${item.isTagVisible}
            .tagText=${item.tagText}
            .isCounterVisible=${item.isCounterVisible}
            .text=${item.text}
            .counterValue=${item.counterValue}
            .tagVariant=${item.tagVariant}
            .leftIcon=${item.leftIcon}
            .leftIconSize=${item.leftIconSize}
            @click=${() => {
          setActiveTab(index)
        }}
          ></alt-core-tab>
        `,
      )
    }

    return html`
      <alt-core-tabs
        .tabs=${tabs}
        .value=${activeTab}
        @change-active-tab=${changeTabHandler}
      >${showDefaultSlot
          ? slotTabs()
          : nothing
        }</alt-core-tabs>
    `
  },
  argTypes: {
    tabs: {
      ...itemsArgType,
      ...getComponentStateTable(tabs),
      description: 'Tab items',
    },
    value: {
      type: 'number',
      description: 'Index of the active tab',
      ...getComponentStateTable(value),
    },
    showDefaultSlot: {
      type: 'boolean',
      description: 'Show the "default" slot - slot for tab items',
      ...storyControlsTable,
    },
  },
  args: { tabs: tabItems, value: 0, showDefaultSlot: false },
} satisfies Meta<TAltCoreTabsStoryMeta>

export default meta
type Story = StoryObj<TAltCoreTabsStoryMeta>

export const Playground: Story = { args: {} }
