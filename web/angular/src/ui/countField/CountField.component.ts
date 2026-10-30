import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  computed,
  signal,
} from '@angular/core'

import {
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'

import '~core/ui/countField'
import {
  DEFAULT_NUMBER_VALUE,
  DEFAULT_STRING_VALUE,
  type IAltCoreCountFieldProps,
} from '~core/ui/countField/models/types'
import type { ChangedValueEvent } from '~core/ui/countField/models/types'
import {
  createNgCountFieldProps,
  type IAltNgCountFieldProps,
  type TAltNgCountFieldModel,
} from '~ng/ui/countField/models/types'

import { DefaultValue } from '~ng/utils/default-value.decorator'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import type { BlurEvent, FocusEvent } from '~ng/ui/textField/models/types'
import type { KeydownEvent } from '~core/ui/fieldInput/models/types'

const {
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
} = createNgCountFieldProps()

@Component({
  selector: 'AltCountField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule],
  template: `
    <alt-core-count-field
      [min]="min"
      [max]="max"
      [disabled]="disabled"
      [error]="error"
      [size]="size"
      [placeholder]="placeholder"
      [required]="required"
      [autofocus]="autofocus"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [annotationText]="annotationText"
      [errors]="errors"
      [name]="name"
      [value]="stringModelValue()"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (keydown)="handleKeydownEvent($event)"
      (changed-value)="handleChangedValueEvent($event)"
    >
    </alt-core-count-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltCountField),
      multi: true,
    },
  ],
})

export class AltCountField extends ControlValueAccessorBase<TAltNgCountFieldModel> implements IAltNgCountFieldProps {
  @Input() @DefaultValue(min) min: IAltNgCountFieldProps['min'] = min
  @Input() @DefaultValue(max) max: IAltNgCountFieldProps['max'] = max
  @Input() @DefaultValue(disabled) disabled: IAltNgCountFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IAltNgCountFieldProps['readonly'] = readonly
  @Input() @DefaultValue(error) error: IAltNgCountFieldProps['error'] = error
  @Input() @DefaultValue(size) size: IAltNgCountFieldProps['size'] = size
  @Input() @DefaultValue(placeholder) placeholder: IAltNgCountFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(required) required: IAltNgCountFieldProps['required'] = required
  @Input() @DefaultValue(autofocus) autofocus: IAltNgCountFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(labelText) labelText: IAltNgCountFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgCountFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgCountFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(annotationText) annotationText: IAltNgCountFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(errors) errors: IAltNgCountFieldProps['errors'] = errors
  @Input() @DefaultValue(name) name: IAltNgCountFieldProps['name'] = name

  modelValue = signal<TAltNgCountFieldModel>(DEFAULT_NUMBER_VALUE)
  stringModelValue = computed<IAltCoreCountFieldProps['value']>(() => {
    const value = this.modelValue()
    if (!value && value !== 0) return DEFAULT_STRING_VALUE
    return String(value)
  })

  writeValue(value: number) {
    this.modelValue.set(value)
  }

  handleChangedValueEvent(event: Event) {
    const changedValueEvent = event as ChangedValueEvent
    const newValue = Number(changedValueEvent.detail.value)

    this.modelValue.set(newValue)

    this.onChange(newValue)
    this.onTouched()
  }

  @Output() focus = new EventEmitter<FocusEvent>()
  handleFocusEvent(event: Event) {
    event.stopPropagation()

    const focusEvent = event as FocusEvent
    this.focus.emit(focusEvent)
  }
  @Output() blur = new EventEmitter<BlurEvent>()
  handleBlurEvent(event: Event) {
    event.stopPropagation()

    const blurEvent = event as BlurEvent
    this.blur.emit(blurEvent)
  }
  @Output() keydown = new EventEmitter<KeydownEvent>()
  handleKeydownEvent(event: Event) {
    event.stopPropagation()

    const keydownEvent = event as KeydownEvent
    this.keydown.emit(keydownEvent)
  }
}
