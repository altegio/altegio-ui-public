import type { Meta, StoryObj } from '@storybook/vue3'

import yCoreButtonGroupStoryMeta from '~core/ui/buttonGroup/stories/ButtonGroup.stories'
import { YButtonGroup } from '~vue/ui/buttonGroup'
import { YButton } from '~vue/ui/button'
import { yInfo, yRocket } from '~shared/icons'

const meta: Meta<typeof YButtonGroup> = {
  title: '✅ ButtonGroup',
  id: 'buttonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: YButtonGroup,
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { YButtonGroup, YButton },
    setup() {
      return { args, yInfo, yRocket }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>ButtonGroup</h3>
        
        <YButtonGroup v-bind="args">
          <YButton v-for="index in 2" :key="index" :label="\`Button \${index}\`" />
        </YButtonGroup>

        <YButtonGroup v-bind="args">
          <YButton v-for="index in 3" :key="index + 2" :label="\`Button \${index + 2}\`" />
        </YButtonGroup>

        <YButtonGroup v-bind="args">
          <YButton v-for="index in 4" :key="index + 2" :label="\`Button \${index + 2}\`" />
        </YButtonGroup>

        <YButtonGroup v-bind="args">
          <YButton v-for="index in 5" :key="index + 2" :label="\`Button \${index + 2}\`" />
        </YButtonGroup>

        <h3>ButtonGroup With Icons</h3>
        
        <YButtonGroup v-bind="args">
          <YButton
            v-for="index in 2"
            :key="index"
            :label="\`Button \${index}\`"
            :iconLeft="index === 1 ? yInfo : undefined"
            :iconRight="index === 2 ? yRocket : undefined"
          />
        </YButtonGroup>
      </div>
    `,
  }),
  argTypes: { ...yCoreButtonGroupStoryMeta.argTypes },
  args: { ...yCoreButtonGroupStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
