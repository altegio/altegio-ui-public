import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit } from 'radash'
import { addPrefixToObjectKeys } from '~shared/utils/helpers'

import '~core/ui/datePicker'

import altCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import altCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import altCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import altCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import altCoreErrorStoryMeta, { type IAltCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import altCoreCalendarStoryMeta, { type TStoryProps } from '~core/ui/calendar/stories/Calendar.stories'

import type { IAltCoreDatePickerProps } from '~core/ui/datePicker/models/types'
import {
  AltCoreDatePickerTagName as tagName,
} from '~shared/constants'
import { formatDate } from '~shared/utils/dateTime'
import dayjs from 'dayjs'

export interface IAltCoreDatePickerStoryProps extends
  IAltCoreDatePickerProps, TStoryProps, IAltCoreErrorStoryProps {}

/**
 * ## Core DatePicker
 */
const meta: Meta<IAltCoreDatePickerStoryProps> = {
  title: 'Inputs/✅ DatePicker',
  id: 'datePicker',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    isRange,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    errors,
    showErrors,
    calendarHeaderSelectors,
    minDate,
    maxDate,
    size,
    placeholder,
    disabled,
    readonly,
    localeData,
    required,
  }) => {
    return html`
      <div style="padding: 50px 50px 350px; margin: 20px; border: 1px dashed black; border-radius: 8px;">
        <div style="max-width: 300px; padding: 10px; overflow: hidden">
          <alt-core-date-picker
            .isRange=${isRange}
            .calendarHeaderSelectors=${calendarHeaderSelectors}
            .disabled=${disabled}
            .readonly=${readonly}
            .required=${required}
            .labelText=${labelText}
            .labelTooltipText=${labelTooltipText}
            .labelDebounce=${labelDebounce}
            .annotationText=${annotationText}
            .errors=${errors ?? showErrors}
            .size=${size}
            .placeholder=${placeholder}
            .locale=${localeData}
            .minDate=${minDate && formatDate(dayjs(minDate))}
            .maxDate=${maxDate && formatDate(dayjs(maxDate))}
          >
          </alt-core-date-picker>
        </div>
      </div>
    `
  },
  argTypes: {
    // Extended Props
    ...omit(altCoreFieldWrapperStoryMeta.argTypes ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onBlur', 'onFocus', 'onMouseEnter', 'onMouseLeave', 'onClickOutside', 'onClick']),
    ...omit(altCoreFieldInputStoryMeta.argTypes ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'value', 'maxlength', 'type', 'onRender', 'onInput', 'onKeydown', 'onBlur', 'onFocus']),
    ...addPrefixToObjectKeys(omit(altCoreLabelStoryMeta.argTypes ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText']), 'label'),
    ...addPrefixToObjectKeys(omit(altCoreAnnotationStoryMeta.argTypes ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(altCoreErrorStoryMeta.argTypes ?? {}, ['isLongText']),
    ...omit(
      altCoreCalendarStoryMeta.argTypes ?? {},
      [
        'onSelect',
        'headerSelectors',
      ],
    ),

    calendarHeaderSelectors: altCoreCalendarStoryMeta.argTypes?.headerSelectors ?? {},
  },
  args: {
    // Extended Props
    ...omit(altCoreFieldWrapperStoryMeta.args ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onBlur', 'onFocus', 'onMouseEnter', 'onMouseLeave', 'onClickOutside', 'onClick']),
    ...omit(altCoreFieldInputStoryMeta.args ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'value', 'maxlength', 'type', 'onRender', 'onInput', 'onKeydown', 'onBlur', 'onFocus']),
    ...addPrefixToObjectKeys(omit(altCoreLabelStoryMeta.args ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText']), 'label'),
    ...addPrefixToObjectKeys(omit(altCoreAnnotationStoryMeta.args ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(altCoreErrorStoryMeta.args ?? {}, ['isLongText']),
    ...omit(
      altCoreCalendarStoryMeta.args ?? {},
      [
        'onSelect',
        'headerSelectors',
      ],
    ),

    calendarHeaderSelectors: altCoreCalendarStoryMeta.args?.headerSelectors,

    isRange: true,
  },
} satisfies Meta<IAltCoreDatePickerStoryProps>

export default meta
type Story = StoryObj<IAltCoreDatePickerStoryProps>

export const Playground: Story = { args: {} }
