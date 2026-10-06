import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import '~core/ui/buttonGroup'
import {
  createNgButtonGroupProps,
  type IYNgButtonGroupProps,
} from '~ng/ui/buttonGroup/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, variant } = createNgButtonGroupProps()

@Component({
  selector: 'YButtonGroup',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <y-core-button-group
      [size]="size"
      [variant]="variant"
    >
      <ng-content></ng-content>
    </y-core-button-group>
  `,
})
export class YButtonGroup implements IYNgButtonGroupProps {
  @Input() @DefaultValue(size) size: IYNgButtonGroupProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgButtonGroupProps['variant'] = variant
}
