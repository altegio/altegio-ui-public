import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import { type IYCoreCardIconProps } from '~core/ui/cardIcon/models/types'
import { YCoreCardIconTagName as tagName } from '~shared/constants'
import { yMagic } from '~shared/icons'
import { EYSizes } from '~shared/types/global'
import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'

import yCoreColorIconStoryMeta from '~core/ui/colorIcon/stories/ColorIcon.stories'
import yCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'

import '~core/ui/cardIcon'

type TYCoreCardIconMeta = Meta<IYCoreCardIconProps>

/**
 * ## CoreCardIcon
 * вспомогательный компонент для CardButton/CardSelect
 */
const meta: TYCoreCardIconMeta = {
  title: 'Cards/Partials/✅ CardIcon',
  id: 'cardIcon',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    icon,
    size,
    variant,
  }) => {
    return html`
      <y-core-card-icon
        .icon=${icon}
        .size=${size}
        .variant=${variant}
        style="border: 1px dotted;"
      >
      </y-core-card-icon>
    `
  },
  argTypes: {
    ...pick(yCoreColorIconStoryMeta.argTypes ?? {}, ['icon', 'variant']),
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['size']),
  },
  args: {
    icon: yMagic,
    size: EYSizes.MEDIUM,
    variant: EYCoreColorIconVariant.GREY,
  },
} satisfies TYCoreCardIconMeta

export default meta
type Story = StoryObj<IYCoreCardIconProps>

export const Playground: Story = { args: {} }
