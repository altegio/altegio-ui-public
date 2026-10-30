import { html, nothing } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreCardWrapperProps,
  type IAltCoreCardWrapperProps,
  type TAltCoreCardWrapperEvents,
} from '~core/ui/cardWrapper/models/types'
import {
  AltCoreCardWrapperTagName as tagName,
} from '~shared/constants'
import {
  storyControlsTable,
  getComponentEmitsTable,
  getComponentStateTable,
} from '~shared/.storybook/tables'
import {
  checked as checkedArgType,
  disabled as disabledArgType,
  hoverable as hoverableArgType,
  focusable as focusableArgType,
  size as sizeArgType,
} from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'
import { altMagic } from '~shared/icons'
import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'

import '~core/ui/cardWrapper'
import '~core/ui/cardIcon'
import '~core/ui/cardRadio'
import '~core/ui/cardCheckbox'

const { checked, disabled, hoverable, focusable, size } = createCoreCardWrapperProps()

export interface IAltCoreCardWrapperStorySlots {
  showCardIcon: boolean
  showCardRadio: boolean
  showCardCheckbox: boolean
}

type AltCoreCardWrapperMeta = Meta<IAltCoreCardWrapperProps & IAltCoreCardWrapperStorySlots & Pick<TAltCoreCardWrapperEvents, 'onBlur' | 'onFocus'> & {
  onClick: (event: Event) => void
}>

/**
 * ## Core CardWrapper
 */
const meta: AltCoreCardWrapperMeta = {
  title: 'Cards/Partials/⚠️ CardWrapper',
  id: 'cardWrapper',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    checked,
    disabled,
    hoverable,
    focusable,
    size,
    showCardIcon,
    showCardRadio,
    showCardCheckbox,
    onClick,
    onBlur,
    onFocus,
  }) => {
    return html`
      <alt-core-card-wrapper
        .checked=${checked}
        .disabled=${disabled}
        .hoverable=${hoverable}
        .focusable=${focusable}
        .size=${size}
        @click=${onClick}
        @blur=${onBlur}
        @focus=${onFocus}
      >
        ${showCardIcon
          ? html`
              <alt-core-card-icon
                .icon=${altMagic}
                .variant=${EAltCoreColorIconVariant.GREY}
              >
              </alt-core-card-icon>
            `
          : nothing
        }
        ${showCardRadio
          ? html`<alt-core-card-radio></alt-core-card-radio>`
          : nothing
        }
        ${showCardCheckbox && !showCardRadio
          ? html`<alt-core-card-checkbox></alt-core-card-checkbox>`
          : nothing
        }
      </alt-core-card-wrapper>
    `
  },
  argTypes: {
    checked: {
      ...checkedArgType,
      ...getComponentStateTable(checked),
    },
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
    hoverable: {
      ...hoverableArgType,
      ...getComponentStateTable(hoverable),
    },
    focusable: {
      ...focusableArgType,
      ...getComponentStateTable(focusable),
    },
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
        EAltSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },

    // Story Controls
    showCardIcon: {
      type: 'boolean',
      description: 'Show the "CardIcon" component',
      ...storyControlsTable,
    },
    showCardRadio: {
      type: 'boolean',
      description: 'Show the "CardRadio" component',
      ...storyControlsTable,
    },
    showCardCheckbox: {
      type: 'boolean',
      description: 'Show the "CardCheckbox" component',
      ...storyControlsTable,
    },

    // Component Events
    onClick: {
      type: 'function',
      description: 'Click event',
      ...getComponentEmitsTable(),
    },
    onFocus: {
      type: 'function',
      description: 'Focus event',
      ...getComponentEmitsTable(),
    },
    onBlur: {
      type: 'function',
      description: 'Blur event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    checked,
    disabled,
    hoverable,
    focusable,
    size,
    showCardIcon: true,
    showCardRadio: true,
    showCardCheckbox: false,
    onClick: fn(),
    onBlur: fn(),
    onFocus: fn(),
  },
} satisfies AltCoreCardWrapperMeta

export default meta
type Story = StoryObj<IAltCoreCardWrapperProps>

export const Playground: Story = { args: {} }
