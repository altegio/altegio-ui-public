import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit } from 'radash'
import { addPrefixToObjectKeys } from '~shared/utils/helpers'

import '~core/ui/datePicker'

import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import yCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import yCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import yCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import yCoreErrorStoryMeta, { type IYCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import yCoreCalendarStoryMeta, { type TStoryProps } from '~core/ui/calendar/stories/Calendar.stories'

import type { IYCoreDatePickerProps } from '~core/ui/datePicker/models/types'
import {
  YCoreDatePickerTagName as tagName,
} from '~shared/constants'
import { formatDate } from '~shared/utils/dateTime'
import dayjs from 'dayjs'

export interface IYCoreDatePickerStoryProps extends
  IYCoreDatePickerProps, TStoryProps, IYCoreErrorStoryProps {}

/**
 * ## Core DatePicker
 */
const meta: Meta<IYCoreDatePickerStoryProps> = {
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
          <y-core-date-picker
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
          </y-core-date-picker>
        </div>
      </div>
    `
  },
  argTypes: {
    // Extended Props
    ...omit(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onBlur', 'onFocus', 'onMouseEnter', 'onMouseLeave', 'onClickOutside', 'onClick']),
    ...omit(yCoreFieldInputStoryMeta.argTypes ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'value', 'maxlength', 'type', 'onRender', 'onInput', 'onKeydown', 'onBlur', 'onFocus']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.argTypes ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.argTypes ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(yCoreErrorStoryMeta.argTypes ?? {}, ['isLongText']),
    ...omit(
      yCoreCalendarStoryMeta.argTypes ?? {},
      [
        'onSelect',
        'headerSelectors',
      ],
    ),

    calendarHeaderSelectors: yCoreCalendarStoryMeta.argTypes?.headerSelectors ?? {},
  },
  args: {
    // Extended Props
    ...omit(yCoreFieldWrapperStoryMeta.args ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onBlur', 'onFocus', 'onMouseEnter', 'onMouseLeave', 'onClickOutside', 'onClick']),
    ...omit(yCoreFieldInputStoryMeta.args ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'value', 'maxlength', 'type', 'onRender', 'onInput', 'onKeydown', 'onBlur', 'onFocus']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.args ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.args ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(yCoreErrorStoryMeta.args ?? {}, ['isLongText']),
    ...omit(
      yCoreCalendarStoryMeta.args ?? {},
      [
        'onSelect',
        'headerSelectors',
      ],
    ),

    calendarHeaderSelectors: yCoreCalendarStoryMeta.args?.headerSelectors,

    isRange: true,
  },
} satisfies Meta<IYCoreDatePickerStoryProps>

export default meta
type Story = StoryObj<IYCoreDatePickerStoryProps>

export const Playground: Story = { args: {} }
