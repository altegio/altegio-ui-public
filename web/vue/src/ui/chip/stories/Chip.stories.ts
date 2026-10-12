import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'

import YCoreChipStoryMeta from '~core/ui/chip/stories/Chip.stories'
import { YChip } from '~vue/ui/chip'
import { type IYVueChipProps } from '~vue/ui/chip/models/types'

type TVueChipStoryMeta = IYVueChipProps

const meta: Meta<TVueChipStoryMeta> = {
  title: '✅ Chip',
  id: 'chip',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YChip },
      setup() {
        const handleClick = (active: boolean) => {
          updateArgs({ active })
          action('update:active')(active)
        }

        return { args, handleClick }
      },
      template:
        `<YChip
          v-bind="args"
          @update:active="handleClick"
        />`,
    }
  },
  argTypes: { ...YCoreChipStoryMeta.argTypes },
  args: { ...YCoreChipStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
