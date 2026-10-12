import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/iconButton'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import {
  createNgIconButtonProps,
  type IYNgIconButtonProps,
} from '~ng/ui/iconButton/models/types'

const { disabled, loading, size, variant, href, target, fullWidth } = createNgIconButtonProps()

@Component({
  selector: 'YIconButton',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <y-core-icon-button
      [icon]="icon"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
      [variant]="variant"
      [href]="href"
      [target]="target"
      [fullWidth]="fullWidth"
    >
    </y-core-icon-button>
  `,
})
export class YIconButton implements IYNgIconButtonProps {
  @Input({ required: true }) icon!: IYNgIconButtonProps['icon']
  @Input() @DefaultValue(disabled) disabled: IYNgIconButtonProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IYNgIconButtonProps['loading'] = loading
  @Input() @DefaultValue(size) size: IYNgIconButtonProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgIconButtonProps['variant'] = variant
  @Input() @DefaultValue(href) href: IYNgIconButtonProps['href'] = href
  @Input() @DefaultValue(target) target: IYNgIconButtonProps['target'] = target
  @Input() @DefaultValue(fullWidth) fullWidth: IYNgIconButtonProps['fullWidth'] = fullWidth
}
