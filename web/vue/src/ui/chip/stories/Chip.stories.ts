import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from 'storybook/preview-api'
import { action } from 'storybook/actions'

import AltCoreChipStoryMeta from '~core/ui/chip/stories/Chip.stories'
import { AltChip } from '~vue/ui/chip'
import { type IAltVueChipProps } from '~vue/ui/chip/models/types'

type TVueChipStoryMeta = IAltVueChipProps

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
      components: { AltChip },
      setup() {
        const handleClick = (active: boolean) => {
          updateArgs({ active })
          action('update:active')(active)
        }

        return { args, handleClick }
      },
      template:
        `<AltChip
          v-bind="args"
          @update:active="handleClick"
        />`,
    }
  },
  argTypes: { ...AltCoreChipStoryMeta.argTypes },
  args: { ...AltCoreChipStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
