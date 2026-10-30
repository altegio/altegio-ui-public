import { html, nothing } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit } from 'radash'

import '~core/ui/textField'
import '~core/ui/fieldIcon'

import {
  createCoreTextFieldProps,
  type IAltCoreTextFieldProps,
  type TAltCoreFieldWrapperEvents,
  type TAltCoreFieldInputEvents,
  type TAltCoreTextFieldEvents,
} from '../models/types'
import {
  AltCoreTextFieldTagName as tagName,
} from '~shared/constants'

import altCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import altCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import altCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import altCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import altCoreErrorStoryMeta from '~core/ui/error/stories/Error.stories'

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
import { altChevronDown, altSearch } from '~shared/icons'

export interface IAltCoreTextFieldStorySlots {
  showBeforeSlot: boolean
  showAfterSlot: boolean
  isLongText: boolean
}

const { clearable, maskOptions } = createCoreTextFieldProps()

export type TAltCoreTextFieldMeta = IAltCoreTextFieldProps & Pick<TAltCoreFieldWrapperEvents, 'onBlur' | 'onFocus' | 'onMouseEnter' | 'onMouseLeave' | 'onClickOutside'> & Pick<TAltCoreFieldInputEvents, 'onInput' | 'onKeydown' | 'onRender'> & IAltCoreTextFieldStorySlots & IShowErrorsStoryProps & TAltCoreTextFieldEvents & {
  onRenderInput: TAltCoreFieldInputEvents['onRender']
  onClick: (event: Event) => void
  autocomplete?: string
}

/**
 * ## Core TextField
 */
const meta: Meta<TAltCoreTextFieldMeta> = {
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
      <alt-core-text-field
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
      </alt-core-text-field>
    `
  },
  argTypes: {
    // Extended Props
    ...omit(altCoreFieldWrapperStoryMeta.argTypes ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon']),
    ...omit(altCoreFieldInputStoryMeta.argTypes ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'onRender']),
    ...addPrefixToObjectKeys(omit(altCoreLabelStoryMeta.argTypes ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(altCoreAnnotationStoryMeta.argTypes ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(altCoreErrorStoryMeta.argTypes ?? {}, ['isLongText']),

    // Component Props
    clearable: {
      type: 'boolean',
      description: 'Allow the field to be cleared',
      ...getComponentStateTable(clearable),
    },
    maskOptions: {
      description: 'Maskito mask configuration',
      ...getComponentStateTable(maskOptions),
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
    isLongText: isLongTextArgType,
    onRenderInput: altCoreFieldInputStoryMeta.args?.onRender,

    // Component Events
    onClear: {
      type: 'function',
      description: 'Clear event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(altCoreFieldWrapperStoryMeta.args ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon']),
    ...omit(altCoreFieldInputStoryMeta.args ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'onRender']),
    ...addPrefixToObjectKeys(omit(altCoreLabelStoryMeta.args ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(altCoreAnnotationStoryMeta.args ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(altCoreErrorStoryMeta.args ?? {}, ['isLongText']),

    clearable: false,
    maskOptions: undefined,
    showBeforeSlot: true,
    showAfterSlot: true,
    isLongText: false,
    onRenderInput: altCoreFieldInputStoryMeta.args?.onRender,
    onClear: fn(),
  },
} satisfies Meta<TAltCoreTextFieldMeta>

export default meta

type Story = StoryObj<IAltCoreTextFieldProps>

export const Playground: Story = { args: {} }
