import type { Meta, StoryObj } from '@storybook/vue3'

import { omit } from 'radash'
import yCoreSimpleCheckboxStoryMeta from '~core/ui/simpleCheckbox/stories/SimpleCheckbox.stories'
import { YSimpleCheckbox } from '~vue/ui/simpleCheckbox'
import { type IYVueSimpleCheckboxProps } from '~vue/ui/simpleCheckbox/models/types'
import { getComponentContentTable } from '~shared/.storybook/tables'

type TVueSimpleCheckboxStoryMeta = IYVueSimpleCheckboxProps

/**
 * Vue wrapper for Core SimpleCheckbox
 */
const meta: Meta<TVueSimpleCheckboxStoryMeta> = {
  title: '⚙️ SimpleCheckbox',
  id: 'simpleCheckbox',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YSimpleCheckbox },
    setup() {
      return { args }
    },
    template: `
      <YSimpleCheckbox
        v-bind="args"
        v-model="args.modelValue"
      />
    `,
  }),
  argTypes: {
    ...omit(
      yCoreSimpleCheckboxStoryMeta.argTypes ?? {},
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
      yCoreSimpleCheckboxStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
