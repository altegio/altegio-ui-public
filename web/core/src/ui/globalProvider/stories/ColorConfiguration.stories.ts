import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import type { IPaletteProps } from '~shared/.storybook/argTypes'
import { paletteArgTypes, paletteProps } from '~shared/.storybook/argTypes'


import './ColorTable.component'
import { useArgs } from '@storybook/preview-api'
import type { InputTransformersEvent, TColorTokenTransformersRaw } from '../context/types/color'
import { colorTokenTransformersRaw } from '../context/constants/color-token-transformers'

const meta: Meta<IPaletteProps & { transformers: TColorTokenTransformersRaw }> = {
  title: '🔍 ColorConfiguration',
  id: 'colorConfiguration',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'core',
    'autodocs',
  ],
  render: ({ accentColor, useDarkTheme, transformers }) => {
    const [, updateArgs] = useArgs()
    const onChanged = (value: TColorTokenTransformersRaw) => {
      updateArgs({ transformers: value })
    }
    return html`
            <y-color-table
                .accentColor=${accentColor}
                .useDarkTheme=${useDarkTheme}
                .transformers=${transformers}
                @transformersChanged=${(e: InputTransformersEvent) => { onChanged(e.detail) }}
            ></y-color-table>
        `
  },
  argTypes: { ...paletteArgTypes },
  args: {
    ...paletteProps,
    transformers: colorTokenTransformersRaw,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  args: {},
  parameters: { docs: { description: { story: 'Базовый пример использования компонента' } } },
}
