import { html, nothing } from 'lit'
import { fn } from 'storybook/test'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit, pick } from 'radash'

import '~core/ui/textarea'
import '~core/ui/fieldIcon'

import {
  createCoreTextareaProps,
  type IAltCoreTextareaProps,
  type TAltCoreFieldInputEvents,
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type MouseEnterEvent,
  type MouseLeaveEvent,
  type ClickOutsideEvent,
  type KeydownEvent,
  type RenderEvent,
  type ClearEvent,
} from '../models/types'
import {
  AltCoreTextFieldTagName as tagName,
} from '~shared/constants'

import altCoreTextFieldStoryMeta, { type TAltCoreTextFieldMeta, type IAltCoreTextFieldStorySlots } from '~core/ui/textField/stories/TextField.stories'
import altCoreFieldTextareaStoryMeta from '~core/ui/fieldTextarea/stories/FieldTextarea.stories'

import {
  storyControlsTable,
  getComponentStateTable,
  getComponentEmitsTable,
  getComponentContentTable,
} from '~shared/.storybook/tables'
import {
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { altChevronDown, altSearch } from '~shared/icons'

export interface IAltCoreTextareaStorySlots extends IAltCoreTextFieldStorySlots {}

const { clearable } = createCoreTextareaProps()

export type TAltCoreTextareaMeta = Pick<IAltCoreTextareaProps, 'rows' | 'resize'> & Omit<TAltCoreTextFieldMeta, 'type' | 'maskOptions' | 'autocomplete'> & {
  onRenderTextarea: TAltCoreFieldInputEvents['onRender']
}

/**
 * ## Core Textarea
 */
const meta: Meta<TAltCoreTextareaMeta> = {
  title: 'Inputs/✅ TextArea',
  id: 'textarea',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled, readonly, error, size, value, name, placeholder, required, maxlength, autofocus, labelText, labelTooltipText, labelDebounce, showBeforeSlot, showAfterSlot, isLongText, errors, clearable, showErrors, rows, resize,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<IAltCoreTextareaProps>()

    const handleInput = (event: InputEvent) => {
      updateArgs({ ...args, value: String(event.detail.value) })
      action('input')(event)
    }

    const handleBlur = (event: BlurEvent) => {
      action('blur')(event)
    }

    const handleFocus = (event: FocusEvent) => {
      action('focus')(event)
    }

    const handleMouseEnter = (event: MouseEnterEvent) => {
      action('mouse-enter')(event)
    }

    const handleMouseLeave = (event: MouseLeaveEvent) => {
      action('mouse-leave')(event)
    }

    const handleClickOutside = (event: ClickOutsideEvent) => {
      action('click-outside')(event)
    }

    const handleClick = (event: Event) => {
      action('click')(event)
    }

    const handleKeydown = (event: KeydownEvent) => {
      action('keydown')(event)
    }

    const handleRenderTextarea = (event: RenderEvent) => {
      action('render-textarea')(event)
    }

    const handleClear = (event: ClearEvent) => {
      updateArgs({ ...args, value: '' })
      action('clear')(event)
    }

    const computedErrors = errors ?? showErrors
    const storyErrors = isLongText
      ? showErrors.length > 1
        ? [
          LOREM_IPSUM,
          LOREM_IPSUM,
        ]
        : [LOREM_IPSUM]
      : computedErrors

    return html`
      <alt-core-textarea
        .disabled=${disabled}
        .readonly=${readonly}
        .error=${error}
        .size=${size}
        .value=${value}
        .name=${name}
        .placeholder=${placeholder}
        .required=${required}
        .maxlength=${maxlength}
        .autofocus=${autofocus}
        .labelText=${isLongText ? LOREM_IPSUM : labelText}
        .labelTooltipText=${isLongText ? LOREM_IPSUM : labelTooltipText}
        .labelDebounce=${labelDebounce}
        .errors=${storyErrors}
        .clearable=${clearable}
        .rows=${rows}
        .resize=${resize}
        @blur=${handleBlur}
        @focus=${handleFocus}
        @mouse-enter=${handleMouseEnter}
        @mouse-leave=${handleMouseLeave}
        @click-outside=${handleClickOutside}
        @click=${handleClick}
        @input=${handleInput}
        @keydown=${handleKeydown}
        @render-textarea=${handleRenderTextarea}
        @clear=${handleClear}
      >
        ${showBeforeSlot
          ? html`
              <alt-core-field-icon slot="before" .icon=${altSearch}></alt-core-field-icon>
            `
          : nothing
        }
        ${showAfterSlot
          ? html`
              <alt-core-field-icon slot="after" .icon=${altChevronDown}></alt-core-field-icon>
            `
          : nothing
        }
      </alt-core-textarea>
    `
  },
  argTypes: {
    // Extended Props
    ...omit(altCoreTextFieldStoryMeta.argTypes ?? {}, ['type', 'onRenderInput', 'maskOptions', 'annotationText', 'autocomplete']),
    ...pick(altCoreFieldTextareaStoryMeta.argTypes ?? {}, ['rows', 'resize']),

    // Component Props
    clearable: {
      type: 'boolean',
      description: 'Allow the field to be cleared',
      ...getComponentStateTable(clearable),
    },
    // Story Controls
    showBeforeSlot: {
      type: 'boolean',
      description: 'Show the "BeforeSlot" component',
      ...storyControlsTable,
    },
    showAfterSlot: {
      type: 'boolean',
      description: 'Show the "AfterSlot" component',
      ...storyControlsTable,
    },
    locatorLabel: {
      type: 'string',
      description: 'Data locator for the label',
      ...getComponentContentTable(),
    },
    locatorError: {
      type: 'string',
      description: 'Data locator for the error',
      ...getComponentContentTable(),
    },
    isLongText: isLongTextArgType,
    onRenderTextarea: altCoreFieldTextareaStoryMeta.argTypes?.onRender,
    // Component Events
    onClear: {
      type: 'function',
      description: 'Clear event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(altCoreTextFieldStoryMeta.args ?? {}, ['type', 'onRenderInput', 'maskOptions', 'annotationText', 'autocomplete']),
    ...pick(altCoreFieldTextareaStoryMeta.args ?? {}, ['rows', 'resize']),

    clearable: false,
    showBeforeSlot: false,
    showAfterSlot: false,
    isLongText: false,
    locatorLabel: undefined,
    locatorError: undefined,
    onRenderTextarea: altCoreFieldTextareaStoryMeta.args?.onRender,
    onClear: fn(),
  },
} satisfies Meta<TAltCoreTextareaMeta>

export default meta
type Story = StoryObj<IAltCoreTextareaProps>

export const Playground: Story = { args: {} }

export const WithMaxlength: Story = {
  name: 'With a character limit',
  args: {
    maxlength: 250,
    value: 'Field with a character limit',
    labelText: 'Comment',
    placeholder: 'Enter text...',
  },
}
