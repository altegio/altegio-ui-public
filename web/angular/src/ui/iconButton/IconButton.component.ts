import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/iconButton'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import {
  createNgIconButtonProps,
  type IAltNgIconButtonProps,
} from '~ng/ui/iconButton/models/types'

const { disabled, loading, size, variant, href, target, fullWidth } = createNgIconButtonProps()

@Component({
  selector: 'AltIconButton',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <alt-core-icon-button
      [icon]="icon"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
      [variant]="variant"
      [href]="href"
      [target]="target"
      [fullWidth]="fullWidth"
    >
    </alt-core-icon-button>
  `,
})
export class AltIconButton implements IAltNgIconButtonProps {
  @Input({ required: true }) icon!: IAltNgIconButtonProps['icon']
  @Input() @DefaultValue(disabled) disabled: IAltNgIconButtonProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IAltNgIconButtonProps['loading'] = loading
  @Input() @DefaultValue(size) size: IAltNgIconButtonProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgIconButtonProps['variant'] = variant
  @Input() @DefaultValue(href) href: IAltNgIconButtonProps['href'] = href
  @Input() @DefaultValue(target) target: IAltNgIconButtonProps['target'] = target
  @Input() @DefaultValue(fullWidth) fullWidth: IAltNgIconButtonProps['fullWidth'] = fullWidth
}
