import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/cardRadio'
import {
  createNgCardRadioProps,
  type IAltNgCardRadioProps,
} from '~ng/ui/cardRadio/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, checked } = createNgCardRadioProps()

@Component({
  selector: 'AltCardRadio',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-card-radio
      [disabled]="disabled"
      [size]="size"
      [checked]="checked"
    ></alt-core-card-radio>
  `,
})

export class AltCardRadio implements IAltNgCardRadioProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgCardRadioProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgCardRadioProps['size'] = size
  @Input() @DefaultValue(checked) checked: IAltNgCardRadioProps['checked'] = checked
}
