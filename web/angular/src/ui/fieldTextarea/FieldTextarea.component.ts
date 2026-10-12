import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core'

import '~core/ui/fieldTextarea'
import {
  createNgFieldTextareaProps,
  type IYNgFieldTextareaProps,
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
  selector: 'YFieldTextarea',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-field-textarea
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
    ></y-core-field-textarea>
  `,
})

export class YFieldTextarea implements IYNgFieldTextareaProps {
  @Input() @DefaultValue(disabled) disabled: IYNgFieldTextareaProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgFieldTextareaProps['size'] = size
  @Input() @DefaultValue(readonly) readonly: IYNgFieldTextareaProps['readonly'] = readonly
  @Input() @DefaultValue(value) value: IYNgFieldTextareaProps['value'] = value
  @Input() @DefaultValue(name) name: IYNgFieldTextareaProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IYNgFieldTextareaProps['placeholder'] = placeholder
  @Input() @DefaultValue(maxlength) maxlength: IYNgFieldTextareaProps['maxlength'] = maxlength
  @Input() @DefaultValue(autofocus) autofocus: IYNgFieldTextareaProps['autofocus'] = autofocus
  @Input() @DefaultValue(hideSpaceLeft) hideSpaceLeft: IYNgFieldTextareaProps['hideSpaceLeft'] = hideSpaceLeft
  @Input() @DefaultValue(hideSpaceRight) hideSpaceRight: IYNgFieldTextareaProps['hideSpaceRight'] = hideSpaceRight
  @Input() @DefaultValue(required) required: IYNgFieldTextareaProps['required'] = required
  @Input() @DefaultValue(rows) rows: IYNgFieldTextareaProps['rows'] = rows
  @Input() @DefaultValue(resize) resize: IYNgFieldTextareaProps['resize'] = resize
  @Input() @DefaultValue(autocomplete) autocomplete: IYNgFieldTextareaProps['autocomplete'] = autocomplete

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
