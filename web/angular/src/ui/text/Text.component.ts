import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/text'
import { createNgTextProps, type IYNgTextProps } from '~ng/ui/text/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, variant, ellipsis, lineclamp, locator } = createNgTextProps()

@Component({
  selector: 'YText',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-text
      [size]="size"
      [variant]="variant"
      [ellipsis]="ellipsis"
      [lineclamp]="lineclamp"
      [locator]="locator"
    >
      <ng-content />
    </y-core-text>
  `,
})
export class YText implements IYNgTextProps {
  @Input() @DefaultValue(size) size: IYNgTextProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgTextProps['variant'] = variant
  @Input() @DefaultValue(ellipsis) ellipsis: IYNgTextProps['ellipsis'] = ellipsis
  @Input() @DefaultValue(lineclamp) lineclamp: IYNgTextProps['lineclamp'] = lineclamp
  @Input() @DefaultValue(locator) locator: IYNgTextProps['locator'] = locator
}
