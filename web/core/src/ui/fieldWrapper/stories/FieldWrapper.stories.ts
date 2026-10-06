import { html, nothing } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreFieldWrapperProps,
  type IYCoreFieldWrapperProps,
  type TYCoreFieldWrapperEvents,
} from '~core/ui/fieldWrapper/models/types'
import {
  YCoreFieldWrapperTagName as tagName,
} from '~shared/constants'
import {
  storyControlsTable,
  getComponentStateTable,
  getComponentEmitsTable,
} from '~shared/.storybook/tables'
import {
  disabled as disabledArgType,
  readonly as readonlyArgType,
  error as errorArgType,
  size as sizeArgType,
} from '~shared/.storybook/argTypes'
import { EYSizes } from '~shared/types/global'
import { yChevronDown } from '~shared/icons'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldAvatar'
import '~core/ui/fieldIcon'
import '~core/ui/fieldInput'

const { disabled, readonly, error, size } = createCoreFieldWrapperProps()

export interface IYCoreFieldWrapperStorySlots {
  showFieldAvatar: boolean
  showFieldInput: boolean
  showFieldIcon: boolean
}

type YCoreFieldWrapperMeta = Meta<IYCoreFieldWrapperProps & IYCoreFieldWrapperStorySlots & Pick<TYCoreFieldWrapperEvents, 'onBlur' | 'onFocus' | 'onMouseEnter' | 'onMouseLeave' | 'onClickOutside'> & {
  onClick: (event: Event) => void
}>

/**
 * ## Core FieldWrapper
 */
const meta: YCoreFieldWrapperMeta = {
  title: 'Inputs/Partials/⚠️ FieldWrapper',
  id: 'fieldWrapper',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    readonly,
    error,
    size,
    showFieldAvatar,
    showFieldInput,
    showFieldIcon,
    onClick,
    onClickOutside,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
  }) => {
    return html`
      <y-core-field-wrapper
        .disabled=${disabled}
        .readonly=${readonly}
        .error=${error}
        .size=${size}
        @click=${onClick}
        @click-outside=${onClickOutside}
        @blur=${onBlur}
        @focus=${onFocus}
        @mouse-enter=${onMouseEnter}
        @mouse-leave=${onMouseLeave}
      >
        ${showFieldAvatar
          ? html`
              <y-core-field-avatar photo="https://i.pravatar.cc/100" initials="Altegio Clients"></y-core-field-avatar>
            `
          : nothing
        }
        ${showFieldInput
          ? html`
              <y-core-field-input value="Default value" .hideSpaceLeft=${showFieldAvatar} .hideSpaceRight=${showFieldIcon}></y-core-field-input>
            `
          : nothing
        }
        ${showFieldIcon
          ? html`
              <y-core-field-icon .icon=${yChevronDown}></y-core-field-icon>
            `
          : nothing
        }
      </y-core-field-wrapper>
    `
  },
  argTypes: {
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
    readonly: {
      ...readonlyArgType,
      ...getComponentStateTable(readonly),
    },
    error: {
      ...errorArgType,
      ...getComponentStateTable(error),
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
    showFieldAvatar: {
      type: 'boolean',
      description: 'Показать компонент "FieldAvatar"',
      ...storyControlsTable,
    },
    showFieldInput: {
      type: 'boolean',
      description: 'Показать компонент "FieldInput"',
      ...storyControlsTable,
    },
    showFieldIcon: {
      type: 'boolean',
      description: 'Показать компонент "FieldIcon"',
      ...storyControlsTable,
    },

    // Component Events
    onClick: {
      type: 'function',
      description: 'Событие клика',
      ...getComponentEmitsTable(),
    },
    onClickOutside: {
      type: 'function',
      description: 'Событие клика вне компонента',
      ...getComponentEmitsTable(),
    },
    onBlur: {
      type: 'function',
      description: 'Событие фокуса',
      ...getComponentEmitsTable(),
    },
    onFocus: {
      type: 'function',
      description: 'Событие потери фокуса',
      ...getComponentEmitsTable(),
    },
    onMouseEnter: {
      type: 'function',
      description: 'Событие наведения мыши',
      ...getComponentEmitsTable(),
    },
    onMouseLeave: {
      type: 'function',
      description: 'Событие потери наведения мыши',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    disabled,
    readonly,
    error,
    size,
    showFieldAvatar: true,
    showFieldInput: true,
    showFieldIcon: true,
    onClick: fn(),
    onClickOutside: fn(),
    onBlur: fn(),
    onFocus: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
  },
} satisfies YCoreFieldWrapperMeta

export default meta
type Story = StoryObj<IYCoreFieldWrapperProps>

export const Playground: Story = { args: {} }
