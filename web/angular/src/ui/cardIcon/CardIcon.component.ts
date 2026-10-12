import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/cardIcon'
import {
  createNgCardIconProps,
  type IYNgCardIconProps,
} from '~ng/ui/cardIcon/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, icon, variant } = createNgCardIconProps()

@Component({
  selector: 'YCardIcon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-card-icon
      [disabled]="disabled"
      [size]="size"
      [icon]="icon"
      [variant]="variant"
      [disabled]="disabled"
    ></y-core-card-icon>
  `,
})

export class YCardIcon implements IYNgCardIconProps {
  @Input() @DefaultValue(disabled) disabled: IYNgCardIconProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgCardIconProps['size'] = size
  @Input() @DefaultValue(icon) icon: IYNgCardIconProps['icon'] = icon
  @Input() @DefaultValue(variant) variant: IYNgCardIconProps['variant'] = variant
}
