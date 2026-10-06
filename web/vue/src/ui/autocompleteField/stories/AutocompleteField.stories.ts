import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'
import { computed } from 'vue'

import { YAutocompleteField } from '~vue/ui/autocompleteField'
import { type IYVueAutocompleteFieldProps } from '~vue/ui/autocompleteField/models/types'
import { YButton } from '~vue/ui/button'
import yCoreAutocompleteFieldStoryMeta, {
  type ICoreAutocompleteFieldStoryProps,
} from '~core/ui/autocompleteField/stories/AutocompleteField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { TYVueAutocompleteFieldEvents } from '~vue/ui/autocompleteField/models/types'
import type { ChangeEvent, SelectOptionEvent } from '~core/ui/autocompleteField/models/types'

type TYVueAutocompleteFieldStoryMeta = IYVueAutocompleteFieldProps & ICoreAutocompleteFieldStoryProps & TYVueAutocompleteFieldEvents

/**
 * Vue wrapper for Core AutocompleteField
 */
const meta: Meta<TYVueAutocompleteFieldStoryMeta> = {
  title: 'Inputs/🔍 AutocompleteField',
  id: 'AutocompleteField',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args: TYVueAutocompleteFieldStoryMeta) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YAutocompleteField, YButton },
      setup() {
        const computedLabelText = computed(() => args.labelIsLongText ? LOREM_IPSUM : String(args.labelText))
        const computedErrors = computed(() => args.errors ?? args.showErrors)

        const cleanedArgs = computed<TYVueAutocompleteFieldStoryMeta>(() => ({
          ...args,
          onSelectOption: onSelectOption,
          onChange: onChange,
          labelText: computedLabelText.value,
          errors: computedErrors.value,
        }))

        const onSelectOption = (event: SelectOptionEvent) => {
          const { detail } = event
          updateArgs({ value: detail.value ?? '' })
          action('onSelectOption')(event)
        }

        const onChange = (event: ChangeEvent) => {
          updateArgs({ value: String(event.detail.value) })
          action('onChange')(event)
        }

        return {
          cleanedArgs,
          computedLabelText,
          computedErrors,
        }
      },
      template: `
        <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
          <YAutocompleteField
            v-bind="cleanedArgs"
          > 
            <template #custom-option="{opt}">
              <span style="color: red">{{opt.id}}</span>
            </template>
            
            <template v-if="cleanedArgs.annotationText" #annotation>
              {{cleanedArgs.annotationText}}
            </template>
  
            <template
              v-if="cleanedArgs.emptyStateIsActionsSlotExists"
              #empty-state-actions
            >
              <YButton
                label="Primary action"
                variant="primary"
              ></YButton>
    
              <YButton
                label="Secondary action"
                variant="outline"
              ></YButton>
            </template>
          </YAutocompleteField>
        </div>
      `,
    }
  },
  argTypes: { ...yCoreAutocompleteFieldStoryMeta.argTypes },
  args: { ...yCoreAutocompleteFieldStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
