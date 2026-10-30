import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/simpleCheckbox'
import { createNgSimpleCheckboxProps, type IAltNgSimpleCheckboxProps, type SimpleCheckboxCheckedEvent } from '~ng/ui/simpleCheckbox/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, checked, indeterminate, error, disabled, hovered } = createNgSimpleCheckboxProps()

@Component({
  selector: 'AltSimpleCheckbox',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-simple-checkbox
      [size]="size"
      [checked]="checked"
      [indeterminate]="indeterminate"
      [error]="error"
      [disabled]="disabled"
      [hovered]="hovered"
      (checked)="handleCheckedEvent($event)"
    >
    </alt-core-simple-checkbox>
  `,
})
export class AltSimpleCheckbox implements IAltNgSimpleCheckboxProps {
  @Input() @DefaultValue(size) size: IAltNgSimpleCheckboxProps['size'] = size
  @Input() @DefaultValue(checked) checked: IAltNgSimpleCheckboxProps['checked'] = checked
  @Input() @DefaultValue(indeterminate) indeterminate: IAltNgSimpleCheckboxProps['indeterminate'] = indeterminate
  @Input() @DefaultValue(error) error: IAltNgSimpleCheckboxProps['error'] = error
  @Input() @DefaultValue(disabled) disabled: IAltNgSimpleCheckboxProps['disabled'] = disabled
  @Input() @DefaultValue(hovered) hovered: IAltNgSimpleCheckboxProps['hovered'] = hovered

  @Output('checked') checkedEvent = new EventEmitter<SimpleCheckboxCheckedEvent>()
  handleCheckedEvent(event: Event) {
    this.checkedEvent.emit(event as SimpleCheckboxCheckedEvent)
  }
}
