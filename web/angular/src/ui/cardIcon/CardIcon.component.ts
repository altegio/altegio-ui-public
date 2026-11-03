import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/cardIcon'
import {
  createNgCardIconProps,
  type IAltNgCardIconProps,
} from '~ng/ui/cardIcon/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, icon, variant } = createNgCardIconProps()

@Component({
  selector: 'AltCardIcon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-card-icon
      [disabled]="disabled"
      [size]="size"
      [icon]="icon"
      [variant]="variant"
      [disabled]="disabled"
    ></alt-core-card-icon>
  `,
})

export class AltCardIcon implements IAltNgCardIconProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgCardIconProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgCardIconProps['size'] = size
  @Input() @DefaultValue(icon) icon: IAltNgCardIconProps['icon'] = icon
  @Input() @DefaultValue(variant) variant: IAltNgCardIconProps['variant'] = variant
}
