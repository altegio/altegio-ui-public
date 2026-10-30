import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/segmentControl'
import { DefaultValue } from '~ng/utils/default-value.decorator'

import type { ClickEvent } from '~ng/ui/segmentControl/models/types'
import {
  createNgSegmentControlProps,
  type IAltNgSegmentControlProps,
} from '~ng/ui/segmentControl/models/types'

const { options, size, value, manual } = createNgSegmentControlProps()

@Component({
  selector: 'AltSegmentControl',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-segment-control
      (click)="changeActiveSegmentHandler($event)"
      [options]="options"
      [size]="size"
      [manual]="manual"
      [value]="value"
    >
      <ng-content />
    </alt-core-segment-control>
  `,
})

export class AltSegmentControl implements IAltNgSegmentControlProps {
  @Input() @DefaultValue(options) options: IAltNgSegmentControlProps['options'] = options
  @Input() @DefaultValue(size) size: IAltNgSegmentControlProps['size'] = size
  @Input() @DefaultValue(manual) manual: IAltNgSegmentControlProps['manual'] = manual

  @Input() @DefaultValue(value) value: IAltNgSegmentControlProps['value'] = value
  @Output() valueChange = new EventEmitter<ClickEvent['detail']['value']>()

  changeActiveSegmentHandler(event: Event) {
    const clickCustomEvent = event as ClickEvent

    this.valueChange.emit(clickCustomEvent.detail.value)
  }
}
