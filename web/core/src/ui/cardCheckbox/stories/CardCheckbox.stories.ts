import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import type { IYCoreCardCheckboxProps } from '../models/types'
import { YCoreCardCheckboxTagName as tagName } from '~shared/constants'
import { EYSizes } from '~shared/types/global'
import yCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'

import '~core/ui/cardCheckbox'

type TYCoreCardCheckboxMeta = Meta<IYCoreCardCheckboxProps>

/**
 * ## Core CardCheckbox
 * вспомогательный компонент для CardButton/CardSelect
 */
const meta: TYCoreCardCheckboxMeta = {
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
      <y-core-card-checkbox
        .disabled=${disabled}
        .size=${size}
        .checked=${checked}
        style="border: 1px dotted;"
      >
      </y-core-card-checkbox>
    `
  },
  argTypes: { ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['size', 'checked', 'disabled']) },
  args: {
    disabled: false,
    size: EYSizes.MEDIUM,
    checked: false,
  },
} satisfies TYCoreCardCheckboxMeta

export default meta
type Story = StoryObj<IYCoreCardCheckboxProps>

export const Playground: Story = { args: {} }
