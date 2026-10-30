import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { omit } from 'radash'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'
import altCoreRadioButtonStoryMeta, {
  type IAltCoreRadioButtonStoryProps,
} from '~core/ui/radioButton/stories/RadioButton.stories'
import { AltRadioButton } from '~vue/ui/radioButton'
import { type IAltVueRadioButtonProps } from '~vue/ui/radioButton/models/types'

type TVueRadioButtonStoryMeta = IAltVueRadioButtonProps & IAltCoreRadioButtonStoryProps

/**
 * Vue wrapper for Core RadioButton
 */
const meta: Meta<TVueRadioButtonStoryMeta> = {
  title: '✅ RadioButton',
  id: 'radioButton',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltRadioButton },
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
      <AltRadioButton
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
          <span>{{args.tooltipContentSlot}}</span>
        </template>
      </AltRadioButton>
    `,
  }),
  argTypes: {
    ...omit(
      altCoreRadioButtonStoryMeta.argTypes ?? {},
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
      altCoreRadioButtonStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
