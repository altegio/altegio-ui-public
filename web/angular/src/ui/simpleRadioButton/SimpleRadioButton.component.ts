import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, Input } from '@angular/core'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'

import '~core/ui/simpleRadioButton'
import type { SimpleRadioButtonCheckedEvent, TAltNgSimpleRadioButtonModel } from '~ng/ui/simpleRadioButton/models/types'
import { createNgSimpleRadioButtonProps, type IAltNgSimpleRadioButtonProps } from '~ng/ui/simpleRadioButton/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { DEFAULT_CHECKED_VALUE } from './models/constants'

const { size, name, error, disabled, hovered } = createNgSimpleRadioButtonProps()

@Component({
  selector: 'AltSimpleRadioButton',
  standalone: true,
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltSimpleRadioButton),
      multi: true,
    },
  ],
  template: `
    <alt-core-simple-radio-button
      [size]="size"
      [checked]="isChecked"
      [name]="name"
      [error]="error"
      [disabled]="disabled"
      [hovered]="hovered"
      (checked)="handleCheckedEvent($event)"
    >
    </alt-core-simple-radio-button>
  `,
})
export class AltSimpleRadioButton extends ControlValueAccessorBase<TAltNgSimpleRadioButtonModel> implements IAltNgSimpleRadioButtonProps {
  @Input() @DefaultValue(size) size: IAltNgSimpleRadioButtonProps['size'] = size
  @Input() @DefaultValue(name) name: IAltNgSimpleRadioButtonProps['name'] = name
  @Input() @DefaultValue(error) error: IAltNgSimpleRadioButtonProps['error'] = error
  @Input() @DefaultValue(disabled) disabled: IAltNgSimpleRadioButtonProps['disabled'] = disabled
  @Input() @DefaultValue(hovered) hovered: IAltNgSimpleRadioButtonProps['hovered'] = hovered

  isChecked: TAltNgSimpleRadioButtonModel = DEFAULT_CHECKED_VALUE

  writeValue(value: TAltNgSimpleRadioButtonModel) {
    this.isChecked = value
  }

  handleCheckedEvent(event: Event) {
    event.stopPropagation()

    const { checked } = (event as SimpleRadioButtonCheckedEvent).detail

    this.isChecked = checked

    this.onChange(checked)
    this.onTouched()
  }
}
