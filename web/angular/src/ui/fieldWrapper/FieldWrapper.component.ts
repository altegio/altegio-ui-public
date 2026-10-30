import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core'

import '~core/ui/fieldWrapper'
import {
  createNgFieldWrapperProps,
  type IAltNgFieldWrapperProps,
  type ClickOutsideEvent,
  type FocusEvent,
  type BlurEvent,
  type MouseEnterEvent,
  type MouseLeaveEvent,
} from '~ng/ui/fieldWrapper/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, readonly, error, size, clickable } = createNgFieldWrapperProps()

@Component({
  selector: 'AltFieldWrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-field-wrapper
      [disabled]="disabled"
      [readonly]="readonly"
      [error]="error"
      [size]="size"
      [clickable]="clickable"
      (click-outside)="handleClickOutsideEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (mouse-enter)="handleMouseEnterEvent($event)"
      (mouse-leave)="handleMouseLeaveEvent($event)"
    >
      <ng-content />
    </alt-core-field-wrapper>
  `,
})

export class AltFieldWrapper implements IAltNgFieldWrapperProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgFieldWrapperProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IAltNgFieldWrapperProps['readonly'] = readonly
  @Input() @DefaultValue(error) error: IAltNgFieldWrapperProps['error'] = error
  @Input() @DefaultValue(size) size: IAltNgFieldWrapperProps['size'] = size
  @Input() @DefaultValue(clickable) clickable: IAltNgFieldWrapperProps['clickable'] = clickable

  @Output('click-outside') clickOutside = new EventEmitter<ClickOutsideEvent>()
  handleClickOutsideEvent(event: Event) {
    this.clickOutside.emit(event as ClickOutsideEvent)
  }

  @Output() focus = new EventEmitter<FocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as FocusEvent)
  }

  @Output() blur = new EventEmitter<BlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as BlurEvent)
  }

  @Output('mouse-enter') mouseEnter = new EventEmitter<MouseEnterEvent>()
  handleMouseEnterEvent(event: Event) {
    this.mouseEnter.emit(event as MouseEnterEvent)
  }

  @Output('mouse-leave') mouseLeave = new EventEmitter<MouseLeaveEvent>()
  handleMouseLeaveEvent(event: Event) {
    this.mouseLeave.emit(event as MouseLeaveEvent)
  }
}
