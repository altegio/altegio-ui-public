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
  type IYCoreCountFieldProps,
} from '~core/ui/countField/models/types'
import type { ChangedValueEvent } from '~core/ui/countField/models/types'
import {
  createNgCountFieldProps,
  type IYNgCountFieldProps,
  type TYNgCountFieldModel,
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
  selector: 'YCountField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule],
  template: `
    <y-core-count-field
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
    </y-core-count-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YCountField),
      multi: true,
    },
  ],
})

export class YCountField extends ControlValueAccessorBase<TYNgCountFieldModel> implements IYNgCountFieldProps {
  @Input() @DefaultValue(min) min: IYNgCountFieldProps['min'] = min
  @Input() @DefaultValue(max) max: IYNgCountFieldProps['max'] = max
  @Input() @DefaultValue(disabled) disabled: IYNgCountFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IYNgCountFieldProps['readonly'] = readonly
  @Input() @DefaultValue(error) error: IYNgCountFieldProps['error'] = error
  @Input() @DefaultValue(size) size: IYNgCountFieldProps['size'] = size
  @Input() @DefaultValue(placeholder) placeholder: IYNgCountFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(required) required: IYNgCountFieldProps['required'] = required
  @Input() @DefaultValue(autofocus) autofocus: IYNgCountFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(labelText) labelText: IYNgCountFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgCountFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgCountFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(annotationText) annotationText: IYNgCountFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(errors) errors: IYNgCountFieldProps['errors'] = errors
  @Input() @DefaultValue(name) name: IYNgCountFieldProps['name'] = name

  modelValue = signal<TYNgCountFieldModel>(DEFAULT_NUMBER_VALUE)
  stringModelValue = computed<IYCoreCountFieldProps['value']>(() => {
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
