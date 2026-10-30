import type { Meta, StoryObj } from '@storybook/vue3'

import { omit } from 'radash'
import altCoreSimpleCheckboxStoryMeta from '~core/ui/simpleCheckbox/stories/SimpleCheckbox.stories'
import { AltSimpleCheckbox } from '~vue/ui/simpleCheckbox'
import { type IAltVueSimpleCheckboxProps } from '~vue/ui/simpleCheckbox/models/types'
import { getComponentContentTable } from '~shared/.storybook/tables'

type TVueSimpleCheckboxStoryMeta = IAltVueSimpleCheckboxProps

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
    components: { AltSimpleCheckbox },
    setup() {
      return { args }
    },
    template: `
      <AltSimpleCheckbox
        v-bind="args"
        v-model="args.modelValue"
      />
    `,
  }),
  argTypes: {
    ...omit(
      altCoreSimpleCheckboxStoryMeta.argTypes ?? {},
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
      altCoreSimpleCheckboxStoryMeta.args ?? {},
      ['checked'],
    ),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
