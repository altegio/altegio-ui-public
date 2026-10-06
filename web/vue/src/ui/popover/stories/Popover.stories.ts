import type { Meta, StoryObj } from '@storybook/vue3'

import { YSimpleButton } from '~vue/ui/simpleButton'
import { YPopover } from '~vue/ui/popover'
import { type IYVuePopoverProps } from '~vue/ui/popover/models/types'
import yCorePopoverStoryMeta from '~core/ui/popover/stories/Popover.stories'

type TVuePopoverStoryMeta = IYVuePopoverProps

/**
 * Vue wrapper for Popover
 */
const meta: Meta<TVuePopoverStoryMeta> = {
  title: '⚠️ Popover',
  id: 'popover',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YPopover, YSimpleButton },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
        <YPopover v-bind="args">
          <template #activator>
            <YSimpleButton label="Click me" />
          </template>

          <template #content>{{ args.tipContent }}</template>
        </YPopover>
      </div>
    `,
  }),
  argTypes: { ...yCorePopoverStoryMeta.argTypes },
  args: { ...yCorePopoverStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
