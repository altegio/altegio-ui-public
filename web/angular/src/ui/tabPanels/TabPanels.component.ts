import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/tabPanels'
import {
  createNgTabPanelsProps,
  type IAltNgTabPanelsProps,
} from '~ng/ui/tabPanels/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { value } = createNgTabPanelsProps()

/**
 * Shows the `AltTabPanel` whose `name` equals `value`.
 * Hidden panels stay rendered, so their content keeps its state.
 */
@Component({
  selector: 'AltTabPanels',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  template: `
    <alt-core-tab-panels [value]="value">
      <ng-content />
    </alt-core-tab-panels>
  `,
})
export class AltTabPanels implements IAltNgTabPanelsProps {
  @Input() @DefaultValue(value) value: IAltNgTabPanelsProps['value'] = value
}
