import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/segmentControl'
import { DefaultValue } from '~ng/utils/default-value.decorator'

import type { ClickEvent } from '~ng/ui/segmentControl/models/types'
import {
  createNgSegmentControlProps,
  type IYNgSegmentControlProps,
} from '~ng/ui/segmentControl/models/types'

const { options, size, value, manual } = createNgSegmentControlProps()

@Component({
  selector: 'YSegmentControl',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-segment-control
      (click)="changeActiveSegmentHandler($event)"
      [options]="options"
      [size]="size"
      [manual]="manual"
      [value]="value"
    >
      <ng-content />
    </y-core-segment-control>
  `,
})

export class YSegmentControl implements IYNgSegmentControlProps {
  @Input() @DefaultValue(options) options: IYNgSegmentControlProps['options'] = options
  @Input() @DefaultValue(size) size: IYNgSegmentControlProps['size'] = size
  @Input() @DefaultValue(manual) manual: IYNgSegmentControlProps['manual'] = manual

  @Input() @DefaultValue(value) value: IYNgSegmentControlProps['value'] = value
  @Output() valueChange = new EventEmitter<ClickEvent['detail']['value']>()

  changeActiveSegmentHandler(event: Event) {
    const clickCustomEvent = event as ClickEvent

    this.valueChange.emit(clickCustomEvent.detail.value)
  }
}
