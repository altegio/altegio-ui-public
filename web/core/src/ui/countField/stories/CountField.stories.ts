import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/countField'

import {
  createCoreCountFieldProps,
  type IAltCoreCountFieldProps,
  type ChangedValueEvent,
  type TAltCoreCountFieldEvents,
  DEFAULT_STRING_VALUE,
} from '~core/ui/countField/models/types'
import {
  AltCoreCountFieldTagName as tagName,
} from '~shared/constants'
import { omit, pick } from 'radash'
import altCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import altCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import { addPrefixToObjectKeys } from '~shared/utils'
import altCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import altCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import type { IAltCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import altCoreErrorStoryMeta from '~core/ui/error/stories/Error.stories'
import { getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import { useArgs } from 'storybook/preview-api'
import { action } from 'storybook/actions'
import type { BlurEvent } from '~core/ui/cardWrapper/models/types'
import type { KeydownEvent } from '~core/ui/fieldInput/models/types'

const { min,
  max,
  disabled,
  readonly,
  error,
  size,
  placeholder,
  required,
  autofocus,
  labelText,
  labelTooltipText,
  labelDebounce,
  annotationText,
  errors,
  name } = createCoreCountFieldProps()

export type TAltCoreCountFieldMeta = IAltCoreCountFieldProps & Pick<IAltCoreErrorStoryProps, 'showErrors'> & TAltCoreCountFieldEvents

/**
 * ## Core CountField
 */
const meta: Meta<TAltCoreCountFieldMeta> = {
  title: '✅ CountField',
  id: 'countField',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    min,
    max,
    disabled,
    readonly,
    error,
    size,
    value,
    name,
    placeholder,
    required,
    autofocus,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    errors,
    showErrors,
  }) => {
    const [, updateArgs] = useArgs()
    const computedErrors = errors ?? showErrors

    const handleFocus = (event: FocusEvent) => {
      action('focus')(event)
    }

    const handleBlur = (event: BlurEvent) => {
      action('blur')(event)
    }

    const handleKeydown = (event: KeydownEvent) => {
      action('keydown')(event)
    }

    const handleChangedValue = (event: ChangedValueEvent) => {
      updateArgs({ value: event.detail.value })
      action('changed-value')(event)
    }

    return html`
      <div style="width: 250px">
        <alt-core-count-field 
          min=${ifDefined(min)}
          max=${ifDefined(max)}
          .disabled=${disabled}
          .readonly=${readonly}
          .error=${error}
          .size=${size}
          .value=${value}
          .name=${name}
          .placeholder=${placeholder}
          .required=${required}
          .autofocus=${autofocus}
          .labelText=${labelText}
          .labelTooltipText=${labelTooltipText}
          .labelDebounce=${labelDebounce}
          .annotationText=${annotationText}
          .errors=${computedErrors}
          @focus=${handleFocus}
          @blur=${handleBlur}
          @keydown=${handleKeydown}
          @changed-value=${handleChangedValue}
        ></alt-core-count-field>
      </div>
    `
  },
  argTypes: {
    min: {
      type: 'number',
      description: 'Minimum value',
      ...getComponentStateTable(min),
    },
    max: {
      type: 'number',
      description: 'Maximum value',
      ...getComponentStateTable(max),
    },
    onChangedValue: {
      type: 'function',
      description: 'Value change event',
      ...getComponentEmitsTable(),
    },
    ...omit(altCoreFieldWrapperStoryMeta.argTypes ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave']),
    ...omit(altCoreFieldInputStoryMeta.argTypes ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'onRender', 'type', 'maxlength']),
    ...addPrefixToObjectKeys(omit(altCoreLabelStoryMeta.argTypes ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText']), 'label'),
    ...addPrefixToObjectKeys(omit(altCoreAnnotationStoryMeta.argTypes ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...pick(altCoreErrorStoryMeta.argTypes ?? {}, ['showErrors']),
  },
  args: {
    value: DEFAULT_STRING_VALUE,
    min,
    max,
    disabled,
    readonly,
    error,
    size,
    placeholder,
    required,
    autofocus,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    errors,
    name,
    ...pick(altCoreFieldInputStoryMeta.args ?? {}, ['onFocus', 'onBlur', 'onKeydown']),
  },
} satisfies Meta<TAltCoreCountFieldMeta>

export default meta
type Story = StoryObj<TAltCoreCountFieldMeta>

export const Playground: Story = { args: {} }
