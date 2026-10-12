import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/fieldInput'
import {
  createNgFieldInputProps,
  type IYNgFieldInputProps,
  type YNgFieldInputInputEvent,
  type YNgFieldInputFocusEvent,
  type YNgFieldInputBlurEvent,
  type YNgFieldInputKeydownEvent,
  type YNgFieldInputRenderEvent,
} from '~ng/ui/fieldInput/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, readonly, value, name, type, placeholder, required, maxlength, autofocus, hideSpaceLeft, hideSpaceRight, autocomplete } = createNgFieldInputProps()

@Component({
  selector: 'YFieldInput',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-field-input
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
    ></y-core-field-input>
  `,
})

export class YFieldInput implements IYNgFieldInputProps {
  @Input() @DefaultValue(disabled) disabled: IYNgFieldInputProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgFieldInputProps['size'] = size
  @Input() @DefaultValue(readonly) readonly: IYNgFieldInputProps['readonly'] = readonly
  @Input() @DefaultValue(value) value: IYNgFieldInputProps['value'] = value
  @Input() @DefaultValue(name) name: IYNgFieldInputProps['name'] = name
  @Input() @DefaultValue(type) type: IYNgFieldInputProps['type'] = type
  @Input() @DefaultValue(placeholder) placeholder: IYNgFieldInputProps['placeholder'] = placeholder
  @Input() @DefaultValue(required) required: IYNgFieldInputProps['required'] = required
  @Input() @DefaultValue(maxlength) maxlength: IYNgFieldInputProps['maxlength'] = maxlength
  @Input() @DefaultValue(autofocus) autofocus: IYNgFieldInputProps['autofocus'] = autofocus
  @Input() @DefaultValue(hideSpaceLeft) hideSpaceLeft: IYNgFieldInputProps['hideSpaceLeft'] = hideSpaceLeft
  @Input() @DefaultValue(hideSpaceRight) hideSpaceRight: IYNgFieldInputProps['hideSpaceRight'] = hideSpaceRight
  @Input() @DefaultValue(autocomplete) autocomplete: IYNgFieldInputProps['autocomplete'] = autocomplete

  @Output() input = new EventEmitter<YNgFieldInputInputEvent>()
  handleInputEvent(event: Event) {
    this.input.emit(event as YNgFieldInputInputEvent)
  }

  @Output() focus = new EventEmitter<YNgFieldInputFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as YNgFieldInputFocusEvent)
  }

  @Output() blur = new EventEmitter<YNgFieldInputBlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as YNgFieldInputBlurEvent)
  }

  @Output() keydown = new EventEmitter<YNgFieldInputKeydownEvent>()
  handleKeydownEvent(event: Event) {
    this.keydown.emit(event as YNgFieldInputKeydownEvent)
  }

  @Output() render = new EventEmitter<YNgFieldInputRenderEvent>()
  handleRenderEvent(event: Event) {
    this.render.emit(event as YNgFieldInputRenderEvent)
  }
}
