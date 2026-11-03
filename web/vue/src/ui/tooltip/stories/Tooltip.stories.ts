import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { AltLink } from '~vue/ui/link'
import { AltSimpleButton } from '~vue/ui/simpleButton'
import { AltTooltip } from '~vue/ui/tooltip'
import { type IAltVueTooltipProps } from '~vue/ui/tooltip/models/types'
import AltCoreTooltipStoryMeta, { type IAltCoreLabelStoryProps } from '~core/ui/tooltip/stories/Tooltip.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from 'storybook/actions'

type TVueTooltipStoryMeta = IAltVueTooltipProps & IAltCoreLabelStoryProps

/**
 * Vue wrapper for Core Tooltip
 */
const meta: Meta<TVueTooltipStoryMeta> = {
  title: '⚠️ Tooltip',
  id: 'tooltip',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { AltTooltip, AltLink, AltSimpleButton },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.text))
      const onButtonClick = (e: MouseEvent) => {
        action('onButtonClick')(e)
      }

      return { args, computedText, onButtonClick }
    },
    template: `
    <div style="padding:50px calc(50% - 60px); width: fit-content;">
    
      <AltTooltip v-bind="args" :text="computedText">
        <template #activator>
          <AltSimpleButton @click="onButtonClick">Hover over me</AltSimpleButton>
        </template>
        
        <template v-if="args.isSlotExists" #content>
          Content with a <AltLink href="https://www.google.com" target="_blank">link</AltLink>
          
          <div v-if="args.isLongText">{{ computedText }}</div>
        </template>
      </AltTooltip>
    </div>
    `,
  }),
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: { ...AltCoreTooltipStoryMeta.argTypes },
  args: { ...AltCoreTooltipStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
