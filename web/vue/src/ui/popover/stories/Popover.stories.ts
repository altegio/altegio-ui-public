import type { Meta, StoryObj } from '@storybook/vue3'

import { AltSimpleButton } from '~vue/ui/simpleButton'
import { AltPopover } from '~vue/ui/popover'
import { type IAltVuePopoverProps } from '~vue/ui/popover/models/types'
import altCorePopoverStoryMeta from '~core/ui/popover/stories/Popover.stories'

type TVuePopoverStoryMeta = IAltVuePopoverProps

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
    components: { AltPopover, AltSimpleButton },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
        <AltPopover v-bind="args">
          <template #activator>
            <AltSimpleButton label="Click me" />
          </template>

          <template #content>{{ args.tipContent }}</template>
        </AltPopover>
      </div>
    `,
  }),
  argTypes: { ...altCorePopoverStoryMeta.argTypes },
  args: { ...altCorePopoverStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
