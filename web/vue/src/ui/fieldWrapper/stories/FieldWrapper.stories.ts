import type { Meta, StoryObj } from '@storybook/vue3'

import { YFieldWrapper } from '~vue/ui/fieldWrapper'
import { type IYVueFieldWrapperProps } from '~vue/ui/fieldWrapper/models/types'
import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'

type TVueFieldWrapperStoryMeta = IYVueFieldWrapperProps

/**
 * Vue-обертка над Core FieldWrapper
 */
const meta: Meta<TVueFieldWrapperStoryMeta> = {
  title: 'Inputs/Partials/⚠️ FieldWrapper',
  id: 'fieldWrapper',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YFieldWrapper },
    setup() {
      return { args }
    },
    template: `
      <YFieldWrapper
        v-bind="args"
        style="border: 1px dashed;"
        @click="args.onClick"
        @click-outside="args.onClickOutside"
        @focus="args.onFocus"
        @blur="args.onBlur"
        @mouse-enter="args.onMouseEnter"
        @mouse-leave="args.onMouseLeave"
      >Default slot</YFieldWrapper>
    `,
  }),
  argTypes: { ...yCoreFieldWrapperStoryMeta.argTypes },
  args: { ...yCoreFieldWrapperStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
