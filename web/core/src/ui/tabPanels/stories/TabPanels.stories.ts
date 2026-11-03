import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from 'storybook/preview-api'

import { createCoreTabPanelsProps, type IAltCoreTabPanelsProps } from '~core/ui/tabPanels/models/types'
import type { ChangeActiveTabEvent, IAltCoreTabsItem } from '~core/ui/tabs/models/types'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types/external'
import { AltCoreTabPanelsTagName as tagName } from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'

import '~core/ui/tabs'
import '~core/ui/tabPanels'
import '~core/ui/tabPanel'

const { value } = createCoreTabPanelsProps()

export const storyTabs: IAltCoreTabsItem[] = ['Services', 'Staff', 'Schedule']
  .map((text) => ({ ...createCoreTabExternalProps(), text }))

/**
 * ## Core Tab Panels
 * The content area of a tabbed interface: shows the `alt-core-tab-panel` whose `name` equals `value`.
 *
 * - Bind `value` to the selected tab. With `alt-core-tabs`, which selects tabs by index, name the panels `0`, `1`, `2`…
 * - Every panel host has `role="tabpanel"`. Name it with `labelledby` (the id of its tab) or `label`.
 * - The visible panel is focusable (`tabindex="0"`), as the WAI-ARIA tabs pattern recommends.
 * - Hidden panels stay in the DOM, so their content keeps its state.
 */
const meta: Meta<IAltCoreTabPanelsProps> = {
  title: '✅ TabPanels',
  id: 'tabPanels',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: () => {
    const [args, updateArgs] = useArgs<IAltCoreTabPanelsProps>()

    const handleChangeActiveTab = (event: ChangeActiveTabEvent) => {
      updateArgs({ value: event.detail.value })
    }

    return html`
      <alt-core-tabs
        .tabs=${storyTabs}
        .value=${Number(args.value ?? 0)}
        @change-active-tab=${handleChangeActiveTab}
      ></alt-core-tabs>

      <alt-core-tab-panels .value=${args.value} style="padding-top: 16px;">
        <alt-core-tab-panel name="0" label="Services">
          <p>Haircut, coloring and styling.</p>
          
          <label>Search services <input type="search"></label>
        </alt-core-tab-panel>

        <alt-core-tab-panel name="1" label="Staff">
          <p>Five specialists work at this location.</p>
        </alt-core-tab-panel>

        <alt-core-tab-panel name="2" label="Schedule">
          <p>Open every day from 9:00 to 21:00.</p>
        </alt-core-tab-panel>
      </alt-core-tab-panels>
    `
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: [0, 1, 2],
      description: 'Name of the visible panel',
      ...getComponentStateTable(value),
    },
  },
  args: { value: 0 },
}

export default meta
type Story = StoryObj<IAltCoreTabPanelsProps>

export const Playground: Story = {}
