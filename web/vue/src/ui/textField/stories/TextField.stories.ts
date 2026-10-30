import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import altCoreTextFieldStoryMeta, { type TAltCoreTextFieldMeta } from '~core/ui/textField/stories/TextField.stories'
import { omit } from 'radash'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { altSearch, altChevronDown } from '~shared/icons'
import type { TAnyVoidFunction } from '~shared/types/utils'
import { AltFieldIcon } from '~vue/ui/fieldIcon'
import { AltTextField } from '~vue/ui/textField'
import { type IAltVueTextFieldProps } from '~vue/ui/textField/models/types'
import { MASK_EXAMPLES } from '~web/shared/.storybook/constants/maskExamples'

type TVueTextFieldStoryMeta = IAltVueTextFieldProps & TAltCoreTextFieldMeta & {
  modelValue: string
  onUpdateModelValue?: TAnyVoidFunction
}

/**
 * Vue wrapper for CoreTextField
 */
const meta: Meta<TVueTextFieldStoryMeta> = {
  title: 'Inputs/✅ TextField',
  id: 'textField',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { AltTextField, AltFieldIcon },
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
        altSearch,
        altChevronDown,
        onUpdateModelValue,
      }
    },
    template: `
      <AltTextField
        v-bind="args"
        :model-value="args.modelValue"
        :labelText="computedLabelText"
        :errors="computedErrors"
        @update:modelValue="onUpdateModelValue"
        @clear="args.onClear"
      >
        <template v-if="args.showBeforeSlot" #before>
          <alt-field-icon
            :icon="altSearch"
          ></alt-field-icon>
        </template>
        
        <template v-if="args.annotationText" #annotation>
          {{ computedAnnotationText }}
        </template>

        <template v-if="args.showAfterSlot" #after>
          <alt-field-icon
            :icon="altChevronDown"
          ></alt-field-icon>
        </template>
      </AltTextField>
      
        <AltTextField
          v-bind="args"
          :model-value="args.modelValue"
          :labelText="computedLabelText"
          :errors="computedErrors"
          @update:modelValue="onUpdateModelValue"
          @clear="args.onClear"
        >
          <template v-if="args.showBeforeSlot" #before>
            <alt-field-icon
              :icon="altSearch"
            ></alt-field-icon>
          </template>
          
          <template v-if="args.annotationText" #annotation>
            {{ computedAnnotationText }}
          </template>

          <template v-if="args.showAfterSlot" #after>
            <alt-field-icon
              :icon="altChevronDown"
            ></alt-field-icon>
          </template>
      </AltTextField>
    `,
  }),
  tags: [
  'vue',
  'autodocs',
  ],
  argTypes: {
    ...omit(
      altCoreTextFieldStoryMeta.argTypes ?? {},
      ['value', 'onInput', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave', 'onRenderInput', 'onKeydown'],
    ),
    modelValue: {
      type: 'string',
      description: 'Default v-model for the input value. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value',
      ...getComponentContentTable(),
    },
    onUpdateModelValue: altCoreTextFieldStoryMeta.argTypes?.onInput,
  },
  args: {
    ...omit(
      altCoreTextFieldStoryMeta.args ?? {},
      ['value', 'onInput', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave', 'onRenderInput', 'onKeydown'],
    ),
    modelValue: '',
    onUpdateModelValue: altCoreTextFieldStoryMeta.args?.onInput,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithPhoneMask: Story = {
  name: 'With a phone mask',
  args: {
    labelText: 'Phone number',
    placeholder: '+7 (999) 999-99-99',
    maskOptions: MASK_EXAMPLES.phone,
  },
}

export const WithNumberMask: Story = {
  name: 'With a number mask',
  args: {
    labelText: 'Amount',
    placeholder: '0,00',
    maskOptions: MASK_EXAMPLES.number,
  },
}

export const WithDateMask: Story = {
  name: 'With a date mask',
  args: {
    labelText: 'Date',
    placeholder: 'dd/mm/yyyy',
    maskOptions: MASK_EXAMPLES.date,
  },
}

export const WithCardMask: Story = {
  name: 'With a card mask',
  args: {
    labelText: 'Card number',
    placeholder: '9999 9999 9999 9999',
    maskOptions: MASK_EXAMPLES.card,
  },
}
