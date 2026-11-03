import type { Meta, StoryObj } from '@storybook/angular'

import { AltPhoneCode } from '~ng/ui/phoneCode'
import altCorePhoneCodeStoryMeta from '~core/ui/phoneCode/stories/PhoneCode.stories'

import { omit } from 'radash'
import { action } from 'storybook/actions'

/**
 * Angular wrapper for Core PhoneCode
 */
const meta: Meta<AltPhoneCode> = {
  title: 'Inputs/Partials/⚠️ PhoneCode',
  id: 'phoneCode',
  parameters: { controls: { sort: 'alpha' } },
  component: AltPhoneCode,
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
      <AltPhoneCode
        [code]="code"
        [disabled]="disabled"
        [readonly]="readonly"
        [size]="size"
        style="border: 1px dashed;display: inline-flex;"
        (click)="onClick($event)"
      ></AltPhoneCode>`,
  }),
  argTypes: { ...omit(altCorePhoneCodeStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(altCorePhoneCodeStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<AltPhoneCode>

export default meta
type Story = StoryObj<AltPhoneCode>

export const Playground: Story = { args: {} }
