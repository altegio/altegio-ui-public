import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import type { IAltCoreCardCheckboxProps } from '../models/types'
import { AltCoreCardCheckboxTagName as tagName } from '~shared/constants'
import { EAltSizes } from '~shared/types/global'
import altCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'

import '~core/ui/cardCheckbox'

type TAltCoreCardCheckboxMeta = Meta<IAltCoreCardCheckboxProps>

/**
 * ## Core CardCheckbox
 * Helper component used by CardButton and CardSelect
 */
const meta: TAltCoreCardCheckboxMeta = {
  title: 'Cards/Partials/✅ CardCheckbox',
  id: 'cardCheckbox',
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
      <alt-core-card-checkbox
        .disabled=${disabled}
        .size=${size}
        .checked=${checked}
        style="border: 1px dotted;"
      >
      </alt-core-card-checkbox>
    `
  },
  argTypes: { ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['size', 'checked', 'disabled']) },
  args: {
    disabled: false,
    size: EAltSizes.MEDIUM,
    checked: false,
  },
} satisfies TAltCoreCardCheckboxMeta

export default meta
type Story = StoryObj<IAltCoreCardCheckboxProps>

export const Playground: Story = { args: {} }
