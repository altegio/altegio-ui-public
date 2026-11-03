import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from 'storybook/preview-api'
import { action } from 'storybook/actions'

import { AltSimpleToggle } from '~vue/ui/simpleToggle'
import { type IAltVueSimpleToggleProps } from '~vue/ui/simpleToggle/models/types'
import altCoreSimpleToggleStoryMeta from '~core/ui/simpleToggle/stories/SimpleToggle.stories'
import { omit } from 'radash'
import { getComponentContentTable } from '~shared/.storybook/tables'

type TVueSimpleToggleStoryMeta = IAltVueSimpleToggleProps

/**
 * Vue wrapper for SimpleToggle
 */
const meta: Meta<TVueSimpleToggleStoryMeta> = {
  title: '⚙️ SimpleToggle',
  id: 'simpleToggle',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { AltSimpleToggle },
      setup() {
        const handleUpdateModelValue = (modelValue: boolean) => {
          updateArgs({ modelValue })
          action('update:modelValue')(modelValue)
        }

        return { args, handleUpdateModelValue }
      },
      template: `
        <AltSimpleToggle v-bind="args" @update:modelValue="handleUpdateModelValue"/>
      `,
    }
  },
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: {
    ...omit(
      altCoreSimpleToggleStoryMeta.argTypes ?? {},
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
      altCoreSimpleToggleStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
