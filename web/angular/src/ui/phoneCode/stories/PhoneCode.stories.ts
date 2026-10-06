import type { Meta, StoryObj } from '@storybook/angular'

import { YPhoneCode } from '~ng/ui/phoneCode'
import yCorePhoneCodeStoryMeta from '~core/ui/phoneCode/stories/PhoneCode.stories'

import { omit } from 'radash'
import { action } from '@storybook/addon-actions'

/**
 * Angular-обертка над Core PhoneCode
 */
const meta: Meta<YPhoneCode> = {
  title: 'Inputs/Partials/⚠️ PhoneCode',
  id: 'phoneCode',
  parameters: { controls: { sort: 'alpha' } },
  component: YPhoneCode,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: {
      ...args,
      onClick: action('click'),
    },
    template: `
      <YPhoneCode
        [code]="code"
        [disabled]="disabled"
        [readonly]="readonly"
        [size]="size"
        style="border: 1px dashed;display: inline-flex;"
        (click)="onClick($event)"
      ></YPhoneCode>`,
  }),
  argTypes: { ...omit(yCorePhoneCodeStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(yCorePhoneCodeStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<YPhoneCode>

export default meta
type Story = StoryObj<YPhoneCode>

export const Playground: Story = { args: {} }
