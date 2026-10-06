import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'
import { computed, ref } from 'vue'

import { YPhoneField } from '~vue/ui/phoneField'
import { type IYVuePhoneFieldProps } from '~vue/ui/phoneField/models/types'
import { YButton } from '~vue/ui/button'
import yCorePhoneFieldStoryMeta, {
  type ICorePhoneFieldStoryProps,
} from '~core/ui/phoneField/stories/PhoneField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { TYVuePhoneFieldEvents } from '~vue/ui/phoneField/models/types'
import type { PhoneFieldChangeEvent, SelectOptionEvent } from '~core/ui/phoneField/models/types'

type TYVuePhoneFieldStoryMeta = IYVuePhoneFieldProps & ICorePhoneFieldStoryProps & TYVuePhoneFieldEvents

/**
 * Vue-обертка над Core PhoneField
 */
const meta: Meta<TYVuePhoneFieldStoryMeta> = {
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
      components: { YPhoneField, YButton },
      setup() {
        const computedLabelText = computed(() => args.labelIsLongText ? LOREM_IPSUM : String(args.labelText))
        const computedErrors = computed(() => args.errors ?? args.showErrors)

        const cleanedArgs = computed<TYVuePhoneFieldStoryMeta>(() => ({
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
        
          <p>KeepAlive тест:</p>
          
          <button @click="changeVisibility" style="margin-bottom: 20px"> Видимость компонента: {{isVisible}}</button>
          
          <keep-alive>
            <YPhoneField
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
                <YButton
                  label="Основное действие"
                  variant="primary"
                ></YButton>
      
                <YButton
                  label="Второстепенное действие"
                  variant="outline"
                ></YButton>
              </template>
            </YPhoneField>
          </keep-alive>
        </div>
      `,
    }
  },
  argTypes: { ...yCorePhoneFieldStoryMeta.argTypes },
  args: { ...yCorePhoneFieldStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
