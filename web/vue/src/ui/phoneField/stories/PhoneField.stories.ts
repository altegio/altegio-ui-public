import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from 'storybook/preview-api'
import { action } from 'storybook/actions'
import { computed, ref } from 'vue'

import { AltPhoneField } from '~vue/ui/phoneField'
import { type IAltVuePhoneFieldProps } from '~vue/ui/phoneField/models/types'
import { AltButton } from '~vue/ui/button'
import altCorePhoneFieldStoryMeta, {
  type ICorePhoneFieldStoryProps,
} from '~core/ui/phoneField/stories/PhoneField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { TAltVuePhoneFieldEvents } from '~vue/ui/phoneField/models/types'
import type { PhoneFieldChangeEvent, SelectOptionEvent } from '~core/ui/phoneField/models/types'

type TAltVuePhoneFieldStoryMeta = IAltVuePhoneFieldProps & ICorePhoneFieldStoryProps & TAltVuePhoneFieldEvents

/**
 * Vue wrapper for Core PhoneField
 */
const meta: Meta<TAltVuePhoneFieldStoryMeta> = {
  title: 'Inputs/🔍 PhoneField',
  id: 'phoneField',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { AltPhoneField, AltButton },
      setup() {
        const computedLabelText = computed(() => args.labelIsLongText ? LOREM_IPSUM : String(args.labelText))
        const computedErrors = computed(() => args.errors ?? args.showErrors)

        const cleanedArgs = computed<TAltVuePhoneFieldStoryMeta>(() => ({
          ...args,
          onSelectOption: onSelectOption,
          onChange: onChange,
          labelText: computedLabelText.value,
          errors: computedErrors.value,
        }))

        const isVisible = ref(false)

        const changeVisibility = () => {
          isVisible.value = !isVisible.value
        }

        const onSelectOption = (event: SelectOptionEvent) => {
          const { detail } = event
          updateArgs({ value: detail.phone ?? '' })
          action('onSelectOption')(event)
        }

        const onChange = (event: PhoneFieldChangeEvent) => {
          updateArgs({ value: String(event.detail.phone) })
          action('onChange')(event)
        }

        return {
          isVisible,
          changeVisibility,
          cleanedArgs,
          computedLabelText,
          computedErrors,
        }
      },
      template: `
        <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
        
          <p>KeepAlive example:</p>
          
          <button @click="changeVisibility" style="margin-bottom: 20px"> Component visibility: {{isVisible}}</button>
          
          <keep-alive>
            <AltPhoneField
              v-if="isVisible"
              v-bind="cleanedArgs"
            > 
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
            </AltPhoneField>
          </keep-alive>
        </div>
      `,
    }
  },
  argTypes: { ...altCorePhoneFieldStoryMeta.argTypes },
  args: { ...altCorePhoneFieldStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
