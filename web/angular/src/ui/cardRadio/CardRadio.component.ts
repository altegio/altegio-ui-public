import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/cardRadio'
import {
  createNgCardRadioProps,
  type IYNgCardRadioProps,
} from '~ng/ui/cardRadio/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, checked } = createNgCardRadioProps()

@Component({
  selector: 'YCardRadio',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-card-radio
      [disabled]="disabled"
      [size]="size"
      [checked]="checked"
    ></y-core-card-radio>
  `,
})

export class YCardRadio implements IYNgCardRadioProps {
  @Input() @DefaultValue(disabled) disabled: IYNgCardRadioProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgCardRadioProps['size'] = size
  @Input() @DefaultValue(checked) checked: IYNgCardRadioProps['checked'] = checked
}
