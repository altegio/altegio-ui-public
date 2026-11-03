import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { action } from 'storybook/actions'
import { AltForm } from '~ng/ui/form'
import { AltTextField } from '~ng/ui/textField'
import { AltCheckbox } from '~ng/ui/checkbox'
import { AltButton } from '~ng/ui/button'
import altCoreFormStoryMeta from '~core/ui/form/stories/Form.stories'

/**
 * Angular wrapper for Core Form. It renders the native `<form>` itself: project the fields into it.
 *
 * `(formSubmit)` emits `{ formData, submitter }` after a valid submit, `(validationError)` the invalid fields in
 * `controls`, `(formReset)` fires after a reset. Use `validate()` (a promise of a boolean), `resetValidation()`,
 * `submit()` and `reset()` through a `@ViewChild`.
 * Give `AltButton`, `AltIconButton` or `AltBrandButton` `type="submit"` or `type="reset"`.
 * Keep `[formGroup]` off `<AltForm>`: put Angular forms directives on the fields.
 */
const meta: Meta<AltForm> = {
  title: '✅ Form',
  id: 'form',
  parameters: { controls: { sort: 'alpha' } },
  component: AltForm,
  decorators: [moduleMetadata({ imports: [AltTextField, AltCheckbox, AltButton] })],
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args, onSubmit: action('formSubmit'), onInvalid: action('validationError'), onReset: action('formReset') },
    template: `
      <AltForm [noErrorFocus]="noErrorFocus" (formSubmit)="onSubmit($event)" (validationError)="onInvalid($event)" (formReset)="onReset()">
        <div style="display: grid; gap: 16px; max-width: 360px;">
          <AltTextField name="name" labelText="Name" [required]="true"></AltTextField>
          
          <AltTextField name="email" type="email" labelText="Email" [required]="true"></AltTextField>
          
          <AltCheckbox name="terms" labelText="I accept the terms" [required]="true"></AltCheckbox>
          
          <div style="display: flex; gap: 8px;">
            <AltButton type="submit" label="Send"></AltButton>
            
            <AltButton type="reset" variant="outline" label="Reset"></AltButton>
          </div>
        </div>
      </AltForm>
    `,
  }),
  argTypes: altCoreFormStoryMeta.argTypes,
  args: altCoreFormStoryMeta.args,
}

export default meta
type Story = StoryObj<AltForm>

export const Playground: Story = { args: {} }
