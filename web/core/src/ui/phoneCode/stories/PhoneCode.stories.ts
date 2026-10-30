import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { pick } from 'radash'

import {
  createCorePhoneCodeProps,
  type IAltCorePhoneCodeProps,
} from '~core/ui/phoneCode/models/types'
import {
  AltCorePhoneCodeTagName as tagName,
} from '~shared/constants'

import altCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'

import { defaultCountriesData } from '~shared/utils/countries'

import {
  getComponentStateTable,
} from '~shared/.storybook/tables'

import '~core/ui/phoneCode'

const { code: defaultCode } = createCorePhoneCodeProps()

/**
 * ## Core PhoneCode
 */
const meta: Meta<IAltCorePhoneCodeProps> = {
  title: 'Inputs/Partials/⚠️ PhoneCode',
  id: 'phoneCode',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    readonly,
    size,
    code,
  }) => {
    return html`
      <alt-core-phone-code
        .disabled=${disabled}
        .readonly=${readonly}
        .size=${size}
        .code=${code}
        style="border: 1px dashed;"
      ></alt-core-phone-code>
    `
  },
  argTypes: {
    ...pick(altCoreFieldWrapperStoryMeta.argTypes ?? {}, ['disabled', 'readonly', 'size']),

    code: {
      control: { type: 'select' },
      options: Object.values(defaultCountriesData).map((country) => country.code),
      ...getComponentStateTable(defaultCode),
    },
  },
  args: {
    ...pick(altCoreFieldWrapperStoryMeta.args ?? {}, ['disabled', 'readonly', 'size']),

    code: defaultCountriesData[1].code,
  },
} satisfies Meta<IAltCorePhoneCodeProps>

export default meta
type Story = StoryObj<IAltCorePhoneCodeProps>

export const Playground: Story = { args: {} }
