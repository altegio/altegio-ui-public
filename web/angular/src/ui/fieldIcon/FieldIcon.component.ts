import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/fieldIcon'
import {
  createNgFieldIconProps,
  type IAltNgFieldIconProps,
} from '~ng/ui/fieldIcon/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, icon, hoverable, clickable } = createNgFieldIconProps()

@Component({
  selector: 'AltFieldIcon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-field-icon
      [disabled]="disabled"
      [size]="size"
      [icon]="icon"
      [hoverable]="hoverable"
      [clickable]="clickable"
    ></alt-core-field-icon>
  `,
})

export class AltFieldIcon implements Omit<IAltNgFieldIconProps, 'readonly'> {
  @Input() @DefaultValue(disabled) disabled: IAltNgFieldIconProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgFieldIconProps['size'] = size
  @Input() @DefaultValue(icon) icon: IAltNgFieldIconProps['icon'] = icon
  @Input() @DefaultValue(hoverable) hoverable: IAltNgFieldIconProps['hoverable'] = hoverable
  @Input() @DefaultValue(clickable) clickable: IAltNgFieldIconProps['clickable'] = clickable
}

