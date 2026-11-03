import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/linearProgress'
import {
  createNgLinearProgressProps,
  type IAltNgLinearProgressProps,
} from '~ng/ui/linearProgress/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { value, max, indeterminate, size, variant, accessibleName, valueText } = createNgLinearProgressProps()

@Component({
  selector: 'AltLinearProgress',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  template: `
    <alt-core-linear-progress
      [value]="value"
      [max]="max"
      [indeterminate]="indeterminate"
      [size]="size"
      [variant]="variant"
      [accessibleName]="accessibleName"
      [valueText]="valueText"
    ></alt-core-linear-progress>
  `,
})
export class AltLinearProgress implements IAltNgLinearProgressProps {
  @Input() @DefaultValue(value) value: IAltNgLinearProgressProps['value'] = value
  @Input() @DefaultValue(max) max: IAltNgLinearProgressProps['max'] = max
  @Input() @DefaultValue(indeterminate) indeterminate: IAltNgLinearProgressProps['indeterminate'] = indeterminate
  @Input() @DefaultValue(size) size: IAltNgLinearProgressProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgLinearProgressProps['variant'] = variant
  @Input() @DefaultValue(accessibleName) accessibleName: IAltNgLinearProgressProps['accessibleName'] = accessibleName
  @Input() @DefaultValue(valueText) valueText: IAltNgLinearProgressProps['valueText'] = valueText
}
