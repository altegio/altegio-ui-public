import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, EventEmitter, Output } from '@angular/core'

import '~core/ui/datePicker'
import {
  createNgDatePickerProps,
  type IAltNgDatePickerProps,
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
  selector: 'AltDatePicker',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-date-picker
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
    </alt-core-date-picker>
  `,
})

export class AltDatePicker implements IAltNgDatePickerProps {
  @Input() @DefaultValue(date) date: IAltNgDatePickerProps['date'] = date
  @Input() @DefaultValue(isRange) isRange: IAltNgDatePickerProps['isRange'] = isRange
  @Input() @DefaultValue(minDate) minDate: IAltNgDatePickerProps['minDate'] = minDate
  @Input() @DefaultValue(maxDate) maxDate: IAltNgDatePickerProps['maxDate'] = maxDate
  @Input() @DefaultValue(disabled) disabled: IAltNgDatePickerProps['disabled'] = disabled
  @Input() @DefaultValue(calendarHeaderSelectors) calendarHeaderSelectors: IAltNgDatePickerProps['calendarHeaderSelectors'] = calendarHeaderSelectors
  @Input() @DefaultValue(annotationText) annotationText: IAltNgDatePickerProps['annotationText'] = annotationText
  @Input() @DefaultValue(name) name: IAltNgDatePickerProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IAltNgDatePickerProps['placeholder'] = placeholder
  @Input() @DefaultValue(required) required: IAltNgDatePickerProps['required'] = required
  @Input() @DefaultValue(readonly) readonly: IAltNgDatePickerProps['readonly'] = readonly
  @Input() @DefaultValue(autofocus) autofocus: IAltNgDatePickerProps['autofocus'] = autofocus
  @Input() @DefaultValue(size) size: IAltNgDatePickerProps['size'] = size
  @Input() @DefaultValue(labelText) labelText: IAltNgDatePickerProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgDatePickerProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgDatePickerProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(error) error: IAltNgDatePickerProps['error'] = error
  @Input() @DefaultValue(errors) errors: IAltNgDatePickerProps['errors'] = errors
  @Input() @DefaultValue(locale) locale: IAltNgDatePickerProps['locale'] = locale

  @Output() pick = new EventEmitter<PickEvent['detail']['value']>()

  handlePickEvent(event: Event) {
    const pickEvent = event as PickEvent
    this.pick.emit(pickEvent.detail.value)
  }
}
