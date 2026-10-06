import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useArgs } from '@storybook/preview-api'

import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import type { IYVueCardSelectProps } from '~vue/ui/cardSelect/models/types'
import { yMagic } from '~shared/icons'

import type { IYCoreCardSelectStorySlots } from '~core/ui/cardSelect/stories/CardSelect.stories'
import yCoreCardSelectStoryMeta from '~core/ui/cardSelect/stories/CardSelect.stories'
import { YCardIcon } from '~vue/ui/cardIcon'
import { YCardCheckbox } from '~vue/ui/cardCheckbox'
import { YCardSelect } from '~vue/ui/cardSelect'

type TVueCardSelectStoryMeta = IYVueCardSelectProps & IYCoreCardSelectStorySlots

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
    const [, updateArgs] = useArgs<IYVueCardSelectProps>()

    const handleClick = () => {
      if (args.showCardCheckbox) {
        updateArgs({ ...args, checked: !args.checked })
      } else {
        updateArgs({ ...args, checked: true })
      }
    }

    return {
      components: { YCardSelect, YCardIcon, YCardCheckbox },
      setup() {
        const checked = ref<boolean>(false)

        return {
          args,
          checked,
          yMagic,
          EYCoreColorIconVariant,
          handleClick,
        }
      },
      template: `
        <YCardSelect
          v-bind="args"
          @click="handleClick"
          @blur="args.onBlur"
          @focus="args.onFocus"
        >
          <template v-if="args.showCardIcon" #before>
            <YCardIcon
              :icon="yMagic"
              :variant="EYCoreColorIconVariant.GREY"
            />
          </template>

          <template v-if="args.showCardCheckbox" #after>
            <YCardCheckbox @click="handleClick" />
          </template>
        </YCardSelect>
      `,
    }
  },
  argTypes: { ...yCoreCardSelectStoryMeta.argTypes },
  args: { ...yCoreCardSelectStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
