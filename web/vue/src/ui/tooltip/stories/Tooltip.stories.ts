import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { YLink } from '~vue/ui/link'
import { YSimpleButton } from '~vue/ui/simpleButton'
import { YTooltip } from '~vue/ui/tooltip'
import { type IYVueTooltipProps } from '~vue/ui/tooltip/models/types'
import YCoreTooltipStoryMeta, { type IYCoreLabelStoryProps } from '~core/ui/tooltip/stories/Tooltip.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from '@storybook/addon-actions'

type TVueTooltipStoryMeta = IYVueTooltipProps & IYCoreLabelStoryProps

/**
 * Vue-обертка над Core Tooltip
 */
const meta: Meta<TVueTooltipStoryMeta> = {
  title: '⚠️ Tooltip',
  id: 'tooltip',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { YTooltip, YLink, YSimpleButton },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.text))
      const onButtonClick = (e: MouseEvent) => {
        action('onButtonClick')(e)
      }

      return { args, computedText, onButtonClick }
    },
    template: `
    <div style="padding:50px calc(50% - 60px); width: fit-content;">
    
      <YTooltip v-bind="args" :text="computedText">
        <template #activator>
          <YSimpleButton @click="onButtonClick">Наведи на меня</YSimpleButton>
        </template>
        
        <template v-if="args.isSlotExists" #content>
          Контент со <YLink href="https://www.google.com" target="_blank">ссылкой</YLink>
          
          <div v-if="args.isLongText">{{ computedText }}</div>
        </template>
      </YTooltip>
    </div>
    `,
  }),
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: { ...YCoreTooltipStoryMeta.argTypes },
  args: { ...YCoreTooltipStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
