import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { omit } from 'radash'

import {
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type KeydownEvent,
  type RenderEvent,
} from '~core/ui/fieldTextarea/models/types'

import { AltFieldTextarea } from '~vue/ui/fieldTextarea'
import { type IAltVueFieldTextareaProps } from '~vue/ui/fieldTextarea/models/types'
import altCoreFieldTextareaStoryMeta, { type TAltCoreFieldTextareaMeta } from '~core/ui/fieldTextarea/stories/FieldTextarea.stories'

type TVueFieldTextareaStoryMeta = IAltVueFieldTextareaProps & TAltCoreFieldTextareaMeta & {
  modelValue: TAltCoreFieldTextareaMeta['value']
  onUpdateModelValue: TAltCoreFieldTextareaMeta['onInput']
}

/**
 * Vue wrapper for Core FieldTextarea
 */
const meta: Meta<TVueFieldTextareaStoryMeta> = {
  title: 'Inputs/Partials/⚠️ FieldTextarea',
  id: 'fieldTextarea',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs<TVueFieldTextareaStoryMeta>()

    const handleInput = (modelValue?: InputEvent['detail']['value']) => {
      updateArgs({ ...args, modelValue })
      action('update:modelValue')(modelValue)
    }

    const handleBlur = (event: BlurEvent) => {
      action('blur')(event)
    }

    const handleFocus = (event: FocusEvent) => {
      action('focus')(event)
    }

    const handleKeydown = (event: KeydownEvent) => {
      action('keydown')(event)
    }

    const handleRender = (event: RenderEvent) => {
      action('render')(event)
    }

    return {
      components: { AltFieldTextarea },
      setup() {
        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleInput,
        })

        return { args, vModelValue, handleBlur, handleFocus, handleKeydown, handleRender }
      },
      template: `
        <AltFieldTextarea
          v-bind="args"
          v-model="vModelValue"
          style="border: 1px dashed;"
          @blur="handleBlur"
          @focus="handleFocus"
          @keydown="handleKeydown"
          @render="handleRender"
        ></AltFieldTextarea>
      `,
    }
  },
  argTypes: {
    ...omit(altCoreFieldTextareaStoryMeta.argTypes ?? {}, ['value', 'onInput']),
    modelValue: altCoreFieldTextareaStoryMeta.argTypes?.value,
    onUpdateModelValue: altCoreFieldTextareaStoryMeta.argTypes?.onInput,
  },
  args: {
    ...omit(altCoreFieldTextareaStoryMeta.args ?? {}, ['value', 'onInput', 'onBlur', 'onFocus', 'onKeydown', 'onRender']),
    modelValue: altCoreFieldTextareaStoryMeta.args?.value,
    onUpdateModelValue: altCoreFieldTextareaStoryMeta.args?.onInput,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
