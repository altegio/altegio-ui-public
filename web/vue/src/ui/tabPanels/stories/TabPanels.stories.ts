import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { AltTabs } from '~vue/ui/tabs'
import { AltTabPanels } from '~vue/ui/tabPanels'
import { AltTabPanel } from '~vue/ui/tabPanel'
import type { IAltVueTabPanelsProps } from '~vue/ui/tabPanels/models/types'
import { storyTabs } from '~core/ui/tabPanels/stories/TabPanels.stories'

/**
 * Vue wrapper for Core Tab Panels.
 *
 * Only the active panel renders its content; with `keep-alive`, a panel keeps its content once it has been shown.
 */
const meta: Meta<IAltVueTabPanelsProps> = {
  title: '✅ TabPanels',
  id: 'tabPanels',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltTabs, AltTabPanels, AltTabPanel },
    setup() {
      const tab = ref(0)

      return { args, tab, storyTabs }
    },
    template: `
      <AltTabs v-model="tab" :tabs="storyTabs" />

      <AltTabPanels v-model="tab" :keep-alive="args.keepAlive" style="padding-top: 16px;">
        <AltTabPanel :name="0" label="Services">
          <p>Haircut, coloring and styling.</p>
          
          <label>Search services <input type="search"></label>
        </AltTabPanel>

        <AltTabPanel :name="1" label="Staff">
          <p>Five specialists work at this location.</p>
        </AltTabPanel>

        <AltTabPanel :name="2" label="Schedule">
          <p>Open every day from 9:00 to 21:00.</p>
        </AltTabPanel>
      </AltTabPanels>
    `,
  }),
  argTypes: {
    keepAlive: {
      control: { type: 'boolean' },
      description: 'Keep the content of panels that have been shown. Type in the search field, switch tabs and come back to compare',
    },
  },
  args: { keepAlive: false },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
