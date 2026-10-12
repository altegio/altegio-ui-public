import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/simpleCheckbox'
import { createNgSimpleCheckboxProps, type IYNgSimpleCheckboxProps, type SimpleCheckboxCheckedEvent } from '~ng/ui/simpleCheckbox/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, checked, indeterminate, error, disabled, hovered } = createNgSimpleCheckboxProps()

@Component({
  selector: 'YSimpleCheckbox',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-simple-checkbox
      [size]="size"
      [checked]="checked"
      [indeterminate]="indeterminate"
      [error]="error"
      [disabled]="disabled"
      [hovered]="hovered"
      (checked)="handleCheckedEvent($event)"
    >
    </y-core-simple-checkbox>
  `,
})
export class YSimpleCheckbox implements IYNgSimpleCheckboxProps {
  @Input() @DefaultValue(size) size: IYNgSimpleCheckboxProps['size'] = size
  @Input() @DefaultValue(checked) checked: IYNgSimpleCheckboxProps['checked'] = checked
  @Input() @DefaultValue(indeterminate) indeterminate: IYNgSimpleCheckboxProps['indeterminate'] = indeterminate
  @Input() @DefaultValue(error) error: IYNgSimpleCheckboxProps['error'] = error
  @Input() @DefaultValue(disabled) disabled: IYNgSimpleCheckboxProps['disabled'] = disabled
  @Input() @DefaultValue(hovered) hovered: IYNgSimpleCheckboxProps['hovered'] = hovered

  @Output('checked') checkedEvent = new EventEmitter<SimpleCheckboxCheckedEvent>()
  handleCheckedEvent(event: Event) {
    this.checkedEvent.emit(event as SimpleCheckboxCheckedEvent)
  }
}
