import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'

import { createCoreRatingProps, type IAltCoreRatingProps, type TAltCoreRatingEvents } from '~core/ui/rating/models/types'
import { AltCoreRatingTagName as tagName } from '~shared/constants'
import { getComponentContentTable, getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'

import '~core/ui/rating'

const { value, max, readonly, disabled, required, size, accessibleName } = createCoreRatingProps()

type TAltCoreRatingStoryMeta = IAltCoreRatingProps & TAltCoreRatingEvents

/**
 * ## Core Rating
 * Star rating, to show a score or to pick one.
 *
 * - An editable rating is a WAI-ARIA radio group: Tab reaches the checked star, the arrow keys, Home and End pick another,
 *   and a click picks the star under the pointer. ArrowLeft and ArrowRight follow the reading direction.
 * - `readonly` shows the score as an image named "4 of 5"; fractions such as 4.5 fill part of a star.
 * - `accessibleName` names the group ("Rating" by default). With a `name` the value takes part in a native form,
 *   and `required` blocks submission until a star is picked.
 * - `change` fires with `{ value }` when the user picks a star.
 */
const meta: Meta<TAltCoreRatingStoryMeta> = {
  title: '✅ Rating',
  id: 'rating',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-rating
      .value=${args.value}
      .max=${args.max}
      .readonly=${args.readonly}
      .disabled=${args.disabled}
      .required=${args.required}
      .size=${args.size}
      .accessibleName=${args.accessibleName}
      @change=${action('change')}
    ></alt-core-rating>
  `,
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Score from 0 to `max`. A read-only rating may show fractions',
      ...getComponentContentTable(value),
    },
    max: {
      control: { type: 'number' },
      description: 'Number of stars',
      ...getComponentContentTable(max),
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Shows the score without letting the user change it',
      ...getComponentStateTable(readonly),
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the rating',
      ...getComponentStateTable(disabled),
    },
    required: {
      control: { type: 'boolean' },
      description: 'A form with this rating cannot be submitted without a score',
      ...getComponentStateTable(required),
    },
    size: {
      ...sizeArgType([EAltSizes.SMALL, EAltSizes.MEDIUM, EAltSizes.LARGE]),
      description: 'Star size: 16px, 20px or 24px',
      ...getComponentStateTable(size),
    },
    accessibleName: {
      control: { type: 'text' },
      description: 'Accessible name of the rating',
      ...getComponentContentTable(accessibleName),
    },
    onChange: {
      type: 'function',
      description: 'Fires with `{ value }` when the user picks a star',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    value: 3,
    max,
    readonly,
    disabled,
    required,
    size,
    accessibleName: 'Service rating',
  },
}

export default meta
type Story = StoryObj<TAltCoreRatingStoryMeta>

export const Playground: Story = {}

export const ReadOnly: Story = {
  parameters: { docs: { description: { story: 'Scores shown as images, with a fraction and in three sizes.' } } },
  render: () => html`
    <div style="display: grid; gap: 12px;">
      <alt-core-rating readonly value="4.5" size="small" accessible-name="Average rating"></alt-core-rating>
      
      <alt-core-rating readonly value="3" accessible-name="Master rating"></alt-core-rating>
      
      <alt-core-rating readonly value="5" size="large" accessible-name="Salon rating"></alt-core-rating>
    </div>
  `,
}
