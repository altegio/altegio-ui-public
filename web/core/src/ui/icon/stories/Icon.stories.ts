import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreIconExternalProps,
  type IYCoreIconExternalProps,
} from '~core/ui/icon/models/types'
import { YCoreIconTagName as tagName } from '~shared/constants'
import type { IYIcon } from '~shared/icons'
import { yIconsSet, yRocket } from '~shared/icons'
import { getComponentContentTable } from '~shared/.storybook/tables'

import '~core/ui/icon'

const { icon, size } = { ...createCoreIconExternalProps() }

interface IInputStoryEvents {
  input: () => void
  focus: () => void
  blur: () => void
}

export const iconOptions = yIconsSet.reduce<Record<string, IYIcon>>(
  (acc, icon) => {
    acc[icon.name] = icon
    return acc
  },
  {},
)

/**
 * ## Core Icon
 * Icon component
 */
const meta: Meta<IYCoreIconExternalProps & IInputStoryEvents> = {
  title: 'Icons/✅ Icon',
  id: 'icon',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({ icon, size }) => html`
    <y-core-icon
      .icon=${icon}
      size=${ifDefined(size)}
    ></y-core-icon>
  `,
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon to display',
      ...getComponentContentTable(icon.name),
    },
    size: {
      type: 'string',
      description: 'Icon width and height. See https://developer.mozilla.org/en-US/docs/Web/CSS/width / https://developer.mozilla.org/en-US/docs/Web/CSS/height',
      ...getComponentContentTable(size),
    },
  },
  args: {
    icon: yRocket,
    size: '1em',
  },
} satisfies Meta<Required<IYCoreIconExternalProps> & IInputStoryEvents>

export default meta
type Story = StoryObj<IYCoreIconExternalProps & IInputStoryEvents>

export const Playground: Story = {
  args: {},
  parameters: { docs: { description: { story: 'Basic usage example' } } },
}
