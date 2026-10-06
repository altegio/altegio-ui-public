import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'

import { YSimpleToggle } from '~vue/ui/simpleToggle'
import { type IYVueSimpleToggleProps } from '~vue/ui/simpleToggle/models/types'
import yCoreSimpleToggleStoryMeta from '~core/ui/simpleToggle/stories/SimpleToggle.stories'
import { omit } from 'radash'
import { getComponentContentTable } from '~shared/.storybook/tables'

type TVueSimpleToggleStoryMeta = IYVueSimpleToggleProps

/**
 * Vue-обертка над SimpleToggle
 */
const meta: Meta<TVueSimpleToggleStoryMeta> = {
  title: '⚙️ SimpleToggle',
  id: 'simpleToggle',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YSimpleToggle },
      setup() {
        const handleUpdateModelValue = (modelValue: boolean) => {
          updateArgs({ modelValue })
          action('update:modelValue')(modelValue)
        }

        return { args, handleUpdateModelValue }
      },
      template: `
        <YSimpleToggle v-bind="args" @update:modelValue="handleUpdateModelValue"/>
      `,
    }
  },
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: {
    ...omit(
      yCoreSimpleToggleStoryMeta.argTypes ?? {},
      ['checked'],
    ),
    modelValue: {
      type: 'boolean',
      description: 'Дефолтный v-model над базовым checked value. Подробнее - https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#checked',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(
      yCoreSimpleToggleStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
