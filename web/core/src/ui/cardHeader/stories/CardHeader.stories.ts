import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import { createCoreCardHeaderProps, type IYCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'
import { YCoreCardHeaderTagName as tagName } from '~shared/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'

import yCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'
import yCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'
import yCoreTagStoryMeta from '~core/ui/tag/stories/Tag.stories'

import '~core/ui/cardHeader'

const { headerText, tagText } = createCoreCardHeaderProps()

type IYCoreCardHeaderMeta = Meta<IYCoreCardHeaderProps>

/**
 * ## Core CardHeader
 */
const meta: IYCoreCardHeaderMeta = {
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
      <y-core-card-header
        .disabled=${disabled}
        .size=${size}
        .headerText=${headerText}
        .tagText=${tagText}
        .tagVariant=${tagVariant}
        .headerIcon=${headerIcon}
        style="border: 1px dashed; padding: 8px;"
      >
      </y-core-card-header>
    `
  },
  argTypes: {
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size']),
    headerText: {
      type: 'string',
      description: 'Текст заголовка',
      ...getComponentContentTable(headerText),
    },
    tagText: {
      type: 'string',
      description: 'Текст тега',
      ...getComponentContentTable(tagText),
    },
    tagVariant: yCoreTagStoryMeta.argTypes?.variant,
    headerIcon: yCoreIconStoryMeta.argTypes?.icon,
  },
  args: {
    disabled: false,
    size: 'medium',
    headerText: 'Header',
    tagText: 'Tag name',
    tagVariant: 'accent',
    headerIcon: undefined,
  },
} satisfies IYCoreCardHeaderMeta

export default meta
type Story = StoryObj<IYCoreCardHeaderProps>

export const Playground: Story = { args: {} }
