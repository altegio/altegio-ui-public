import type { Meta, StoryObj } from '@storybook/vue3'

import { YPhoneCode } from '~vue/ui/phoneCode'
import { type IYVuePhoneCodeProps } from '~vue/ui/phoneCode/models/types'
import yCorePhoneCodeStoryMeta from '~core/ui/phoneCode/stories/PhoneCode.stories'

type TVuePhoneCodeStoryMeta = IYVuePhoneCodeProps

/**
 * Vue-обертка над Core PhoneCode
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
    components: { YPhoneCode },
    setup() {
      return { args }
    },
    template: `
      <YPhoneCode
        v-bind="args"
        style="border: 1px dashed;"
      ></YPhoneCode>
    `,
  }),
  argTypes: { ...yCorePhoneCodeStoryMeta.argTypes },
  args: { ...yCorePhoneCodeStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
