import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { omit } from 'radash'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'

import yCoreToggleStoryMeta, { type IYCoreToggleStoryProps } from '~core/ui/toggle/stories/Toggle.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { YToggle } from '~vue/ui/toggle'
import { type IYVueToggleProps } from '~vue/ui/toggle/models/types'

type TVueToggleStoryMeta = IYVueToggleProps & IYCoreToggleStoryProps

/**
 * Vue wrapper for Core Toggle
 */
const meta: Meta<TVueToggleStoryMeta> = {
  title: '✅ Toggle',
  id: 'toggle',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YToggle },
      setup() {
        const computedLabelText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.labelText))
        const computedlabelTooltipText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.labelTooltipText))
        const computedAnnotationText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.annotationText))

        const onChange = (modelValue: boolean) => {
          updateArgs({ modelValue })
          action('update:modelValue')(modelValue)
        }

        return {
          args,
          computedAnnotationText,
          computedLabelText,
          computedlabelTooltipText,
          onChange,
        }
      },
      template: `
        <YToggle
          v-bind="args"
          :label-text="computedLabelText"
          :label-tooltip-text="computedlabelTooltipText"
          @update:modelValue="onChange"
        >
          <template v-if="args.labelText" #label>
            {{ computedLabelText }}
          </template>
  
          <template v-if="args.annotationText" #annotation>
            {{ computedAnnotationText }}
          </template>

          <template #tooltip-content>
            <span>{{ args.tooltipContentSlot }}</span>
          </template>
        </YToggle>
      `,
    }
  },
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: {
    ...omit(
      yCoreToggleStoryMeta.argTypes ?? {},
      ['checked'],
    ),
    modelValue: {
      type: 'boolean',
      description: 'Default v-model for the checked value. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#checked',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(
      yCoreToggleStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
