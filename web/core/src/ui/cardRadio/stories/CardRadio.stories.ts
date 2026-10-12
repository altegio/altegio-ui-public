import { html } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import type { IYCoreCardRadioProps } from '~core/ui/cardRadio/models/types'
import { YCoreCardRadioTagName as tagName } from '~shared/constants'
import { EYSizes } from '~shared/types/global'
import yCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'

import '~core/ui/cardRadio'

type TYCoreCardRadioMeta = Meta<IYCoreCardRadioProps>

/**
 * ## Core CardRadio
 * вспомогательный компонент для CardButton/CardSelect
 */
const meta: TYCoreCardRadioMeta = {
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
      <y-core-card-radio
        .disabled=${disabled}
        .size=${size}
        .checked=${checked}
        style="border: 1px dotted;"
      >
      </y-core-card-radio>
    `
  },
  argTypes: { ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size', 'checked']) },
  args: {
    disabled: false,
    size: EYSizes.MEDIUM,
    checked: false,
  },
} satisfies TYCoreCardRadioMeta

export default meta
type Story = StoryObj<IYCoreCardRadioProps>

export const Playground: Story = { args: {} }
