import { html, nothing } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreFieldWrapperProps,
  type IAltCoreFieldWrapperProps,
  type TAltCoreFieldWrapperEvents,
} from '~core/ui/fieldWrapper/models/types'
import {
  AltCoreFieldWrapperTagName as tagName,
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
import { EAltSizes } from '~shared/types/global'
import { altChevronDown } from '~shared/icons'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldAvatar'
import '~core/ui/fieldIcon'
import '~core/ui/fieldInput'

const { disabled, readonly, error, size } = createCoreFieldWrapperProps()

export interface IAltCoreFieldWrapperStorySlots {
  showFieldAvatar: boolean
  showFieldInput: boolean
  showFieldIcon: boolean
}

type AltCoreFieldWrapperMeta = Meta<IAltCoreFieldWrapperProps & IAltCoreFieldWrapperStorySlots & Pick<TAltCoreFieldWrapperEvents, 'onBlur' | 'onFocus' | 'onMouseEnter' | 'onMouseLeave' | 'onClickOutside'> & {
  onClick: (event: Event) => void
}>

/**
 * ## Core FieldWrapper
 */
const meta: AltCoreFieldWrapperMeta = {
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
      <alt-core-field-wrapper
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
              <alt-core-field-avatar photo="https://i.pravatar.cc/100" initials="Altegio Clients"></alt-core-field-avatar>
            `
          : nothing
        }
        ${showFieldInput
          ? html`
              <alt-core-field-input value="Default value" .hideSpaceLeft=${showFieldAvatar} .hideSpaceRight=${showFieldIcon}></alt-core-field-input>
            `
          : nothing
        }
        ${showFieldIcon
          ? html`
              <alt-core-field-icon .icon=${altChevronDown}></alt-core-field-icon>
            `
          : nothing
        }
      </alt-core-field-wrapper>
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
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
        EAltSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },

    // Story Controls
    showFieldAvatar: {
      type: 'boolean',
      description: 'Show the "FieldAvatar" component',
      ...storyControlsTable,
    },
    showFieldInput: {
      type: 'boolean',
      description: 'Show the "FieldInput" component',
      ...storyControlsTable,
    },
    showFieldIcon: {
      type: 'boolean',
      description: 'Show the "FieldIcon" component',
      ...storyControlsTable,
    },

    // Component Events
    onClick: {
      type: 'function',
      description: 'Click event',
      ...getComponentEmitsTable(),
    },
    onClickOutside: {
      type: 'function',
      description: 'Outside click event',
      ...getComponentEmitsTable(),
    },
    onBlur: {
      type: 'function',
      description: 'Focus event',
      ...getComponentEmitsTable(),
    },
    onFocus: {
      type: 'function',
      description: 'Blur event',
      ...getComponentEmitsTable(),
    },
    onMouseEnter: {
      type: 'function',
      description: 'Mouse enter event',
      ...getComponentEmitsTable(),
    },
    onMouseLeave: {
      type: 'function',
      description: 'Mouse leave event',
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
} satisfies AltCoreFieldWrapperMeta

export default meta
type Story = StoryObj<IAltCoreFieldWrapperProps>

export const Playground: Story = { args: {} }
