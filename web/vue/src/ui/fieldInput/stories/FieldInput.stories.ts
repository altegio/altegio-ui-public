import type { Meta, StoryObj } from '@storybook/vue3'

import { AltFieldInput } from '~vue/ui/fieldInput'
import { type IAltVueFieldInputProps } from '~vue/ui/fieldInput/models/types'
import altCoreFieldInputStoryMeta, { type TAltCoreFieldInputMeta } from '~core/ui/fieldInput/stories/FieldInput.stories'
import { omit } from 'radash'

type TVueFieldInputStoryMeta = IAltVueFieldInputProps & {
  onUpdateModelValue: TAltCoreFieldInputMeta['onInput']
}

/**
 * Vue wrapper for Core FieldInput
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
    components: { AltFieldInput },
    setup() {
      return { args }
    },
    template: `
      <AltFieldInput
        v-bind="args"
        @update:model-value="args.onUpdateModelValue"
        @focus="args.onFocus"
        @blur="args.onBlur"
        @keydown="args.onKeydown"
        @render="args.onRender"
        style="border: 1px dashed;"
      ></AltFieldInput>
    `,
  }),
  argTypes: {
    ...omit(altCoreFieldInputStoryMeta.argTypes ?? {}, ['value', 'onInput']),
    modelValue: altCoreFieldInputStoryMeta.argTypes?.value,
    onUpdateModelValue: altCoreFieldInputStoryMeta.argTypes?.onInput,
  },
  args: {
    ...omit(altCoreFieldInputStoryMeta.args ?? {}, ['value', 'onInput']),
    modelValue: altCoreFieldInputStoryMeta.args?.value,
    onUpdateModelValue: altCoreFieldInputStoryMeta.args?.onInput,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
