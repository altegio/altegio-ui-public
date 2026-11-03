import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { AltGlobalProvider } from '~vue/ui/globalProvider'
import altCoreButtonStoryMeta from '~core/ui/button/stories/Button.stories'
import type { IAltCoreButtonExternalProps } from '~core/ui/button/models/types'
import { PalettePlugin } from '~core/ui/globalProvider/plugins/palette'
import { paletteArgTypes, paletteProps, type IPaletteProps } from '~shared/.storybook/argTypes'
import { AltButton } from '~vue/ui/button'
import { type IAltVueButtonProps } from '~vue/ui/button/models/types'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueButtonStoryMeta = IAltVueButtonProps & IAltCoreButtonExternalProps & IPaletteProps

/**
 * Vue wrapper for Core Button
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
      components: { AltButton, AltGlobalProvider },
      setup() {
        const key = computed(() => `${args.accentColor}-${args.useDarkTheme}`)
        const plugins = computed(() => {
          return [new PalettePlugin(args.accentColor, args.useDarkTheme)]
        })
        return { args, LOREM_IPSUM, plugins, key }
      },
      template: `
        <AltGlobalProvider :key="key" :plugins="plugins">
          <AltButton v-bind="args" :label="args.isLongText ? LOREM_IPSUM : args.label" />
        </AltGlobalProvider>
      `,
    }
  },
  argTypes: { ...altCoreButtonStoryMeta.argTypes, ...paletteArgTypes },
  args: { ...altCoreButtonStoryMeta.args, ...paletteProps },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
