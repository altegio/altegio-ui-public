import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreIconExternalProps,
  type IAltCoreIconExternalProps,
} from '~core/ui/icon/models/types'
import { AltCoreIconTagName as tagName } from '~shared/constants'
import type { IAltIcon } from '~shared/icons'
import { altIconsSet, altRocket } from '~shared/icons'
import { getComponentContentTable } from '~shared/.storybook/tables'

import '~core/ui/icon'

const { icon, size } = { ...createCoreIconExternalProps() }

interface IInputStoryEvents {
  input: () => void
  focus: () => void
  blur: () => void
}

export const iconOptions = altIconsSet.reduce<Record<string, IAltIcon>>(
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
const meta: Meta<IAltCoreIconExternalProps & IInputStoryEvents> = {
  title: 'Icons/✅ Icon',
  id: 'icon',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({ icon, size }) => html`
    <alt-core-icon
      .icon=${icon}
      size=${ifDefined(size)}
    ></alt-core-icon>
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
    icon: altRocket,
    size: '1em',
  },
} satisfies Meta<Required<IAltCoreIconExternalProps> & IInputStoryEvents>

export default meta
type Story = StoryObj<IAltCoreIconExternalProps & IInputStoryEvents>

export const Playground: Story = {
  args: {},
  parameters: { docs: { description: { story: 'Basic usage example' } } },
}
