import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import { type IAltCoreCardIconProps } from '~core/ui/cardIcon/models/types'
import { AltCoreCardIconTagName as tagName } from '~shared/constants'
import { altMagic } from '~shared/icons'
import { EAltSizes } from '~shared/types/global'
import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'

import altCoreColorIconStoryMeta from '~core/ui/colorIcon/stories/ColorIcon.stories'
import altCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'

import '~core/ui/cardIcon'

type TAltCoreCardIconMeta = Meta<IAltCoreCardIconProps>

/**
 * ## CoreCardIcon
 * Helper component used by CardButton and CardSelect
 */
const meta: TAltCoreCardIconMeta = {
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
      <alt-core-card-icon
        .icon=${icon}
        .size=${size}
        .variant=${variant}
        style="border: 1px dotted;"
      >
      </alt-core-card-icon>
    `
  },
  argTypes: {
    ...pick(altCoreColorIconStoryMeta.argTypes ?? {}, ['icon', 'variant']),
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['size']),
  },
  args: {
    icon: altMagic,
    size: EAltSizes.MEDIUM,
    variant: EAltCoreColorIconVariant.GREY,
  },
} satisfies TAltCoreCardIconMeta

export default meta
type Story = StoryObj<IAltCoreCardIconProps>

export const Playground: Story = { args: {} }
