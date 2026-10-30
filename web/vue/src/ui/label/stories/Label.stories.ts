import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { AltLabel } from '~vue/ui/label'
import { type IAltVueLabelProps } from '~vue/ui/label/models/types'
import AltCoreLabelStoryMeta, { type IAltCoreLabelStoryProps } from '~core/ui/label/stories/Label.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueLabelStoryMeta = IAltVueLabelProps & IAltCoreLabelStoryProps

/**
 * Vue wrapper for Core Label
 */
const meta: Meta<TVueLabelStoryMeta> = {
  title: '⚙️ Label',
  id: 'label',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { AltLabel },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.text))

      return {
        args,
        computedText,
      }
    },
    template: `
      <AltLabel 
        v-bind="args"
        :text="computedText"
      >        
        <template #tooltip-content>
          <span>{{args.tooltipContentSlot}}</span>
        </template>
      </AltLabel>
    `,
  }),
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: { ...AltCoreLabelStoryMeta.argTypes },
  args: { ...AltCoreLabelStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
