import type { Meta, StoryObj } from '@storybook/vue3'

import altCoreButtonGroupStoryMeta from '~core/ui/buttonGroup/stories/ButtonGroup.stories'
import { AltButtonGroup } from '~vue/ui/buttonGroup'
import { AltButton } from '~vue/ui/button'
import { altInfo, altRocket } from '~shared/icons'

const meta: Meta<typeof AltButtonGroup> = {
  title: '✅ ButtonGroup',
  id: 'buttonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: AltButtonGroup,
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltButtonGroup, AltButton },
    setup() {
      return { args, altInfo, altRocket }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>ButtonGroup</h3>
        
        <AltButtonGroup v-bind="args">
          <AltButton v-for="index in 2" :key="index" :label="\`Button \${index}\`" />
        </AltButtonGroup>

        <AltButtonGroup v-bind="args">
          <AltButton v-for="index in 3" :key="index + 2" :label="\`Button \${index + 2}\`" />
        </AltButtonGroup>

        <AltButtonGroup v-bind="args">
          <AltButton v-for="index in 4" :key="index + 2" :label="\`Button \${index + 2}\`" />
        </AltButtonGroup>

        <AltButtonGroup v-bind="args">
          <AltButton v-for="index in 5" :key="index + 2" :label="\`Button \${index + 2}\`" />
        </AltButtonGroup>

        <h3>ButtonGroup With Icons</h3>
        
        <AltButtonGroup v-bind="args">
          <AltButton
            v-for="index in 2"
            :key="index"
            :label="\`Button \${index}\`"
            :iconLeft="index === 1 ? altInfo : undefined"
            :iconRight="index === 2 ? altRocket : undefined"
          />
        </AltButtonGroup>
      </div>
    `,
  }),
  argTypes: { ...altCoreButtonGroupStoryMeta.argTypes },
  args: { ...altCoreButtonGroupStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
