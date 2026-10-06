import type { Meta, StoryObj } from '@storybook/angular'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { PalettePlugin } from '~core/ui/globalProvider/plugins/palette'
import type { IPaletteProps } from '~shared/.storybook/argTypes'
import { paletteArgTypes, paletteProps } from '~shared/.storybook/argTypes'
import yCoreButtonStoryMeta from '~core/ui/button/stories/Button.stories'
import { YGlobalProvider } from '~ng/ui/globalProvider'
import { YButton } from '~ng/ui/button'
import { action } from '@storybook/addon-actions'

const meta: Meta<YButton & IPaletteProps> = {
  title: 'Buttons/✅ Button',
  id: 'button',
  parameters: { controls: { sort: 'alpha' } },
  component: YButton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const palettePlugin = new PalettePlugin(args.accentColor, args.useDarkTheme)

    return {
      props: {
        ...args,
        plugins: [palettePlugin],
        LOREM_IPSUM,
        onClick: action('click'),
      },
      moduleMetadata: { imports: [YGlobalProvider] },
      template: `
        <YGlobalProvider [plugins]="plugins" (ready)="ready">
          <YButton
            [label]="isLongText ? LOREM_IPSUM : label"
            [href]="href"
            [target]="target"
            [size]="size"
            [variant]="variant"
            [disabled]="disabled"
            [loading]="loading"
            [fullWidth]="fullWidth"
            [iconLeft]="iconLeft"
            [iconRight]="iconRight"
            [alignment]="alignment"
            (click)="onClick($event)"
          />
        </YGlobalProvider>
      `,
    }
  },
  argTypes: { ...yCoreButtonStoryMeta.argTypes, ...paletteArgTypes },
  args: { ...yCoreButtonStoryMeta.args, ...paletteProps },
}

export default meta
type Story = StoryObj<YButton>

export const Default: Story = { args: {} }
