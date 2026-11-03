import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/list'
import {
  createNgListProps,
  type IAltNgListProps,
} from '~ng/ui/list/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { separator } = createNgListProps()

@Component({
  selector: 'AltList',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  template: `
    <alt-core-list [separator]="separator">
      <ng-content />
    </alt-core-list>
  `,
})
export class AltList implements IAltNgListProps {
  @Input() @DefaultValue(separator) separator: IAltNgListProps['separator'] = separator
}
