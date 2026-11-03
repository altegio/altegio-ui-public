import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import '~core/ui/rating'
import type { RatingChangeEvent } from '~core/ui/rating/models/types'
import {
  createNgRatingProps,
  type IAltNgRatingProps,
} from '~ng/ui/rating/models/types'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { max, name, readonly, disabled, required, size, accessibleName } = createNgRatingProps()

/**
 * Works with `[(value)]` and with Angular forms (`ngModel`, `formControl`).
 */
@Component({
  selector: 'AltRating',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: inline-block;' },
  template: `
    <alt-core-rating
      [value]="modelValue()"
      [max]="max"
      [name]="name"
      [attr.readonly]="readonly ? '' : null"
      [disabled]="disabled"
      [required]="required"
      [size]="size"
      [accessibleName]="accessibleName"
      (change)="handleChange($event)"
    ></alt-core-rating>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltRating),
      multi: true,
    },
  ],
})
export class AltRating extends ControlValueAccessorBase<number | null> implements IAltNgRatingProps {
  @Input() @DefaultValue(max) max: IAltNgRatingProps['max'] = max
  @Input() @DefaultValue(name) name: IAltNgRatingProps['name'] = name
  @Input() @DefaultValue(readonly) readonly: IAltNgRatingProps['readonly'] = readonly
  @Input() @DefaultValue(disabled) disabled: IAltNgRatingProps['disabled'] = disabled
  @Input() @DefaultValue(required) required: IAltNgRatingProps['required'] = required
  @Input() @DefaultValue(size) size: IAltNgRatingProps['size'] = size
  @Input() @DefaultValue(accessibleName) accessibleName: IAltNgRatingProps['accessibleName'] = accessibleName

  modelValue = signal(0)

  @Input()
  set value(value: IAltNgRatingProps['value'] | null | undefined) {
    this.modelValue.set(value ?? 0)
  }

  get value(): number {
    return this.modelValue()
  }

  @Output() valueChange = new EventEmitter<number>()

  writeValue(value: number | null) {
    this.modelValue.set(value ?? 0)
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }

  handleChange(event: Event) {
    // The output replaces the native event, which would otherwise reach a (change) listener on the host as well
    event.stopPropagation()

    const { value } = (event as RatingChangeEvent).detail

    this.modelValue.set(value)
    this.valueChange.emit(value)
    this.onChange(value)
    this.onTouched()
  }
}
