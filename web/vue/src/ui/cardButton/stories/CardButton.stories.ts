import type { Meta, StoryObj } from '@storybook/vue3'
import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { altMagic } from '~shared/icons'

import { AltCardButton } from '~vue/ui/cardButton'
import { type IAltVueCardButtonProps } from '~vue/ui/cardButton/models/types'
import { AltCardIcon } from '~vue/ui/cardIcon'
import altCoreCardButtonStoryMeta from '~core/ui/cardButton/stories/CardButton.stories'

type TVueCardButtonStoryMeta = IAltVueCardButtonProps

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
    components: { AltCardButton, AltCardIcon },
    setup() {
      return {
        args,
        altMagic,
        EAltCoreColorIconVariant,
      }
    },
    template: `
      <AltCardButton
        v-bind="args"
        @click="args.onClick"
        @blur="args.onBlur"
        @focus="args.onFocus"
      >
        <template v-if="args.showCardIcon" #before>
          <AltCardIcon
            :icon="altMagic"
            :variant="EAltCoreColorIconVariant.GREY"
          />
        </template>
      </AltCardButton>
    `,
  }),
  argTypes: { ...altCoreCardButtonStoryMeta.argTypes },
  args: { ...altCoreCardButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
