import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/icon'
import { createNgIconProps, type IAltNgIconProps } from '~ng/ui/icon/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size } = createNgIconProps()

@Component({
  selector: 'AltIcon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<alt-core-icon [icon]="icon" [size]="size" />',
})
export class AltIcon implements IAltNgIconProps {
  @Input({ required: true }) icon!: IAltNgIconProps['icon']
  @Input() @DefaultValue(size) size: IAltNgIconProps['size'] = size
}
