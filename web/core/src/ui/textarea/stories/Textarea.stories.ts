import { html, nothing } from 'lit'
import { fn } from '@storybook/test'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit, pick } from 'radash'

import '~core/ui/textarea'
import '~core/ui/fieldIcon'

import {
  createCoreTextareaProps,
  type IYCoreTextareaProps,
  type TYCoreFieldInputEvents,
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
  YCoreTextFieldTagName as tagName,
} from '~shared/constants'

import yCoreTextFieldStoryMeta, { type TYCoreTextFieldMeta, type IYCoreTextFieldStorySlots } from '~core/ui/textField/stories/TextField.stories'
import yCoreFieldTextareaStoryMeta from '~core/ui/fieldTextarea/stories/FieldTextarea.stories'

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
import { yChevronDown, ySearch } from '~shared/icons'

export interface IYCoreTextareaStorySlots extends IYCoreTextFieldStorySlots {}

const { clearable } = createCoreTextareaProps()

export type TYCoreTextareaMeta = Pick<IYCoreTextareaProps, 'rows' | 'resize'> & Omit<TYCoreTextFieldMeta, 'type' | 'maskOptions' | 'autocomplete'> & {
  onRenderTextarea: TYCoreFieldInputEvents['onRender']
}

/**
 * ## Core Textarea
 */
const meta: Meta<TYCoreTextareaMeta> = {
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
    ] = useArgs<IYCoreTextareaProps>()

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
      <y-core-textarea
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
              <y-core-field-icon slot="before" .icon=${ySearch}></y-core-field-icon>
            `
          : nothing
        }
        ${showAfterSlot
          ? html`
              <y-core-field-icon slot="after" .icon=${yChevronDown}></y-core-field-icon>
            `
          : nothing
        }
      </y-core-textarea>
    `
  },
  argTypes: {
    // Extended Props
    ...omit(yCoreTextFieldStoryMeta.argTypes ?? {}, ['type', 'onRenderInput', 'maskOptions', 'annotationText', 'autocomplete']),
    ...pick(yCoreFieldTextareaStoryMeta.argTypes ?? {}, ['rows', 'resize']),

    // Component Props
    clearable: {
      type: 'boolean',
      description: 'Делает поле очищаемым',
      ...getComponentStateTable(clearable),
    },
    // Story Controls
    showBeforeSlot: {
      type: 'boolean',
      description: 'Показать компонент "BeforeSlot"',
      ...storyControlsTable,
    },
    showAfterSlot: {
      type: 'boolean',
      description: 'Показать компонент "AfterSlot"',
      ...storyControlsTable,
    },
    locatorLabel: {
      type: 'string',
      description: 'Локатор для лейбла',
      ...getComponentContentTable(),
    },
    locatorError: {
      type: 'string',
      description: 'Локатор для ошибки',
      ...getComponentContentTable(),
    },
    isLongText: isLongTextArgType,
    onRenderTextarea: yCoreFieldTextareaStoryMeta.argTypes?.onRender,
    // Component Events
    onClear: {
      type: 'function',
      description: 'Событие очистки',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(yCoreTextFieldStoryMeta.args ?? {}, ['type', 'onRenderInput', 'maskOptions', 'annotationText', 'autocomplete']),
    ...pick(yCoreFieldTextareaStoryMeta.args ?? {}, ['rows', 'resize']),

    clearable: false,
    showBeforeSlot: false,
    showAfterSlot: false,
    isLongText: false,
    locatorLabel: undefined,
    locatorError: undefined,
    onRenderTextarea: yCoreFieldTextareaStoryMeta.args?.onRender,
    onClear: fn(),
  },
} satisfies Meta<TYCoreTextareaMeta>

export default meta
type Story = StoryObj<IYCoreTextareaProps>

export const Playground: Story = { args: {} }

export const WithMaxlength: Story = {
  name: 'С ограничением по символам',
  args: {
    maxlength: 250,
    value: 'Поле с ограничением по символам',
    labelText: 'Комментарий',
    placeholder: 'Введите текст...',
  },
}
