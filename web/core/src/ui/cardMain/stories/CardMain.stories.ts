import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreCardMainProps,
  type IYCoreCardMainProps,
} from '../models/types'
import { YCoreCardMainTagName as tagName } from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'
import {
  hideSpaceLeft as hideSpaceLeftArgType,
  hideSpaceRight as hideSpaceRightArgType,
} from '~shared/.storybook/argTypes'

import yCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'

import '~core/ui/cardMain'

const { hideSpaceLeft, hideSpaceRight } = createCoreCardMainProps()

type YCoreCardMainMeta = Meta<IYCoreCardMainProps>

/**
 * ## Core CardMain
 */
const meta: YCoreCardMainMeta = {
  title: 'Cards/Partials/⚠️ CardMain',
  id: 'cardMain',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    size,
    hideSpaceLeft,
    hideSpaceRight,
  }) => {
    return html`
      <y-core-card-main
        .disabled=${disabled}
        .size=${size}
        .hideSpaceLeft=${hideSpaceLeft}
        .hideSpaceRight=${hideSpaceRight}
        style="border: 1px dashed;"
      >
      </y-core-card-main>
    `
  },
  argTypes: {
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size']),
    hideSpaceLeft: {
      ...hideSpaceLeftArgType,
      ...getComponentStateTable(hideSpaceLeft),
    },
    hideSpaceRight: {
      ...hideSpaceRightArgType,
      ...getComponentStateTable(hideSpaceRight),
    },
  },
  args: {
    ...pick(yCoreCardWrapperStoryMeta.args ?? {}, ['disabled', 'size']),
    hideSpaceLeft: false,
    hideSpaceRight: false,
  },
} satisfies YCoreCardMainMeta

export default meta
type Story = StoryObj<IYCoreCardMainProps>

export const Playground: Story = { args: {} }
