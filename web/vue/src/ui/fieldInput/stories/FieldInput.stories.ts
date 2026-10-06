import type { Meta, StoryObj } from '@storybook/vue3'

import { YFieldInput } from '~vue/ui/fieldInput'
import { type IYVueFieldInputProps } from '~vue/ui/fieldInput/models/types'
import yCoreFieldInputStoryMeta, { type TYCoreFieldInputMeta } from '~core/ui/fieldInput/stories/FieldInput.stories'
import { omit } from 'radash'

type TVueFieldInputStoryMeta = IYVueFieldInputProps & {
  onUpdateModelValue: TYCoreFieldInputMeta['onInput']
}

/**
 * Vue-обертка над Core FieldInput
 */
const meta: Meta<TVueFieldInputStoryMeta> = {
  title: 'Inputs/Partials/⚠️ FieldInput',
  id: 'fieldInput',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YFieldInput },
    setup() {
      return { args }
    },
    template: `
      <YFieldInput
        v-bind="args"
        @update:model-value="args.onUpdateModelValue"
        @focus="args.onFocus"
        @blur="args.onBlur"
        @keydown="args.onKeydown"
        @render="args.onRender"
        style="border: 1px dashed;"
      ></YFieldInput>
    `,
  }),
  argTypes: {
    ...omit(yCoreFieldInputStoryMeta.argTypes ?? {}, ['value', 'onInput']),
    modelValue: yCoreFieldInputStoryMeta.argTypes?.value,
    onUpdateModelValue: yCoreFieldInputStoryMeta.argTypes?.onInput,
  },
  args: {
    ...omit(yCoreFieldInputStoryMeta.args ?? {}, ['value', 'onInput']),
    modelValue: yCoreFieldInputStoryMeta.args?.value,
    onUpdateModelValue: yCoreFieldInputStoryMeta.args?.onInput,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
