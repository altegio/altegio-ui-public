import type { Meta, StoryObj } from '@storybook/angular'
import { AltTabs } from '~ng/ui/tabs'
import { AltTabPanels } from '~ng/ui/tabPanels'
import { AltTabPanel } from '~ng/ui/tabPanel'
import { storyTabs } from '~core/ui/tabPanels/stories/TabPanels.stories'

/**
 * Angular wrapper for Core Tab Panels.
 *
 * Hidden panels stay rendered, so their content keeps its state.
 */
const meta: Meta<AltTabPanels> = {
  title: '✅ TabPanels',
  id: 'tabPanels',
  parameters: { controls: { sort: 'alpha' } },
  component: AltTabPanels,
  tags: [
    'angular',
    'autodocs',
  ],
  render: () => ({
    moduleMetadata: { imports: [AltTabs, AltTabPanel] },
    props: { tab: 0, storyTabs },
    template: `
      <AltTabs [tabs]="storyTabs" [value]="tab" (valueChange)="tab = $event"></AltTabs>

      <AltTabPanels [value]="tab" style="padding-top: 16px;">
        <AltTabPanel [name]="0" label="Services">
          <p>Haircut, coloring and styling.</p>
          
          <label>Search services <input type="search"></label>
        </AltTabPanel>

        <AltTabPanel [name]="1" label="Staff">
          <p>Five specialists work at this location.</p>
        </AltTabPanel>

        <AltTabPanel [name]="2" label="Schedule">
          <p>Open every day from 9:00 to 21:00.</p>
        </AltTabPanel>
      </AltTabPanels>
    `,
  }),
}

export default meta
type Story = StoryObj<AltTabPanels>

export const Playground: Story = { args: {} }
