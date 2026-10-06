import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/counter'
import {
  createNgCounterProps,
  type TYNgCounterProps,
} from '~ng/ui/counter/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, variant, value, disabled, withPlusSign, locator } = createNgCounterProps()

@Component({
  selector: 'YCounter',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-counter
      [size]="size"
      [value]="value"
      [variant]="variant"
      [disabled]="disabled"
      [withPlusSign]="withPlusSign"
      [locator]="locator"
    ></y-core-counter>
  `,
})

export class YCounter implements TYNgCounterProps {
  @Input() @DefaultValue(locator) locator: TYNgCounterProps['locator'] = locator
  @Input() @DefaultValue(size) size: TYNgCounterProps['size'] = size
  @Input() @DefaultValue(value) value: TYNgCounterProps['value'] = value
  @Input() @DefaultValue(variant) variant: TYNgCounterProps['variant'] = variant
  @Input() @DefaultValue(disabled) disabled: TYNgCounterProps['disabled'] = disabled
  @Input() @DefaultValue(withPlusSign) withPlusSign: TYNgCounterProps['withPlusSign'] = withPlusSign
}

