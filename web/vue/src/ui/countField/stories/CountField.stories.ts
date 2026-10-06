import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { omit } from 'radash'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'

import { YCountField } from '~vue/ui/countField'
import { type IYVueCountFieldProps } from '~vue/ui/countField/models/types'
import type { TYCoreCountFieldMeta } from '~core/ui/countField/stories/CountField.stories'
import yCoreCountFieldStoryMeta from '~core/ui/countField/stories/CountField.stories'
import { getComponentContentTable } from '~shared/.storybook/tables'
import type { BlurEvent } from '~core/ui/cardWrapper/models/types'
import type { KeydownEvent } from '~core/ui/fieldInput/models/types'
import type { ChangedValueEvent } from '~core/ui/countField/models/types'

type TVueCountFieldStoryMeta = IYVueCountFieldProps & TYCoreCountFieldMeta & {
  modelValue: number
}

/**
 * Vue-обертка над CoreCountField
 */
const meta: Meta<TVueCountFieldStoryMeta> = {
  title: '✅ CountField',
  id: 'countField',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()
    const computedErrors = computed(() => args.errors ?? args.showErrors)

    const handleFocus = (value: FocusEvent) => {
      action('focus')(value)
    }

    const handleBlur = (value: BlurEvent) => {
      action('blur')(value)
    }

    const handleKeydown = (value: KeydownEvent) => {
      action('keydown')(value)
    }

    const handleUpdateModelValue = (event: ChangedValueEvent['detail']['value']) => {
      updateArgs({ modelValue: event })
      action('update:modelValue')(event)
    }

    return {
      components: { YCountField },
      setup() {
        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleUpdateModelValue,
        })

        return {
          args,
          computedErrors,
          vModelValue,
          handleUpdateModelValue,
          handleFocus,
          handleBlur,
          handleKeydown,
        }
      },
      template: `
        <div style="width: 250px">
          <YCountField
            v-bind="args"
            v-model="vModelValue"
            :errors="computedErrors"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeydown"
          ></YCountField>
        </div>
      `,
    }
  },
  argTypes: {
    ...omit(
        yCoreCountFieldStoryMeta.argTypes ?? {},
        ['value', 'onChangedValue'],
    ),
    modelValue: {
      type: 'number',
      description: 'Дефолтный v-model над базовым input value. Подробнее - https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#value',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(
        yCoreCountFieldStoryMeta.args ?? {},
        ['value', 'onChangedValue', 'onInput', 'onKeydown', 'onFocus', 'onBlur'],
    ),
    modelValue: 5,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
