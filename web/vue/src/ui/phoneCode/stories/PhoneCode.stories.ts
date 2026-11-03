import type { Meta, StoryObj } from '@storybook/vue3'

import { AltPhoneCode } from '~vue/ui/phoneCode'
import { type IAltVuePhoneCodeProps } from '~vue/ui/phoneCode/models/types'
import altCorePhoneCodeStoryMeta from '~core/ui/phoneCode/stories/PhoneCode.stories'

type TVuePhoneCodeStoryMeta = IAltVuePhoneCodeProps

/**
 * Vue wrapper for Core PhoneCode
 */
const meta: Meta<TVuePhoneCodeStoryMeta> = {
  title: 'Inputs/Partials/⚠️ PhoneCode',
  id: 'phoneCode',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltPhoneCode },
    setup() {
      return { args }
    },
    template: `
      <AltPhoneCode
        v-bind="args"
        style="border: 1px dashed;"
      ></AltPhoneCode>
    `,
  }),
  argTypes: { ...altCorePhoneCodeStoryMeta.argTypes },
  args: { ...altCorePhoneCodeStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
