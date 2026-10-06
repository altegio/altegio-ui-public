import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/cardCheckbox'
import {
  createNgCardCheckboxProps,
  type IYNgCardCheckboxProps,
} from '~ng/ui/cardCheckbox/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, checked } = createNgCardCheckboxProps()

@Component({
  selector: 'YCardCheckbox',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-card-checkbox
      [disabled]="disabled"
      [size]="size"
      [checked]="checked"
    ></y-core-card-checkbox>
  `,
})

export class YCardCheckbox implements IYNgCardCheckboxProps {
  @Input() @DefaultValue(disabled) disabled: IYNgCardCheckboxProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgCardCheckboxProps['size'] = size
  @Input() @DefaultValue(checked) checked: IYNgCardCheckboxProps['checked'] = checked
}
