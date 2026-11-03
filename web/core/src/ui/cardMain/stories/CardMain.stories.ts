import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreCardMainProps,
  type IAltCoreCardMainProps,
} from '../models/types'
import { AltCoreCardMainTagName as tagName } from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'
import {
  hideSpaceLeft as hideSpaceLeftArgType,
  hideSpaceRight as hideSpaceRightArgType,
} from '~shared/.storybook/argTypes'

import altCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'

import '~core/ui/cardMain'

const { hideSpaceLeft, hideSpaceRight } = createCoreCardMainProps()

type AltCoreCardMainMeta = Meta<IAltCoreCardMainProps>

/**
 * ## Core CardMain
 */
const meta: AltCoreCardMainMeta = {
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
      <alt-core-card-main
        .disabled=${disabled}
        .size=${size}
        .hideSpaceLeft=${hideSpaceLeft}
        .hideSpaceRight=${hideSpaceRight}
        style="border: 1px dashed;"
      >
      </alt-core-card-main>
    `
  },
  argTypes: {
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size']),
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
    ...pick(altCoreCardWrapperStoryMeta.args ?? {}, ['disabled', 'size']),
    hideSpaceLeft: false,
    hideSpaceRight: false,
  },
} satisfies AltCoreCardMainMeta

export default meta
type Story = StoryObj<IAltCoreCardMainProps>

export const Playground: Story = { args: {} }
