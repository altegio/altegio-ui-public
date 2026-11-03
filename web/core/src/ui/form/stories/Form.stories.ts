import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'

import {
  createCoreFormProps,
  type IAltCoreFormProps,
  type TAltCoreFormEvents,
} from '~core/ui/form/models/types'
import { AltCoreFormTagName as tagName } from '~shared/constants'
import { getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'

import '~core/ui/form'
import '~core/ui/textField'
import '~core/ui/checkbox'
import '~core/ui/button'

type TAltCoreFormStoryMeta = IAltCoreFormProps & TAltCoreFormEvents

const { noErrorFocus } = createCoreFormProps()

/**
 * ## Core Form
 * Validates the fields of the native `<form>` it wraps and shows their messages in place.
 *
 * - Put one `<form>` directly inside. Fields take part through their `name`, and `required`, `type="email"`
 *   and the other native constraints check them. A field with `errors` counts as invalid too.
 * - Submitting with invalid fields shows each message in its field, moves focus to the first one and fires `form-invalid`.
 *   The messages follow the value as the user corrects it.
 * - A valid submit fires `form-submit` with `{ formData, submitter }`; the page does not navigate.
 * - Enter in a single-line field submits. `AltButton`, `AltSimpleButton`, `AltIconButton` and `AltBrandButton` with `type="submit"`
 *   or `type="reset"` submit or reset the form.
 * - `validate()`, `resetValidation()`, `submit()` and `reset()` do the same from code.
 */
const meta: Meta<TAltCoreFormStoryMeta> = {
  title: '✅ Form',
  id: 'form',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-form
      .noErrorFocus=${args.noErrorFocus}
      @form-submit=${action('form-submit')}
      @form-invalid=${action('form-invalid')}
      @form-reset=${action('form-reset')}
    >
      <form style="display: grid; gap: 16px; max-width: 360px;">
        <alt-core-text-field name="name" .labelText=${'Name'} required></alt-core-text-field>
        <alt-core-text-field name="email" type="email" .labelText=${'Email'} required></alt-core-text-field>
        <alt-core-checkbox name="terms" .labelText=${'I accept the terms'} required></alt-core-checkbox>
        
        <div style="display: flex; gap: 8px;">
          <alt-core-button type="submit" .label=${'Send'}></alt-core-button>
          <alt-core-button type="reset" variant="outline" .label=${'Reset'}></alt-core-button>
        </div>
      </form>
    </alt-core-form>
  `,
  argTypes: {
    noErrorFocus: {
      control: { type: 'boolean' },
      description: 'Leaves focus in place when validation fails',
      ...getComponentStateTable(noErrorFocus),
    },
    onFormSubmit: {
      type: 'function',
      description: 'Fires with `{ formData, submitter }` after a submit with valid fields',
      ...getComponentEmitsTable(),
    },
    onFormInvalid: {
      type: 'function',
      description: 'Fires with `{ controls }`, the invalid fields, after a submit or `validate()` that fails',
      ...getComponentEmitsTable(),
    },
    onFormReset: {
      type: 'function',
      description: 'Fires after the form restored its values',
      ...getComponentEmitsTable(),
    },
  },
  args: { noErrorFocus },
}

export default meta
type Story = StoryObj<TAltCoreFormStoryMeta>

export const Playground: Story = {}
