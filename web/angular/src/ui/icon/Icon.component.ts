import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/icon'
import { createNgIconProps, type IYNgIconProps } from '~ng/ui/icon/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size } = createNgIconProps()

@Component({
  selector: 'YIcon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<y-core-icon [icon]="icon" [size]="size" />',
})
export class YIcon implements IYNgIconProps {
  @Input({ required: true }) icon!: IYNgIconProps['icon']
  @Input() @DefaultValue(size) size: IYNgIconProps['size'] = size
}
