import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { omit } from 'radash'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'
import yCoreRadioButtonStoryMeta, {
  type IYCoreRadioButtonStoryProps,
} from '~core/ui/radioButton/stories/RadioButton.stories'
import { YRadioButton } from '~vue/ui/radioButton'
import { type IYVueRadioButtonProps } from '~vue/ui/radioButton/models/types'

type TVueRadioButtonStoryMeta = IYVueRadioButtonProps & IYCoreRadioButtonStoryProps

/**
 * Vue-обертка над Core RadioButton
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
    components: { YRadioButton },
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
      <YRadioButton
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
      </YRadioButton>
    `,
  }),
  argTypes: {
    ...omit(
      yCoreRadioButtonStoryMeta.argTypes ?? {},
      ['checked'],
    ),
    modelValue: {
      type: 'boolean',
      description:
        'Дефолтный v-model над базовым checked value. Подробнее - https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#checked',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(
      yCoreRadioButtonStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
