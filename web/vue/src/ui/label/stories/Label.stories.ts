import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { YLabel } from '~vue/ui/label'
import { type IYVueLabelProps } from '~vue/ui/label/models/types'
import YCoreLabelStoryMeta, { type IYCoreLabelStoryProps } from '~core/ui/label/stories/Label.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueLabelStoryMeta = IYVueLabelProps & IYCoreLabelStoryProps

/**
 * Vue wrapper for Core Label
 */
const meta: Meta<TVueLabelStoryMeta> = {
  title: '⚙️ Label',
  id: 'label',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { YLabel },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.text))

      return {
        args,
        computedText,
      }
    },
    template: `
      <YLabel 
        v-bind="args"
        :text="computedText"
      >        
        <template #tooltip-content>
          <span>{{args.tooltipContentSlot}}</span>
        </template>
      </YLabel>
    `,
  }),
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: { ...YCoreLabelStoryMeta.argTypes },
  args: { ...YCoreLabelStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
