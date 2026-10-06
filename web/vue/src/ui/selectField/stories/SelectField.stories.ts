import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { omit } from 'radash'

import { ySearch } from '~shared/icons'
import yCoreSelectFieldStoryMeta, {
  type TYCoreSelectFieldStoryMeta,
} from '~core/ui/selectField/stories/SelectField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { YSelectField } from '~vue/ui/selectField'
import { type IYVueSelectFieldProps } from '~vue/ui/selectField/models/types'
import { YFieldIcon } from '~vue/ui/fieldIcon'

type TVueSelectFieldStoryMeta = IYVueSelectFieldProps & TYCoreSelectFieldStoryMeta

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
    components: { YSelectField, YFieldIcon },
    setup() {
      const computedLabelText = computed(() => args.isLongText ? LOREM_IPSUM : args.labelText)
      const computedErrors = computed(() => args.errors ?? args.showErrors)
      const modelValue = ref(args.items?.[0])
      return {
        args,
        computedLabelText,
        computedErrors,
        modelValue,
        ySearch,
      }
    },
    template: `
      <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
        <YSelectField 
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
        </YSelectField>
        
        <YSelectField 
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
              <y-field-icon
                :icon="ySearch"
              ></y-field-icon>
          </template>
        </YSelectField>

        <YSelectField 
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
              <y-field-icon
                :icon="ySearch"
              ></y-field-icon>
          </template>
        </YSelectField>

        <p style="margin: 40px 0 10px; font-size: 12px;">
          Component with a width of 200px
        </p>
        
        <YSelectField 
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
        </YSelectField>
      </div>
    `,
  }),
  argTypes: { ...yCoreSelectFieldStoryMeta.argTypes },
  args: { ...omit(yCoreSelectFieldStoryMeta.args ?? {}, ['value']) },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

