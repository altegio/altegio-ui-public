import { html, nothing } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit } from 'radash'

import '~core/ui/textField'
import '~core/ui/fieldIcon'

import {
  createCoreTextFieldProps,
  type IYCoreTextFieldProps,
  type TYCoreFieldWrapperEvents,
  type TYCoreFieldInputEvents,
  type TYCoreTextFieldEvents,
} from '../models/types'
import {
  YCoreTextFieldTagName as tagName,
} from '~shared/constants'

import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import yCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import yCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import yCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import yCoreErrorStoryMeta from '~core/ui/error/stories/Error.stories'

import type { IShowErrorsStoryProps } from '~shared/.storybook/argTypes'
import {
  storyControlsTable,
  getComponentStateTable,
  getComponentEmitsTable,
} from '~shared/.storybook/tables'
import {
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import { addPrefixToObjectKeys } from '~shared/utils/helpers'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { yChevronDown, ySearch } from '~shared/icons'

export interface IYCoreTextFieldStorySlots {
  showBeforeSlot: boolean
  showAfterSlot: boolean
  isLongText: boolean
}

const { clearable, maskOptions } = createCoreTextFieldProps()

export type TYCoreTextFieldMeta = IYCoreTextFieldProps & Pick<TYCoreFieldWrapperEvents, 'onBlur' | 'onFocus' | 'onMouseEnter' | 'onMouseLeave' | 'onClickOutside'> & Pick<TYCoreFieldInputEvents, 'onInput' | 'onKeydown' | 'onRender'> & IYCoreTextFieldStorySlots & IShowErrorsStoryProps & TYCoreTextFieldEvents & {
  onRenderInput: TYCoreFieldInputEvents['onRender']
  onClick: (event: Event) => void
  autocomplete?: string
}

/**
 * ## Core TextField
 */
const meta: Meta<TYCoreTextFieldMeta> = {
  title: 'Inputs/✅ TextField',
  id: 'textField',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled, readonly, error, size, value, name, type, placeholder, required, maxlength, autofocus, labelText, labelTooltipText, labelDebounce, annotationText, showBeforeSlot, showAfterSlot, isLongText, errors, clearable, maskOptions, showErrors, onBlur, onFocus, onMouseEnter, onMouseLeave, onClickOutside, onClick, onInput, onKeydown, onRenderInput, onClear,
  }) => {
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
      <y-core-text-field
        .disabled=${disabled}
        .readonly=${readonly}
        .error=${error}
        .size=${size}
        .value=${value}
        .name=${name}
        .type=${type}
        .placeholder=${placeholder}
        .required=${required}
        .maxlength=${maxlength}
        .autofocus=${autofocus}
        .labelText=${isLongText ? LOREM_IPSUM : labelText}
        .labelTooltipText=${isLongText ? LOREM_IPSUM : labelTooltipText}
        .labelDebounce=${labelDebounce}
        .annotationText=${isLongText ? LOREM_IPSUM : annotationText}
        .errors=${storyErrors}
        .clearable=${clearable}
        .maskOptions=${maskOptions}
        @blur=${onBlur}
        @focus=${onFocus}
        @mouse-enter=${onMouseEnter}
        @mouse-leave=${onMouseLeave}
        @click-outside=${onClickOutside}
        @click=${onClick}
        @input=${onInput}
        @keydown=${onKeydown}
        @render-input=${onRenderInput}
        @clear=${onClear}
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
      </y-core-text-field>
    `
  },
  argTypes: {
    // Extended Props
    ...omit(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon']),
    ...omit(yCoreFieldInputStoryMeta.argTypes ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'onRender']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.argTypes ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.argTypes ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(yCoreErrorStoryMeta.argTypes ?? {}, ['isLongText']),

    // Component Props
    clearable: {
      type: 'boolean',
      description: 'Делает поле очищаемым',
      ...getComponentStateTable(clearable),
    },
    maskOptions: {
      description: 'Конфигурация маски Maskito',
      ...getComponentStateTable(maskOptions),
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
    isLongText: isLongTextArgType,
    onRenderInput: yCoreFieldInputStoryMeta.args?.onRender,

    // Component Events
    onClear: {
      type: 'function',
      description: 'Событие очистки',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(yCoreFieldWrapperStoryMeta.args ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon']),
    ...omit(yCoreFieldInputStoryMeta.args ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'onRender']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.args ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.args ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(yCoreErrorStoryMeta.args ?? {}, ['isLongText']),

    clearable: false,
    maskOptions: undefined,
    showBeforeSlot: true,
    showAfterSlot: true,
    isLongText: false,
    onRenderInput: yCoreFieldInputStoryMeta.args?.onRender,
    onClear: fn(),
  },
} satisfies Meta<TYCoreTextFieldMeta>

export default meta

type Story = StoryObj<IYCoreTextFieldProps>

export const Playground: Story = { args: {} }
