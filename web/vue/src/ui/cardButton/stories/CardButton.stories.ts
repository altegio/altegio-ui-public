import type { Meta, StoryObj } from '@storybook/vue3'
import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { yMagic } from '~shared/icons'

import { YCardButton } from '~vue/ui/cardButton'
import { type IYVueCardButtonProps } from '~vue/ui/cardButton/models/types'
import { YCardIcon } from '~vue/ui/cardIcon'
import yCoreCardButtonStoryMeta from '~core/ui/cardButton/stories/CardButton.stories'

type TVueCardButtonStoryMeta = IYVueCardButtonProps

/**
 * Vue wrapper for Core CardButton
 */
const meta: Meta<TVueCardButtonStoryMeta> = {
  title: 'Cards/✅ CardButton',
  id: 'cardButton',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YCardButton, YCardIcon },
    setup() {
      return {
        args,
        yMagic,
        EYCoreColorIconVariant,
      }
    },
    template: `
      <YCardButton
        v-bind="args"
        @click="args.onClick"
        @blur="args.onBlur"
        @focus="args.onFocus"
      >
        <template v-if="args.showCardIcon" #before>
          <YCardIcon
            :icon="yMagic"
            :variant="EYCoreColorIconVariant.GREY"
          />
        </template>
      </YCardButton>
    `,
  }),
  argTypes: { ...yCoreCardButtonStoryMeta.argTypes },
  args: { ...yCoreCardButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
