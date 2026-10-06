import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, EventEmitter, Output } from '@angular/core'

import '~core/ui/datePicker'
import {
  createNgDatePickerProps,
  type IYNgDatePickerProps,
  type PickEvent,
} from '~ng/ui/datePicker/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const {
  date,
  isRange,
  minDate,
  maxDate,
  disabled,
  calendarHeaderSelectors,
  annotationText,
  name,
  placeholder,
  required,
  readonly,
  autofocus,
  size,
  labelText,
  labelTooltipText,
  labelDebounce,
  error,
  errors,
  locale,
} = createNgDatePickerProps()

@Component({
  selector: 'YDatePicker',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-date-picker
      [date]="date"
      [isRange]="isRange"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabled]="disabled"
      [calendarHeaderSelectors]="calendarHeaderSelectors"
      [annotationText]="annotationText"
      [name]="name"
      [placeholder]="placeholder"
      [required]="required"
      [readonly]="readonly"
      [size]="size"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [error]="error"
      [errors]="errors"
      [locale]="locale"
      (pick)="handlePickEvent($event)"
    >
    </y-core-date-picker>
  `,
})

export class YDatePicker implements IYNgDatePickerProps {
  @Input() @DefaultValue(date) date: IYNgDatePickerProps['date'] = date
  @Input() @DefaultValue(isRange) isRange: IYNgDatePickerProps['isRange'] = isRange
  @Input() @DefaultValue(minDate) minDate: IYNgDatePickerProps['minDate'] = minDate
  @Input() @DefaultValue(maxDate) maxDate: IYNgDatePickerProps['maxDate'] = maxDate
  @Input() @DefaultValue(disabled) disabled: IYNgDatePickerProps['disabled'] = disabled
  @Input() @DefaultValue(calendarHeaderSelectors) calendarHeaderSelectors: IYNgDatePickerProps['calendarHeaderSelectors'] = calendarHeaderSelectors
  @Input() @DefaultValue(annotationText) annotationText: IYNgDatePickerProps['annotationText'] = annotationText
  @Input() @DefaultValue(name) name: IYNgDatePickerProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IYNgDatePickerProps['placeholder'] = placeholder
  @Input() @DefaultValue(required) required: IYNgDatePickerProps['required'] = required
  @Input() @DefaultValue(readonly) readonly: IYNgDatePickerProps['readonly'] = readonly
  @Input() @DefaultValue(autofocus) autofocus: IYNgDatePickerProps['autofocus'] = autofocus
  @Input() @DefaultValue(size) size: IYNgDatePickerProps['size'] = size
  @Input() @DefaultValue(labelText) labelText: IYNgDatePickerProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgDatePickerProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgDatePickerProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(error) error: IYNgDatePickerProps['error'] = error
  @Input() @DefaultValue(errors) errors: IYNgDatePickerProps['errors'] = errors
  @Input() @DefaultValue(locale) locale: IYNgDatePickerProps['locale'] = locale

  @Output() pick = new EventEmitter<PickEvent['detail']['value']>()

  handlePickEvent(event: Event) {
    const pickEvent = event as PickEvent
    this.pick.emit(pickEvent.detail.value)
  }
}
