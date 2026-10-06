import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { YGlobalProvider } from '~vue/ui/globalProvider'
import yCoreButtonStoryMeta from '~core/ui/button/stories/Button.stories'
import type { IYCoreButtonExternalProps } from '~core/ui/button/models/types'
import { PalettePlugin } from '~core/ui/globalProvider/plugins/palette'
import { paletteArgTypes, paletteProps, type IPaletteProps } from '~shared/.storybook/argTypes'
import { YButton } from '~vue/ui/button'
import { type IYVueButtonProps } from '~vue/ui/button/models/types'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueButtonStoryMeta = IYVueButtonProps & IYCoreButtonExternalProps & IPaletteProps

/**
 * Vue-обертка над Core Button
 */
const meta: Meta<TVueButtonStoryMeta> = {
  title: 'Buttons/✅ Button',
  id: 'button',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    return {
      components: { YButton, YGlobalProvider },
      setup() {
        const key = computed(() => `${args.accentColor}-${args.useDarkTheme}`)
        const plugins = computed(() => {
          return [new PalettePlugin(args.accentColor, args.useDarkTheme)]
        })
        return { args, LOREM_IPSUM, plugins, key }
      },
      template: `
        <YGlobalProvider :key="key" :plugins="plugins">
          <YButton v-bind="args" :label="args.isLongText ? LOREM_IPSUM : args.label" />
        </YGlobalProvider>
      `,
    }
  },
  argTypes: { ...yCoreButtonStoryMeta.argTypes, ...paletteArgTypes },
  args: { ...yCoreButtonStoryMeta.args, ...paletteProps },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
