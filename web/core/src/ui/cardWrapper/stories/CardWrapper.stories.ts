import { html, nothing } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreCardWrapperProps,
  type IYCoreCardWrapperProps,
  type TYCoreCardWrapperEvents,
} from '~core/ui/cardWrapper/models/types'
import {
  YCoreCardWrapperTagName as tagName,
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
import { EYSizes } from '~shared/types/global'
import { yMagic } from '~shared/icons'
import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'

import '~core/ui/cardWrapper'
import '~core/ui/cardIcon'
import '~core/ui/cardRadio'
import '~core/ui/cardCheckbox'

const { checked, disabled, hoverable, focusable, size } = createCoreCardWrapperProps()

export interface IYCoreCardWrapperStorySlots {
  showCardIcon: boolean
  showCardRadio: boolean
  showCardCheckbox: boolean
}

type YCoreCardWrapperMeta = Meta<IYCoreCardWrapperProps & IYCoreCardWrapperStorySlots & Pick<TYCoreCardWrapperEvents, 'onBlur' | 'onFocus'> & {
  onClick: (event: Event) => void
}>

/**
 * ## Core CardWrapper
 */
const meta: YCoreCardWrapperMeta = {
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
      <y-core-card-wrapper
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
              <y-core-card-icon
                .icon=${yMagic}
                .variant=${EYCoreColorIconVariant.GREY}
              >
              </y-core-card-icon>
            `
          : nothing
        }
        ${showCardRadio
          ? html`<y-core-card-radio></y-core-card-radio>`
          : nothing
        }
        ${showCardCheckbox && !showCardRadio
          ? html`<y-core-card-checkbox></y-core-card-checkbox>`
          : nothing
        }
      </y-core-card-wrapper>
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
        EYSizes.SMALL,
        EYSizes.MEDIUM,
        EYSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },

    // Story Controls
    showCardIcon: {
      type: 'boolean',
      description: 'Показать компонент "CardIcon"',
      ...storyControlsTable,
    },
    showCardRadio: {
      type: 'boolean',
      description: 'Показать компонент "CardRadio"',
      ...storyControlsTable,
    },
    showCardCheckbox: {
      type: 'boolean',
      description: 'Показать компонент "CardCheckbox"',
      ...storyControlsTable,
    },

    // Component Events
    onClick: {
      type: 'function',
      description: 'Событие клика',
      ...getComponentEmitsTable(),
    },
    onFocus: {
      type: 'function',
      description: 'Событие фокуса',
      ...getComponentEmitsTable(),
    },
    onBlur: {
      type: 'function',
      description: 'Событие потери фокуса',
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
} satisfies YCoreCardWrapperMeta

export default meta
type Story = StoryObj<IYCoreCardWrapperProps>

export const Playground: Story = { args: {} }
