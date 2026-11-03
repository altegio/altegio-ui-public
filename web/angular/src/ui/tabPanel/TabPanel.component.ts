import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/tabPanel'
import {
  createNgTabPanelProps,
  type IAltNgTabPanelProps,
} from '~ng/ui/tabPanel/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { name, label, labelledby } = createNgTabPanelProps()

@Component({
  selector: 'AltTabPanel',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: contents;' },
  template: `
    <alt-core-tab-panel
      [name]="name"
      [label]="label"
      [labelledby]="labelledby"
    >
      <ng-content />
    </alt-core-tab-panel>
  `,
})
export class AltTabPanel implements IAltNgTabPanelProps {
  @Input() @DefaultValue(name) name: IAltNgTabPanelProps['name'] = name
  @Input() @DefaultValue(label) label: IAltNgTabPanelProps['label'] = label
  @Input() @DefaultValue(labelledby) labelledby: IAltNgTabPanelProps['labelledby'] = labelledby
}
