import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, Input } from '@angular/core'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'

import '~core/ui/simpleRadioButton'
import type { SimpleRadioButtonCheckedEvent, TYNgSimpleRadioButtonModel } from '~ng/ui/simpleRadioButton/models/types'
import { createNgSimpleRadioButtonProps, type IYNgSimpleRadioButtonProps } from '~ng/ui/simpleRadioButton/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { DEFAULT_CHECKED_VALUE } from './models/constants'

const { size, name, error, disabled, hovered } = createNgSimpleRadioButtonProps()

@Component({
  selector: 'YSimpleRadioButton',
  standalone: true,
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YSimpleRadioButton),
      multi: true,
    },
  ],
  template: `
    <y-core-simple-radio-button
      [size]="size"
      [checked]="isChecked"
      [name]="name"
      [error]="error"
      [disabled]="disabled"
      [hovered]="hovered"
      (checked)="handleCheckedEvent($event)"
    >
    </y-core-simple-radio-button>
  `,
})
export class YSimpleRadioButton extends ControlValueAccessorBase<TYNgSimpleRadioButtonModel> implements IYNgSimpleRadioButtonProps {
  @Input() @DefaultValue(size) size: IYNgSimpleRadioButtonProps['size'] = size
  @Input() @DefaultValue(name) name: IYNgSimpleRadioButtonProps['name'] = name
  @Input() @DefaultValue(error) error: IYNgSimpleRadioButtonProps['error'] = error
  @Input() @DefaultValue(disabled) disabled: IYNgSimpleRadioButtonProps['disabled'] = disabled
  @Input() @DefaultValue(hovered) hovered: IYNgSimpleRadioButtonProps['hovered'] = hovered

  isChecked: TYNgSimpleRadioButtonModel = DEFAULT_CHECKED_VALUE

  writeValue(value: TYNgSimpleRadioButtonModel) {
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
