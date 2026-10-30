import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useArgs } from 'storybook/preview-api'

import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import type { IAltVueCardSelectProps } from '~vue/ui/cardSelect/models/types'
import { altMagic } from '~shared/icons'

import type { IAltCoreCardSelectStorySlots } from '~core/ui/cardSelect/stories/CardSelect.stories'
import altCoreCardSelectStoryMeta from '~core/ui/cardSelect/stories/CardSelect.stories'
import { AltCardIcon } from '~vue/ui/cardIcon'
import { AltCardCheckbox } from '~vue/ui/cardCheckbox'
import { AltCardSelect } from '~vue/ui/cardSelect'

type TVueCardSelectStoryMeta = IAltVueCardSelectProps & IAltCoreCardSelectStorySlots

/**
 * Vue wrapper for Core CardSelect
 */
const meta: Meta<TVueCardSelectStoryMeta> = {
  title: 'Cards/✅ CardSelect',
  id: 'cardSelect',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs<IAltVueCardSelectProps>()

    const handleClick = () => {
      if (args.showCardCheckbox) {
        updateArgs({ ...args, checked: !args.checked })
      } else {
        updateArgs({ ...args, checked: true })
      }
    }

    return {
      components: { AltCardSelect, AltCardIcon, AltCardCheckbox },
      setup() {
        const checked = ref<boolean>(false)

        return {
          args,
          checked,
          altMagic,
          EAltCoreColorIconVariant,
          handleClick,
        }
      },
      template: `
        <AltCardSelect
          v-bind="args"
          @click="handleClick"
          @blur="args.onBlur"
          @focus="args.onFocus"
        >
          <template v-if="args.showCardIcon" #before>
            <AltCardIcon
              :icon="altMagic"
              :variant="EAltCoreColorIconVariant.GREY"
            />
          </template>

          <template v-if="args.showCardCheckbox" #after>
            <AltCardCheckbox @click="handleClick" />
          </template>
        </AltCardSelect>
      `,
    }
  },
  argTypes: { ...altCoreCardSelectStoryMeta.argTypes },
  args: { ...altCoreCardSelectStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
