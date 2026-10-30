import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core'

import '~core/ui/fieldTextarea'
import {
  createNgFieldTextareaProps,
  type IAltNgFieldTextareaProps,
  type InputEvent,
  type FocusEvent,
  type BlurEvent,
  type KeydownEvent,
  type RenderEvent,
} from '~ng/ui/fieldTextarea/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const {
  disabled, size, readonly, value, name, placeholder,
  maxlength, autofocus, hideSpaceLeft, hideSpaceRight,
  required, rows, resize, autocomplete,
} = createNgFieldTextareaProps()

@Component({
  selector: 'AltFieldTextarea',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-field-textarea
      [disabled]="disabled"
      [size]="size"
      [readonly]="readonly"
      [value]="value"
      [name]="name"
      [placeholder]="placeholder"
      [maxlength]="maxlength"
      [autofocus]="autofocus"
      [attr.hide-space-left]="hideSpaceLeft"
      [attr.hide-space-right]="hideSpaceRight"
      [required]="required"
      [rows]="rows"
      [resize]="resize"
      [autocomplete]="autocomplete"
      (input)="handleInputEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (keydown)="handleKeydownEvent($event)"
      (render)="handleRenderEvent($event)"
    ></alt-core-field-textarea>
  `,
})

export class AltFieldTextarea implements IAltNgFieldTextareaProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgFieldTextareaProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgFieldTextareaProps['size'] = size
  @Input() @DefaultValue(readonly) readonly: IAltNgFieldTextareaProps['readonly'] = readonly
  @Input() @DefaultValue(value) value: IAltNgFieldTextareaProps['value'] = value
  @Input() @DefaultValue(name) name: IAltNgFieldTextareaProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IAltNgFieldTextareaProps['placeholder'] = placeholder
  @Input() @DefaultValue(maxlength) maxlength: IAltNgFieldTextareaProps['maxlength'] = maxlength
  @Input() @DefaultValue(autofocus) autofocus: IAltNgFieldTextareaProps['autofocus'] = autofocus
  @Input() @DefaultValue(hideSpaceLeft) hideSpaceLeft: IAltNgFieldTextareaProps['hideSpaceLeft'] = hideSpaceLeft
  @Input() @DefaultValue(hideSpaceRight) hideSpaceRight: IAltNgFieldTextareaProps['hideSpaceRight'] = hideSpaceRight
  @Input() @DefaultValue(required) required: IAltNgFieldTextareaProps['required'] = required
  @Input() @DefaultValue(rows) rows: IAltNgFieldTextareaProps['rows'] = rows
  @Input() @DefaultValue(resize) resize: IAltNgFieldTextareaProps['resize'] = resize
  @Input() @DefaultValue(autocomplete) autocomplete: IAltNgFieldTextareaProps['autocomplete'] = autocomplete

  @Output() input = new EventEmitter<InputEvent>()
  handleInputEvent(event: Event) {
    this.input.emit(event as InputEvent)
  }

  @Output() focus = new EventEmitter<FocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as FocusEvent)
  }

  @Output() blur = new EventEmitter<BlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as BlurEvent)
  }

  @Output() keydown = new EventEmitter<KeydownEvent>()
  handleKeydownEvent(event: Event) {
    this.keydown.emit(event as KeydownEvent)
  }

  @Output() render = new EventEmitter<RenderEvent>()
  handleRenderEvent(event: Event) {
    this.render.emit(event as RenderEvent)
  }
}
