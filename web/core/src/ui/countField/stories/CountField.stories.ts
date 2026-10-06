import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/countField'

import {
  createCoreCountFieldProps,
  type IYCoreCountFieldProps,
  type ChangedValueEvent,
  type TYCoreCountFieldEvents,
  DEFAULT_STRING_VALUE,
} from '~core/ui/countField/models/types'
import {
  YCoreCountFieldTagName as tagName,
} from '~shared/constants'
import { omit, pick } from 'radash'
import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import yCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import { addPrefixToObjectKeys } from '~shared/utils'
import yCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import yCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import type { IYCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import yCoreErrorStoryMeta from '~core/ui/error/stories/Error.stories'
import { getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'
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

export type TYCoreCountFieldMeta = IYCoreCountFieldProps & Pick<IYCoreErrorStoryProps, 'showErrors'> & TYCoreCountFieldEvents

/**
 * ## Core CountField
 */
const meta: Meta<TYCoreCountFieldMeta> = {
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
        <y-core-count-field 
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
        ></y-core-count-field>
      </div>
    `
  },
  argTypes: {
    min: {
      type: 'number',
      description: 'Минимальное значение',
      ...getComponentStateTable(min),
    },
    max: {
      type: 'number',
      description: 'Максимальное значение',
      ...getComponentStateTable(max),
    },
    onChangedValue: {
      type: 'function',
      description: 'Событие изменения значения',
      ...getComponentEmitsTable(),
    },
    ...omit(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave']),
    ...omit(yCoreFieldInputStoryMeta.argTypes ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'onRender', 'type', 'maxlength']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.argTypes ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.argTypes ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...pick(yCoreErrorStoryMeta.argTypes ?? {}, ['showErrors']),
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
    ...pick(yCoreFieldInputStoryMeta.args ?? {}, ['onFocus', 'onBlur', 'onKeydown']),
  },
} satisfies Meta<TYCoreCountFieldMeta>

export default meta
type Story = StoryObj<TYCoreCountFieldMeta>

export const Playground: Story = { args: {} }
