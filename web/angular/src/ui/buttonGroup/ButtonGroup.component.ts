import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import '~core/ui/buttonGroup'
import {
  createNgButtonGroupProps,
  type IAltNgButtonGroupProps,
} from '~ng/ui/buttonGroup/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, variant } = createNgButtonGroupProps()

@Component({
  selector: 'AltButtonGroup',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <alt-core-button-group
      [size]="size"
      [variant]="variant"
    >
      <ng-content></ng-content>
    </alt-core-button-group>
  `,
})
export class AltButtonGroup implements IAltNgButtonGroupProps {
  @Input() @DefaultValue(size) size: IAltNgButtonGroupProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgButtonGroupProps['variant'] = variant
}
