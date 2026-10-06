import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import { omit } from 'radash'
import { computed } from 'vue'

import { YSearchField } from '~vue/ui/searchField'
import { type IYVueSearchFieldProps } from '~vue/ui/searchField/models/types'
import yCoreTextFieldStoryMeta, {
  type TYCoreTextFieldMeta,
} from '~core/ui/textField/stories/TextField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable, getComponentEmitsTable } from '~shared/.storybook/tables'
import type { TAnyVoidFunction } from '~shared/types/utils'

type TSearchFieldStoryMeta = IYVueSearchFieldProps & TYCoreTextFieldMeta & {
  onClickSearchIcon: TAnyVoidFunction
  onUpdateModelValue?: TAnyVoidFunction
}

const YCoreTextFieldStoryOmitKeys: (keyof TYCoreTextFieldMeta)[] = [
  'clearable',
  'readonly',
  'maskOptions',
  'value',
  'onInput',
  'maxlength',
  'required',
  'showBeforeSlot',
  'showAfterSlot',
  'type',
  'onClick',
  'onClickOutside',
  'onMouseEnter',
  'onMouseLeave',
  'onRenderInput',
  'onKeydown',
]

/**
 * Vue wrapper for TextField with a search icon
 */
const meta: Meta<TSearchFieldStoryMeta> = {
  title: 'Inputs/✅ SearchField',
  id: 'searchField',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { YSearchField },
    setup() {
      const computedLabelText = computed(() => args.isLongText ? LOREM_IPSUM : args.labelText)
      const computedAnnotationText = computed(() => args.isLongText ? LOREM_IPSUM : args.annotationText)
      const computedErrors = computed(() => {
        if (args.error) {
          return args.errors ?? args.showErrors
        }
        return undefined
      })

      return {
        args,
        computedLabelText,
        computedAnnotationText,
        computedErrors,
      }
    },
    template: `
      <YSearchField
        v-bind="args"
        :labelText="computedLabelText"
        :annotationText="computedAnnotationText"
        :errors="computedErrors"
        :locator-clear-icon="locatorClearIcon"
        @focus="args.onFocus"
        @blur="args.onBlur"
        @update:modelValue="args.onUpdateModelValue"
        @clear="args.onClear"
        @click-search-icon="args.onClickSearchIcon"
      >
      </YSearchField>
    `,
  }),
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: {
    ...omit(
      yCoreTextFieldStoryMeta.argTypes ?? {},
      [...YCoreTextFieldStoryOmitKeys],
    ),
    modelValue: {
      type: 'string',
      description: 'Default v-model for the input value. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value',
      ...getComponentContentTable(),
    },
    locatorClearIcon: {
      type: 'string',
      description: 'Data locator for the clear icon',
      ...getComponentContentTable(),
    },
    onClickSearchIcon: {
      type: 'function',
      description: 'Search icon click event',
      ...getComponentEmitsTable(),
    },
    onUpdateModelValue: yCoreTextFieldStoryMeta.argTypes?.onInput,
  },
  args: {
    ...omit(
      yCoreTextFieldStoryMeta.args ?? {},
      [...YCoreTextFieldStoryOmitKeys],
    ),
    modelValue: '',
    onClickSearchIcon: fn(),
    onUpdateModelValue: yCoreTextFieldStoryMeta.args?.onInput,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithError: Story = {
  name: 'With an error',
  args: {
    error: true,
    errors: ['Enter text only in the search field'],
  },
}
