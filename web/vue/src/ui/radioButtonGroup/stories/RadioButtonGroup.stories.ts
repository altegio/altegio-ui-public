import type { Meta, StoryObj } from '@storybook/vue3'
import { omit } from 'radash'
import { computed } from 'vue'
import { useArgs } from 'storybook/preview-api'
import { action } from 'storybook/actions'

import type { RadioButtonGroupChangeEvent } from '~core/ui/radioButtonGroup/models/types'
import altCoreRadioButtonGroupStoryMeta, {
  type TAltCoreRadioButtonGroupStoryMeta,
} from '~core/ui/radioButtonGroup/stories/RadioButtonGroup.stories'
import { AltRadioButtonGroup } from '~vue/ui/radioButtonGroup'
import { type IAltVueRadioButtonGroupProps } from '~vue/ui/radioButtonGroup/models/types'
import { AltRadioButton } from '~vue/ui/radioButton'

type TVueRadioButtonGroupStoryMeta = IAltVueRadioButtonGroupProps & {
  modelValue: TAltCoreRadioButtonGroupStoryMeta['value']
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
      components: { AltRadioButtonGroup, AltRadioButton },
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
      <AltRadioButtonGroup v-bind="args" v-model="vModelValue">
        <AltRadioButton  v-for="i in 3" :key="i" :label-text="'Radio button with value ' + i" :value="i">
          <template #annotation>Annotation text</template>
        </AltRadioButton>
      </AltRadioButtonGroup>
    `,
    }
  },
  argTypes: {
    ...omit(altCoreRadioButtonGroupStoryMeta.argTypes ?? {}, ['value']),
    modelValue: altCoreRadioButtonGroupStoryMeta.argTypes?.value,
  },
  args: {
    ...omit(altCoreRadioButtonGroupStoryMeta.args ?? {}, ['value']),
    modelValue: altCoreRadioButtonGroupStoryMeta.args?.value,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
