import type { Meta, StoryObj } from '@storybook/vue3'
import { omit } from 'radash'

import yCoreSimpleRadioButtonStoryMeta from '~core/ui/simpleRadioButton/stories/SimpleRadioButton.stories'
import { YSimpleRadioButton } from '~vue/ui/simpleRadioButton'
import { type IYVueSimpleRadioButtonProps } from '~vue/ui/simpleRadioButton/models/types'
import { getComponentContentTable } from '~shared/.storybook/tables'

type TVueSimpleRadioButtonStoryMeta = IYVueSimpleRadioButtonProps

/**
 * Vue wrapper for Core SimpleRadioButton
 */
const meta: Meta<TVueSimpleRadioButtonStoryMeta> = {
  title: '⚙️ SimpleRadioButton',
  id: 'simpleRadioButton',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YSimpleRadioButton },
    setup() {
      return { args }
    },
    template: `
      <YSimpleRadioButton
        v-bind="args"
        v-model="args.modelValue"
      />
    `,
  }),
  argTypes: {
    ...omit(
      yCoreSimpleRadioButtonStoryMeta.argTypes ?? {},
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
      yCoreSimpleRadioButtonStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
