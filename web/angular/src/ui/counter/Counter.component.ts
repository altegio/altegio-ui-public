import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/counter'
import {
  createNgCounterProps,
  type TAltNgCounterProps,
} from '~ng/ui/counter/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, variant, value, disabled, withPlusSign, locator } = createNgCounterProps()

@Component({
  selector: 'AltCounter',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-counter
      [size]="size"
      [value]="value"
      [variant]="variant"
      [disabled]="disabled"
      [withPlusSign]="withPlusSign"
      [locator]="locator"
    ></alt-core-counter>
  `,
})

export class AltCounter implements TAltNgCounterProps {
  @Input() @DefaultValue(locator) locator: TAltNgCounterProps['locator'] = locator
  @Input() @DefaultValue(size) size: TAltNgCounterProps['size'] = size
  @Input() @DefaultValue(value) value: TAltNgCounterProps['value'] = value
  @Input() @DefaultValue(variant) variant: TAltNgCounterProps['variant'] = variant
  @Input() @DefaultValue(disabled) disabled: TAltNgCounterProps['disabled'] = disabled
  @Input() @DefaultValue(withPlusSign) withPlusSign: TAltNgCounterProps['withPlusSign'] = withPlusSign
}

