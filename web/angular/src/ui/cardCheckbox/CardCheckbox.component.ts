import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/cardCheckbox'
import {
  createNgCardCheckboxProps,
  type IAltNgCardCheckboxProps,
} from '~ng/ui/cardCheckbox/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, checked } = createNgCardCheckboxProps()

@Component({
  selector: 'AltCardCheckbox',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-card-checkbox
      [disabled]="disabled"
      [size]="size"
      [checked]="checked"
    ></alt-core-card-checkbox>
  `,
})

export class AltCardCheckbox implements IAltNgCardCheckboxProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgCardCheckboxProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgCardCheckboxProps['size'] = size
  @Input() @DefaultValue(checked) checked: IAltNgCardCheckboxProps['checked'] = checked
}
