import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import '~core/ui/dateRange'
import type { DateRangeChangeEvent } from '~core/ui/dateRange/models/types'
import {
  createNgDateRangeProps,
  type IAltNgDateRangeProps,
  type TAltNgDateRangeValue,
} from '~ng/ui/dateRange/models/types'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const {
  name,
  placeholder,
  required,
  disabled,
  readonly,
  autofocus,
  error,
  errors,
  size,
  minDate,
  maxDate,
  labelText,
  labelTooltipText,
  labelDebounce,
  annotationText,
  calendarHeaderSelectors,
  locale,
} = createNgDateRangeProps()

const EMPTY_VALUE: TAltNgDateRangeValue = { from: null, to: null }

/**
 * Works with `[(value)]` and with Angular forms (`ngModel`, `formControl`).
 */
@Component({
  selector: 'AltDateRange',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  template: `
    <alt-core-date-range
      [from]="modelValue().from ?? undefined"
      [to]="modelValue().to ?? undefined"
      [name]="name"
      [placeholder]="placeholder"
      [required]="required"
      [disabled]="disabled"
      [attr.readonly]="readonly ? '' : null"
      [autofocus]="autofocus"
      [error]="error"
      [errors]="errors"
      [size]="size"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [annotationText]="annotationText"
      [calendarHeaderSelectors]="calendarHeaderSelectors"
      [locale]="locale"
      (change)="handleChange($event)"
    ></alt-core-date-range>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltDateRange),
      multi: true,
    },
  ],
})
export class AltDateRange extends ControlValueAccessorBase<TAltNgDateRangeValue | null> implements IAltNgDateRangeProps {
  @Input() @DefaultValue(name) name: IAltNgDateRangeProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IAltNgDateRangeProps['placeholder'] = placeholder
  @Input() @DefaultValue(required) required: IAltNgDateRangeProps['required'] = required
  @Input() @DefaultValue(disabled) disabled: IAltNgDateRangeProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IAltNgDateRangeProps['readonly'] = readonly
  @Input() @DefaultValue(autofocus) autofocus: IAltNgDateRangeProps['autofocus'] = autofocus
  @Input() @DefaultValue(error) error: IAltNgDateRangeProps['error'] = error
  @Input() @DefaultValue(errors) errors: IAltNgDateRangeProps['errors'] = errors
  @Input() @DefaultValue(size) size: IAltNgDateRangeProps['size'] = size
  @Input() @DefaultValue(minDate) minDate: IAltNgDateRangeProps['minDate'] = minDate
  @Input() @DefaultValue(maxDate) maxDate: IAltNgDateRangeProps['maxDate'] = maxDate
  @Input() @DefaultValue(labelText) labelText: IAltNgDateRangeProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgDateRangeProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgDateRangeProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(annotationText) annotationText: IAltNgDateRangeProps['annotationText'] = annotationText
  @Input() @DefaultValue(calendarHeaderSelectors) calendarHeaderSelectors: IAltNgDateRangeProps['calendarHeaderSelectors'] = calendarHeaderSelectors
  @Input() @DefaultValue(locale) locale: IAltNgDateRangeProps['locale'] = locale

  modelValue = signal<TAltNgDateRangeValue>(EMPTY_VALUE)

  @Input()
  set value(value: IAltNgDateRangeProps['value']) {
    this.modelValue.set(value ?? EMPTY_VALUE)
  }

  get value(): TAltNgDateRangeValue {
    return this.modelValue()
  }

  @Output() valueChange = new EventEmitter<TAltNgDateRangeValue>()

  writeValue(value: TAltNgDateRangeValue | null) {
    this.modelValue.set(value ?? EMPTY_VALUE)
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }

  handleChange(event: Event) {
    // The output replaces the native event, which would otherwise reach a (change) listener on the host as well
    event.stopPropagation()

    const value = { ...(event as DateRangeChangeEvent).detail }

    this.modelValue.set(value)
    this.valueChange.emit(value)
    this.onChange(value)
    this.onTouched()
  }
}
