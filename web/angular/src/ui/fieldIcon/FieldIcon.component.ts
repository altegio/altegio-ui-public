import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/fieldIcon'
import {
  createNgFieldIconProps,
  type IYNgFieldIconProps,
} from '~ng/ui/fieldIcon/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, icon, hoverable, clickable } = createNgFieldIconProps()

@Component({
  selector: 'YFieldIcon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-field-icon
      [disabled]="disabled"
      [size]="size"
      [icon]="icon"
      [hoverable]="hoverable"
      [clickable]="clickable"
    ></y-core-field-icon>
  `,
})

export class YFieldIcon implements Omit<IYNgFieldIconProps, 'readonly'> {
  @Input() @DefaultValue(disabled) disabled: IYNgFieldIconProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgFieldIconProps['size'] = size
  @Input() @DefaultValue(icon) icon: IYNgFieldIconProps['icon'] = icon
  @Input() @DefaultValue(hoverable) hoverable: IYNgFieldIconProps['hoverable'] = hoverable
  @Input() @DefaultValue(clickable) clickable: IYNgFieldIconProps['clickable'] = clickable
}

