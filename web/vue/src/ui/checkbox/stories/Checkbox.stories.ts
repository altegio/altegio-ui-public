import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { omit } from 'radash'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'
import altCoreCheckboxStoryMeta, {
  type IAltCoreCheckboxStoryProps,
} from '~core/ui/checkbox/stories/Checkbox.stories'
import { AltCheckbox } from '~vue/ui/checkbox'
import { type IAltVueCheckboxProps } from '~vue/ui/checkbox/models/types'

type TVueCheckboxStoryMeta = IAltVueCheckboxProps & IAltCoreCheckboxStoryProps

/**
 * Vue wrapper for Core Checkbox
 */
const meta: Meta<TVueCheckboxStoryMeta> = {
  title: '✅ Checkbox',
  id: 'checkbox',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltCheckbox },
    setup() {
      const computedLabelText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.labelText))
      const computedlabelTooltipText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.labelTooltipText))
      const computedAnnotationText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.annotationText))
      const computedErrors = computed(() => args.errors ?? args.showErrors)

      return {
        args,
        computedAnnotationText,
        computedLabelText,
        computedlabelTooltipText,
        computedErrors,
      }
    },
    template: `
      <AltCheckbox
        v-bind="args"
        v-model="args.modelValue"
        :label-text="computedLabelText"
        :label-tooltip-text="computedlabelTooltipText"
        :errors="computedErrors"
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
      </AltCheckbox>
    `,
  }),
  argTypes: {
    ...omit(
      altCoreCheckboxStoryMeta.argTypes ?? {},
      ['checked'],
    ),
    modelValue: {
      type: 'boolean',
      description:
        'Default v-model for the checked value. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#checked',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(
      altCoreCheckboxStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
