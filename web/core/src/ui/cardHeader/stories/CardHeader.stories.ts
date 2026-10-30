import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import { createCoreCardHeaderProps, type IAltCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'
import { AltCoreCardHeaderTagName as tagName } from '~shared/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'

import altCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'
import altCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'
import altCoreTagStoryMeta from '~core/ui/tag/stories/Tag.stories'

import '~core/ui/cardHeader'

const { headerText, tagText } = createCoreCardHeaderProps()

type IAltCoreCardHeaderMeta = Meta<IAltCoreCardHeaderProps>

/**
 * ## Core CardHeader
 */
const meta: IAltCoreCardHeaderMeta = {
  title: 'Cards/Partials/⚠️ CardHeader',
  id: 'cardHeader',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    size,
    headerText,
    tagText,
    tagVariant,
    headerIcon,
  }) => {
    return html`
      <alt-core-card-header
        .disabled=${disabled}
        .size=${size}
        .headerText=${headerText}
        .tagText=${tagText}
        .tagVariant=${tagVariant}
        .headerIcon=${headerIcon}
        style="border: 1px dashed; padding: 8px;"
      >
      </alt-core-card-header>
    `
  },
  argTypes: {
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size']),
    headerText: {
      type: 'string',
      description: 'Heading text',
      ...getComponentContentTable(headerText),
    },
    tagText: {
      type: 'string',
      description: 'Tag text',
      ...getComponentContentTable(tagText),
    },
    tagVariant: altCoreTagStoryMeta.argTypes?.variant,
    headerIcon: altCoreIconStoryMeta.argTypes?.icon,
  },
  args: {
    disabled: false,
    size: 'medium',
    headerText: 'Header',
    tagText: 'Tag name',
    tagVariant: 'accent',
    headerIcon: undefined,
  },
} satisfies IAltCoreCardHeaderMeta

export default meta
type Story = StoryObj<IAltCoreCardHeaderProps>

export const Playground: Story = { args: {} }
