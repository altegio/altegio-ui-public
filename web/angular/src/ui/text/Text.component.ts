import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/text'
import { createNgTextProps, type IAltNgTextProps } from '~ng/ui/text/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, variant, ellipsis, lineclamp, locator } = createNgTextProps()

@Component({
  selector: 'AltText',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-text
      [size]="size"
      [variant]="variant"
      [ellipsis]="ellipsis"
      [lineclamp]="lineclamp"
      [locator]="locator"
    >
      <ng-content />
    </alt-core-text>
  `,
})
export class AltText implements IAltNgTextProps {
  @Input() @DefaultValue(size) size: IAltNgTextProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgTextProps['variant'] = variant
  @Input() @DefaultValue(ellipsis) ellipsis: IAltNgTextProps['ellipsis'] = ellipsis
  @Input() @DefaultValue(lineclamp) lineclamp: IAltNgTextProps['lineclamp'] = lineclamp
  @Input() @DefaultValue(locator) locator: IAltNgTextProps['locator'] = locator
}
