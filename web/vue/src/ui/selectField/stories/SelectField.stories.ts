import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { omit } from 'radash'

import { altSearch } from '~shared/icons'
import altCoreSelectFieldStoryMeta, {
  type TAltCoreSelectFieldStoryMeta,
} from '~core/ui/selectField/stories/SelectField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { AltSelectField } from '~vue/ui/selectField'
import { type IAltVueSelectFieldProps } from '~vue/ui/selectField/models/types'
import { AltFieldIcon } from '~vue/ui/fieldIcon'

type TVueSelectFieldStoryMeta = IAltVueSelectFieldProps & TAltCoreSelectFieldStoryMeta

/**
 * Vue wrapper for Core SelectField
 */
const meta: Meta<TVueSelectFieldStoryMeta> = {
  title: 'Inputs/✅ SelectField',
  id: 'selectField',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltSelectField, AltFieldIcon },
    setup() {
      const computedLabelText = computed(() => args.isLongText ? LOREM_IPSUM : args.labelText)
      const computedErrors = computed(() => args.errors ?? args.showErrors)
      const modelValue = ref(args.items?.[0])
      return {
        args,
        computedLabelText,
        computedErrors,
        modelValue,
        altSearch,
      }
    },
    template: `
      <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
        <AltSelectField 
          v-bind="args"
          v-model="modelValue"
   
          :labelText="computedLabelText"
          :errors="computedErrors"

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
        </AltSelectField>
        
        <AltSelectField 
          v-bind="argsWithoutValue"
          v-model="modelValue"
   
          :labelText="computedLabelText"
          :errors="computedErrors"
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
          
            <template v-if="args.showBefore" #before>
              <alt-field-icon
                :icon="altSearch"
              ></alt-field-icon>
          </template>
        </AltSelectField>

        <AltSelectField 
          v-bind="argsWithoutValue"
          v-model="modelValue"
          :items="items"
          :labelText="computedLabelText"
          :errors="computedErrors"
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
          
          <template v-if="args.showBefore" #before>
              <alt-field-icon
                :icon="altSearch"
              ></alt-field-icon>
          </template>
        </AltSelectField>

        <p style="margin: 40px 0 10px; font-size: 12px;">
          Component with a width of 200px
        </p>
        
        <AltSelectField 
          style="max-width: 200px"
          v-bind="args"
          v-model="modelValue"
          :labelText="computedLabelText"
          :errors="computedErrors"

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
        </AltSelectField>
      </div>
    `,
  }),
  argTypes: { ...altCoreSelectFieldStoryMeta.argTypes },
  args: { ...omit(altCoreSelectFieldStoryMeta.args ?? {}, ['value']) },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

