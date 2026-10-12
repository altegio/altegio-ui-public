import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'

import type { InputEvent, BlurEvent, FocusEvent, KeydownEvent, RenderEvent, MouseEnterEvent, MouseLeaveEvent, ClickOutsideEvent, ClearEvent } from '~core/ui/textarea/models/types'
import { YTextarea } from '~vue/ui/textarea'
import { type IYVueTextareaProps } from '~vue/ui/textarea/models/types'
import yCoreTextareaStoryMeta, { type TYCoreTextareaMeta, WithMaxlength as CoreWithMaxlength } from '~core/ui/textarea/stories/Textarea.stories'
import { omit } from 'radash'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueTextareaStoryMeta = IYVueTextareaProps & TYCoreTextareaMeta & {
  modelValue: TYCoreTextareaMeta['value']
  onUpdateModelValue: TYCoreTextareaMeta['onInput']
}

/**
 * Vue wrapper for Core Textarea
 */
const meta: Meta<TVueTextareaStoryMeta> = {
  title: 'Inputs/✅ TextArea',
  id: 'textarea',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs<TVueTextareaStoryMeta>()

    const handleInput = (modelValue: InputEvent['detail']['value']) => {
      updateArgs({ modelValue })
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

    const handleMouseEnter = (event: MouseEnterEvent) => {
      action('mouse-enter')(event)
    }

    const handleMouseLeave = (event: MouseLeaveEvent) => {
      action('mouse-leave')(event)
    }

    const handleClick = (event: Event) => {
      action('click')(event)
    }

    const handleClickOutside = (event: ClickOutsideEvent) => {
      action('click-outside')(event)
    }

    const handleClear = (event: ClearEvent) => {
      action('clear')(event)
    }

    const handleRenderTextarea = (event: RenderEvent) => {
      action('render-textarea')(event)
    }

    return {
      components: { YTextarea },
      setup() {
        const computedLabelText = computed(() => args.isLongText ? LOREM_IPSUM : args.labelText)
        const computedErrors = computed(() => args.errors ?? args.showErrors)

        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleInput,
        })

        return { args, vModelValue, computedLabelText, computedErrors, handleBlur, handleFocus, handleKeydown, handleMouseEnter, handleMouseLeave, handleClick, handleClickOutside, handleClear, handleRenderTextarea }
      },
      template: `
        <div style="padding: 20px; max-width: 500px;">
          <YTextarea 
            v-bind="args"
            v-model="vModelValue"
            :errors="computedErrors"
            :label="computedLabelText"
            @blur="handleBlur"
            @focus="handleFocus"
            @keydown="handleKeydown"
            @mouse-enter="handleMouseEnter"
            @mouse-leave="handleMouseLeave"
            @click="handleClick"
            @click-outside="handleClickOutside"
            @clear="handleClear"
            @render-textarea="handleRenderTextarea"
          >
            <template v-if="args.showBeforeSlot" #before>
              <div style="padding: 0 10px;">Before slot</div>
            </template>
            
            <template v-if="args.showAfterSlot" #after>
              <div style="padding: 0 10px;">After slot</div>
            </template>
          </YTextarea>
        </div>
      `,
    }
  },
  argTypes: {
    ...omit(
      yCoreTextareaStoryMeta.argTypes ?? {},
      ['value'],
    ),
    modelValue: {
      type: 'string',
      description: 'Default v-model for the textarea value',
      ...getComponentContentTable(),
    },
    onUpdateModelValue: yCoreTextareaStoryMeta.argTypes?.onInput,
  },
  args: {
    ...omit(
      yCoreTextareaStoryMeta.args ?? {},
      ['value', 'onBlur', 'onFocus', 'onKeydown', 'onRenderTextarea', 'onMouseLeave', 'onMouseEnter', 'onClear', 'onInput', 'onClick', 'onClickOutside'],
    ),
    modelValue: 'Sample textarea content',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithMaxlength: Story = {
  name: CoreWithMaxlength.name,
  args: {
    ...CoreWithMaxlength.args,
    modelValue: CoreWithMaxlength.args?.value,
  },
}
