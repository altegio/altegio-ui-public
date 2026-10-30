import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from 'storybook/preview-api'
import { action } from 'storybook/actions'
import { computed } from 'vue'

import { AltAutocompleteField } from '~vue/ui/autocompleteField'
import { type IAltVueAutocompleteFieldProps } from '~vue/ui/autocompleteField/models/types'
import { AltButton } from '~vue/ui/button'
import altCoreAutocompleteFieldStoryMeta, {
  type ICoreAutocompleteFieldStoryProps,
} from '~core/ui/autocompleteField/stories/AutocompleteField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { TAltVueAutocompleteFieldEvents } from '~vue/ui/autocompleteField/models/types'
import type { ChangeEvent, SelectOptionEvent } from '~core/ui/autocompleteField/models/types'

type TAltVueAutocompleteFieldStoryMeta = IAltVueAutocompleteFieldProps & ICoreAutocompleteFieldStoryProps & TAltVueAutocompleteFieldEvents

/**
 * Vue wrapper for Core AutocompleteField
 */
const meta: Meta<TAltVueAutocompleteFieldStoryMeta> = {
  title: 'Inputs/🔍 AutocompleteField',
  id: 'AutocompleteField',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args: TAltVueAutocompleteFieldStoryMeta) => {
    const [, updateArgs] = useArgs()

    return {
      components: { AltAutocompleteField, AltButton },
      setup() {
        const computedLabelText = computed(() => args.labelIsLongText ? LOREM_IPSUM : String(args.labelText))
        const computedErrors = computed(() => args.errors ?? args.showErrors)

        const cleanedArgs = computed<TAltVueAutocompleteFieldStoryMeta>(() => ({
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
          <AltAutocompleteField
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
              <AltButton
                label="Primary action"
                variant="primary"
              ></AltButton>
    
              <AltButton
                label="Secondary action"
                variant="outline"
              ></AltButton>
            </template>
          </AltAutocompleteField>
        </div>
      `,
    }
  },
  argTypes: { ...altCoreAutocompleteFieldStoryMeta.argTypes },
  args: { ...altCoreAutocompleteFieldStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
