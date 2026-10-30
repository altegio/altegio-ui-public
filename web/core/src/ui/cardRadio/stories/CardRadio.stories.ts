import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import type { IAltCoreCardRadioProps } from '~core/ui/cardRadio/models/types'
import { AltCoreCardRadioTagName as tagName } from '~shared/constants'
import { EAltSizes } from '~shared/types/global'
import altCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'

import '~core/ui/cardRadio'

type TAltCoreCardRadioMeta = Meta<IAltCoreCardRadioProps>

/**
 * ## Core CardRadio
 * Helper component used by CardButton and CardSelect
 */
const meta: TAltCoreCardRadioMeta = {
  title: 'Cards/Partials/✅ CardRadio',
  id: 'cardRadio',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    size,
    checked,
  }) => {
    return html`
      <alt-core-card-radio
        .disabled=${disabled}
        .size=${size}
        .checked=${checked}
        style="border: 1px dotted;"
      >
      </alt-core-card-radio>
    `
  },
  argTypes: { ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size', 'checked']) },
  args: {
    disabled: false,
    size: EAltSizes.MEDIUM,
    checked: false,
  },
} satisfies TAltCoreCardRadioMeta

export default meta
type Story = StoryObj<IAltCoreCardRadioProps>

export const Playground: Story = { args: {} }
