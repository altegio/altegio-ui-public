import type { Meta, StoryObj } from '@storybook/angular'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { PalettePlugin } from '~core/ui/globalProvider/plugins/palette'
import type { IPaletteProps } from '~shared/.storybook/argTypes'
import { paletteArgTypes, paletteProps } from '~shared/.storybook/argTypes'
import altCoreButtonStoryMeta from '~core/ui/button/stories/Button.stories'
import { AltGlobalProvider } from '~ng/ui/globalProvider'
import { AltButton } from '~ng/ui/button'
import { action } from 'storybook/actions'

const meta: Meta<AltButton & IPaletteProps> = {
  title: 'Buttons/✅ Button',
  id: 'button',
  parameters: { controls: { sort: 'alpha' } },
  component: AltButton,
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
      moduleMetadata: { imports: [AltGlobalProvider] },
      template: `
        <AltGlobalProvider [plugins]="plugins" (ready)="ready">
          <AltButton
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
        </AltGlobalProvider>
      `,
    }
  },
  argTypes: { ...altCoreButtonStoryMeta.argTypes, ...paletteArgTypes },
  args: { ...altCoreButtonStoryMeta.args, ...paletteProps },
}

export default meta
type Story = StoryObj<AltButton>

export const Default: Story = { args: {} }
