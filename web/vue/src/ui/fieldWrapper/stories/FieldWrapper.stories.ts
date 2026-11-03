import type { Meta, StoryObj } from '@storybook/vue3'

import { AltFieldWrapper } from '~vue/ui/fieldWrapper'
import { type IAltVueFieldWrapperProps } from '~vue/ui/fieldWrapper/models/types'
import altCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'

type TVueFieldWrapperStoryMeta = IAltVueFieldWrapperProps

/**
 * Vue wrapper for Core FieldWrapper
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
    components: { AltFieldWrapper },
    setup() {
      return { args }
    },
    template: `
      <AltFieldWrapper
        v-bind="args"
        style="border: 1px dashed;"
        @click="args.onClick"
        @click-outside="args.onClickOutside"
        @focus="args.onFocus"
        @blur="args.onBlur"
        @mouse-enter="args.onMouseEnter"
        @mouse-leave="args.onMouseLeave"
      >Default slot</AltFieldWrapper>
    `,
  }),
  argTypes: { ...altCoreFieldWrapperStoryMeta.argTypes },
  args: { ...altCoreFieldWrapperStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
