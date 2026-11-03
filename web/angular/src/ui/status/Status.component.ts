import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/status'
import {
  createNgStatusProps,
  type IAltNgStatusProps,
} from '~ng/ui/status/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { variant, text, size, icon } = createNgStatusProps()

/**
 * Projected content goes under the text.
 */
@Component({
  selector: 'AltStatus',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  template: `
    <alt-core-status
      [variant]="variant"
      [text]="text"
      [size]="size"
      [icon]="icon"
    >
      <ng-content></ng-content>
    </alt-core-status>
  `,
})
export class AltStatus implements IAltNgStatusProps {
  @Input() @DefaultValue(variant) variant: IAltNgStatusProps['variant'] = variant
  @Input() @DefaultValue(text) text: IAltNgStatusProps['text'] = text
  @Input() @DefaultValue(size) size: IAltNgStatusProps['size'] = size
  @Input() @DefaultValue(icon) icon: IAltNgStatusProps['icon'] = icon
}
