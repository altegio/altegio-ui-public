import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import yCoreTextFieldStoryMeta, { type TYCoreTextFieldMeta } from '~core/ui/textField/stories/TextField.stories'
import { omit } from 'radash'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { ySearch, yChevronDown } from '~shared/icons'
import type { TAnyVoidFunction } from '~shared/types/utils'
import { YFieldIcon } from '~vue/ui/fieldIcon'
import { YTextField } from '~vue/ui/textField'
import { type IYVueTextFieldProps } from '~vue/ui/textField/models/types'
import { MASK_EXAMPLES } from '~web/shared/.storybook/constants/maskExamples'

type TVueTextFieldStoryMeta = IYVueTextFieldProps & TYCoreTextFieldMeta & {
  modelValue: string
  onUpdateModelValue?: TAnyVoidFunction
}

/**
 * Vue-обертка над CoreTextField
 */
const meta: Meta<TVueTextFieldStoryMeta> = {
  title: 'Inputs/✅ TextField',
  id: 'textField',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { YTextField, YFieldIcon },
    setup() {
      const computedLabelText = computed(() => args.isLongText ? LOREM_IPSUM : args.labelText)
      const computedAnnotationText = computed(() => args.isLongText ? LOREM_IPSUM : args.annotationText)
      const computedErrors = computed(() => args.errors ?? args.showErrors)

      const onUpdateModelValue = (value: string) => {
        args.modelValue = value
        args.onUpdateModelValue?.(value)
      }

      return {
        args,
        computedLabelText,
        computedAnnotationText,
        computedErrors,
        ySearch,
        yChevronDown,
        onUpdateModelValue,
      }
    },
    template: `
      <YTextField
        v-bind="args"
        :model-value="args.modelValue"
        :labelText="computedLabelText"
        :errors="computedErrors"
        @update:modelValue="onUpdateModelValue"
        @clear="args.onClear"
      >
        <template v-if="args.showBeforeSlot" #before>
          <y-field-icon
            :icon="ySearch"
          ></y-field-icon>
        </template>
        
        <template v-if="args.annotationText" #annotation>
          {{ computedAnnotationText }}
        </template>

        <template v-if="args.showAfterSlot" #after>
          <y-field-icon
            :icon="yChevronDown"
          ></y-field-icon>
        </template>
      </YTextField>
      
        <YTextField
          v-bind="args"
          :model-value="args.modelValue"
          :labelText="computedLabelText"
          :errors="computedErrors"
          @update:modelValue="onUpdateModelValue"
          @clear="args.onClear"
        >
          <template v-if="args.showBeforeSlot" #before>
            <y-field-icon
              :icon="ySearch"
            ></y-field-icon>
          </template>
          
          <template v-if="args.annotationText" #annotation>
            {{ computedAnnotationText }}
          </template>

          <template v-if="args.showAfterSlot" #after>
            <y-field-icon
              :icon="yChevronDown"
            ></y-field-icon>
          </template>
      </YTextField>
    `,
  }),
  tags: [
  'vue',
  'autodocs',
  ],
  argTypes: {
    ...omit(
      yCoreTextFieldStoryMeta.argTypes ?? {},
      ['value', 'onInput', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave', 'onRenderInput', 'onKeydown'],
    ),
    modelValue: {
      type: 'string',
      description: 'Дефолтный v-model над базовым input value. Подробнее - https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#value',
      ...getComponentContentTable(),
    },
    onUpdateModelValue: yCoreTextFieldStoryMeta.argTypes?.onInput,
  },
  args: {
    ...omit(
      yCoreTextFieldStoryMeta.args ?? {},
      ['value', 'onInput', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave', 'onRenderInput', 'onKeydown'],
    ),
    modelValue: '',
    onUpdateModelValue: yCoreTextFieldStoryMeta.args?.onInput,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithPhoneMask: Story = {
  name: 'С маской телефона',
  args: {
    labelText: 'Номер телефона',
    placeholder: '+7 (999) 999-99-99',
    maskOptions: MASK_EXAMPLES.phone,
  },
}

export const WithNumberMask: Story = {
  name: 'С маской числа',
  args: {
    labelText: 'Сумма',
    placeholder: '0,00',
    maskOptions: MASK_EXAMPLES.number,
  },
}

export const WithDateMask: Story = {
  name: 'С маской даты',
  args: {
    labelText: 'Дата',
    placeholder: 'дд/мм/гггг',
    maskOptions: MASK_EXAMPLES.date,
  },
}

export const WithCardMask: Story = {
  name: 'С маской карты',
  args: {
    labelText: 'Номер карты',
    placeholder: '9999 9999 9999 9999',
    maskOptions: MASK_EXAMPLES.card,
  },
}
