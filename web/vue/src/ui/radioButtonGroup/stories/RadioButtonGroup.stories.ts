import type { Meta, StoryObj } from '@storybook/vue3'
import { omit } from 'radash'
import { computed } from 'vue'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'

import type { RadioButtonGroupChangeEvent } from '~core/ui/radioButtonGroup/models/types'
import yCoreRadioButtonGroupStoryMeta, {
  type TYCoreRadioButtonGroupStoryMeta,
} from '~core/ui/radioButtonGroup/stories/RadioButtonGroup.stories'
import { YRadioButtonGroup } from '~vue/ui/radioButtonGroup'
import { type IYVueRadioButtonGroupProps } from '~vue/ui/radioButtonGroup/models/types'
import { YRadioButton } from '~vue/ui/radioButton'

type TVueRadioButtonGroupStoryMeta = IYVueRadioButtonGroupProps & {
  modelValue: TYCoreRadioButtonGroupStoryMeta['value']
}

/**
 * Vue wrapper for Core RadioButtonGroup
 */
const meta: Meta<TVueRadioButtonGroupStoryMeta> = {
  title: '⚠️ RadioButtonGroup',
  id: 'radioButtonGroup',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YRadioButtonGroup, YRadioButton },
      setup() {
        const handleUpdateModelValue = (modelValue: RadioButtonGroupChangeEvent['detail']['value']) => {
          updateArgs({ modelValue })
          action('update:modelValue')(modelValue)
        }

        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleUpdateModelValue,
        })

        return { args, handleUpdateModelValue, vModelValue }
      },
      template: `
      <YRadioButtonGroup v-bind="args" v-model="vModelValue">
        <YRadioButton  v-for="i in 3" :key="i" :label-text="'Radio button with value ' + i" :value="i">
          <template #annotation>Annotation text</template>
        </YRadioButton>
      </YRadioButtonGroup>
    `,
    }
  },
  argTypes: {
    ...omit(yCoreRadioButtonGroupStoryMeta.argTypes ?? {}, ['value']),
    modelValue: yCoreRadioButtonGroupStoryMeta.argTypes?.value,
  },
  args: {
    ...omit(yCoreRadioButtonGroupStoryMeta.args ?? {}, ['value']),
    modelValue: yCoreRadioButtonGroupStoryMeta.args?.value,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
