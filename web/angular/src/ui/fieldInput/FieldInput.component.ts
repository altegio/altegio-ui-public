import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/fieldInput'
import {
  createNgFieldInputProps,
  type IAltNgFieldInputProps,
  type AltNgFieldInputInputEvent,
  type AltNgFieldInputFocusEvent,
  type AltNgFieldInputBlurEvent,
  type AltNgFieldInputKeydownEvent,
  type AltNgFieldInputRenderEvent,
} from '~ng/ui/fieldInput/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, readonly, value, name, type, placeholder, required, maxlength, autofocus, hideSpaceLeft, hideSpaceRight, autocomplete } = createNgFieldInputProps()

@Component({
  selector: 'AltFieldInput',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-field-input
      [disabled]="disabled"
      [size]="size"
      [readonly]="readonly"
      [value]="value"
      [name]="name"
      [type]="type"
      [placeholder]="placeholder"
      [required]="required"
      [maxlength]="maxlength"
      [autofocus]="autofocus"
      [hideSpaceLeft]="hideSpaceLeft"
      [hideSpaceRight]="hideSpaceRight"
      [autocomplete]="autocomplete"
      (input)="handleInputEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (keydown)="handleKeydownEvent($event)"
      (render)="handleRenderEvent($event)"
    ></alt-core-field-input>
  `,
})

export class AltFieldInput implements IAltNgFieldInputProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgFieldInputProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgFieldInputProps['size'] = size
  @Input() @DefaultValue(readonly) readonly: IAltNgFieldInputProps['readonly'] = readonly
  @Input() @DefaultValue(value) value: IAltNgFieldInputProps['value'] = value
  @Input() @DefaultValue(name) name: IAltNgFieldInputProps['name'] = name
  @Input() @DefaultValue(type) type: IAltNgFieldInputProps['type'] = type
  @Input() @DefaultValue(placeholder) placeholder: IAltNgFieldInputProps['placeholder'] = placeholder
  @Input() @DefaultValue(required) required: IAltNgFieldInputProps['required'] = required
  @Input() @DefaultValue(maxlength) maxlength: IAltNgFieldInputProps['maxlength'] = maxlength
  @Input() @DefaultValue(autofocus) autofocus: IAltNgFieldInputProps['autofocus'] = autofocus
  @Input() @DefaultValue(hideSpaceLeft) hideSpaceLeft: IAltNgFieldInputProps['hideSpaceLeft'] = hideSpaceLeft
  @Input() @DefaultValue(hideSpaceRight) hideSpaceRight: IAltNgFieldInputProps['hideSpaceRight'] = hideSpaceRight
  @Input() @DefaultValue(autocomplete) autocomplete: IAltNgFieldInputProps['autocomplete'] = autocomplete

  @Output() input = new EventEmitter<AltNgFieldInputInputEvent>()
  handleInputEvent(event: Event) {
    this.input.emit(event as AltNgFieldInputInputEvent)
  }

  @Output() focus = new EventEmitter<AltNgFieldInputFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as AltNgFieldInputFocusEvent)
  }

  @Output() blur = new EventEmitter<AltNgFieldInputBlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as AltNgFieldInputBlurEvent)
  }

  @Output() keydown = new EventEmitter<AltNgFieldInputKeydownEvent>()
  handleKeydownEvent(event: Event) {
    this.keydown.emit(event as AltNgFieldInputKeydownEvent)
  }

  @Output() render = new EventEmitter<AltNgFieldInputRenderEvent>()
  handleRenderEvent(event: Event) {
    this.render.emit(event as AltNgFieldInputRenderEvent)
  }
}
