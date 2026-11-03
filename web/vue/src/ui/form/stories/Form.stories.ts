import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from 'storybook/actions'
import { AltForm } from '~vue/ui/form'
import { AltTextField } from '~vue/ui/textField'
import { AltCheckbox } from '~vue/ui/checkbox'
import { AltButton } from '~vue/ui/button'
import type { IAltVueFormProps } from '~vue/ui/form/models/types'
import altCoreFormStoryMeta from '~core/ui/form/stories/Form.stories'

/**
 * Vue wrapper for Core Form. It renders the native `<form>` itself: put the fields in the default slot.
 *
 * `@submit` gets the event with `detail.formData` after a valid submit, `@validation-error` the invalid fields in
 * `detail.controls`, `@reset` fires after a reset. The component exposes `validate()` (a promise of a boolean),
 * `resetValidation()`, `submit()` and `reset()`. Give `AltButton` `type="submit"` or `type="reset"`.
 */
const meta: Meta<IAltVueFormProps> = {
  title: '✅ Form',
  id: 'form',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltForm, AltTextField, AltCheckbox, AltButton },
    setup() {
      const name = ref('')
      const email = ref('')
      const terms = ref(false)

      return { args, name, email, terms, onSubmit: action('submit'), onValidationError: action('validation-error'), onReset: action('reset') }
    },
    template: `
      <AltForm v-bind="args" @submit="onSubmit" @validation-error="onValidationError" @reset="onReset">
        <div style="display: grid; gap: 16px; max-width: 360px;">
          <AltTextField v-model="name" name="name" label-text="Name" required />
          
          <AltTextField v-model="email" name="email" type="email" label-text="Email" required />
          
          <AltCheckbox v-model="terms" name="terms" label-text="I accept the terms" required />
          
          <div style="display: flex; gap: 8px;">
            <AltButton type="submit" label="Send" />
            
            <AltButton type="reset" variant="outline" label="Reset" />
          </div>
        </div>
      </AltForm>
    `,
  }),
  argTypes: altCoreFormStoryMeta.argTypes,
  args: altCoreFormStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
