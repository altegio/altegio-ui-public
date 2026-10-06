import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import { omit } from 'radash'

import {
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type KeydownEvent,
  type RenderEvent,
} from '~core/ui/fieldTextarea/models/types'

import { YFieldTextarea } from '~vue/ui/fieldTextarea'
import { type IYVueFieldTextareaProps } from '~vue/ui/fieldTextarea/models/types'
import yCoreFieldTextareaStoryMeta, { type TYCoreFieldTextareaMeta } from '~core/ui/fieldTextarea/stories/FieldTextarea.stories'

type TVueFieldTextareaStoryMeta = IYVueFieldTextareaProps & TYCoreFieldTextareaMeta & {
  modelValue: TYCoreFieldTextareaMeta['value']
  onUpdateModelValue: TYCoreFieldTextareaMeta['onInput']
}

/**
 * Vue-обертка над Core FieldTextarea
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
      components: { YFieldTextarea },
      setup() {
        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleInput,
        })

        return { args, vModelValue, handleBlur, handleFocus, handleKeydown, handleRender }
      },
      template: `
        <YFieldTextarea
          v-bind="args"
          v-model="vModelValue"
          style="border: 1px dashed;"
          @blur="handleBlur"
          @focus="handleFocus"
          @keydown="handleKeydown"
          @render="handleRender"
        ></YFieldTextarea>
      `,
    }
  },
  argTypes: {
    ...omit(yCoreFieldTextareaStoryMeta.argTypes ?? {}, ['value', 'onInput']),
    modelValue: yCoreFieldTextareaStoryMeta.argTypes?.value,
    onUpdateModelValue: yCoreFieldTextareaStoryMeta.argTypes?.onInput,
  },
  args: {
    ...omit(yCoreFieldTextareaStoryMeta.args ?? {}, ['value', 'onInput', 'onBlur', 'onFocus', 'onKeydown', 'onRender']),
    modelValue: yCoreFieldTextareaStoryMeta.args?.value,
    onUpdateModelValue: yCoreFieldTextareaStoryMeta.args?.onInput,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
