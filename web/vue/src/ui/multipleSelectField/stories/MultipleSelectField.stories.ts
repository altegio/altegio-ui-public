import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { omit } from 'radash'

import { YMultipleSelectField } from '~vue/ui/multipleSelectField'
import { type IYVueMultipleSelectFieldProps } from '~vue/ui/multipleSelectField/models/types'
import yMultipleSelectFieldStoryMeta, {
  type TYCoreMultipleSelectFieldStoryMeta,
} from '~core/ui/multipleSelectField/stories/MultipleSelectField.stories'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueMultipleSelectFieldStoryMeta = IYVueMultipleSelectFieldProps & TYCoreMultipleSelectFieldStoryMeta

/**
 * Vue-обертка над MultipleSelectField
 */
const meta: Meta<TVueMultipleSelectFieldStoryMeta> = {
  title: 'Inputs/✅ MultipleSelectField',
  id: 'multipleSelectField',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YMultipleSelectField },
    setup() {
      const isCheckKeepAlive = ref(true)
      const computedLabelText = computed(() => args.isLongText ? LOREM_IPSUM : args.labelText)
      const computedErrors = computed(() => args.errors ?? args.showErrors)
      const modelValue = ref<IYVueMultipleSelectFieldProps['modelValue']>([args.items?.[0], args.items?.[1]])
      const modelValue2 = ref<IYVueMultipleSelectFieldProps['modelValue']>([])
      return {
        isCheckKeepAlive,
        args,
        modelValue,
        modelValue2,
        computedLabelText,
        computedErrors,
        componentIs: YMultipleSelectField,
      }
    },
    template: `
      <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
        <button @click="isCheckKeepAlive = !isCheckKeepAlive">
          Проверка keep-alive: {{isCheckKeepAlive ? 'первый компонент' : 'второй компонент'}}
        </button>

        <hr />
        
        <keep-alive>
          <component
            v-if="isCheckKeepAlive"
            :is="componentIs"
            v-bind="args"
            v-model="modelValue"
            :labelText="computedLabelText + '1'"
            :errors="computedErrors"
            @update:modelValue="args.onSelectEmit"
            @focus="args.onFocusEmit"
            @input="args.onInputEmit"
            @blur="args.onBlurEmit"
          > 
            <template v-if="args.annotationText" #annotation>
              {{args.annotationText}}
            </template>

            <template v-if="args.showDropdownListTop" #dropdown-list-top>
              showListTop
            </template>

            <template v-if="args.showDropdownListBottom" #dropdown-list-bottom>
              showDropdownListBottom
            </template>
          </component>
        
          <component
            v-else
            :is="componentIs"
            v-bind="args"
            v-model="modelValue2"
            :labelText="computedLabelText + '2'"
            :errors="[]"
            @update:modelValue="args.onSelectEmit"
            @select="args.onSelectEmit"
            @focus="args.onFocusEmit"
            @input="args.onInputEmit"
            @blur="args.onBlurEmit"
          > 
            <template v-if="args.annotationText" #annotation>
              {{args.annotationText}}
            </template>

            <template v-if="args.showDropdownListTop" #dropdown-list-top>
              showListTop
            </template>

            <template v-if="args.showDropdownListBottom" #dropdown-list-bottom>
              showDropdownListBottom
            </template>
          </component>
        </keep-alive>
      </div>
    `,
  }),
  argTypes: {
    ...omit(
      yMultipleSelectFieldStoryMeta.argTypes ?? {},
      ['value'],
    ),

    modelValue: {
      type: 'string',
      description: 'Дефолтный v-model над базовым input value. Подробнее - https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#value',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(
      yMultipleSelectFieldStoryMeta.args ?? {},
      ['value'],
    ),

    modelValue: [],
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

