import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { pick } from 'radash'

import {
  createCorePhoneCodeProps,
  type IYCorePhoneCodeProps,
} from '~core/ui/phoneCode/models/types'
import {
  YCorePhoneCodeTagName as tagName,
} from '~shared/constants'

import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'

import { defaultCountriesData } from '~shared/utils/countries'

import {
  getComponentStateTable,
} from '~shared/.storybook/tables'

import '~core/ui/phoneCode'

const { code: defaultCode } = createCorePhoneCodeProps()

/**
 * ## Core PhoneCode
 */
const meta: Meta<IYCorePhoneCodeProps> = {
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
      <y-core-phone-code
        .disabled=${disabled}
        .readonly=${readonly}
        .size=${size}
        .code=${code}
        style="border: 1px dashed;"
      ></y-core-phone-code>
    `
  },
  argTypes: {
    ...pick(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['disabled', 'readonly', 'size']),

    code: {
      control: { type: 'select' },
      options: Object.values(defaultCountriesData).map((country) => country.code),
      ...getComponentStateTable(defaultCode),
    },
  },
  args: {
    ...pick(yCoreFieldWrapperStoryMeta.args ?? {}, ['disabled', 'readonly', 'size']),

    code: defaultCountriesData[1].code,
  },
} satisfies Meta<IYCorePhoneCodeProps>

export default meta
type Story = StoryObj<IYCorePhoneCodeProps>

export const Playground: Story = { args: {} }
