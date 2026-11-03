import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

import '~core/ui/collapse'
import {
  createNgCollapseProps,
  type IAltNgCollapseProps,
  type CollapseChangeEvent,
  type CollapseMoveEvent,
} from '~ng/ui/collapse/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { value, type, variant, draggable, allowCrossLevelMove } = createNgCollapseProps()

@Component({
  selector: 'AltCollapse',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-collapse
      [value]="value"
      [type]="type"
      [variant]="variant"
      [draggable]="draggable"
      [allowCrossLevelMove]="allowCrossLevelMove"
      (collapse-change)="handleCollapseChangeEvent($event)"
      (collapse-move)="handleCollapseMoveEvent($event)"
    >
      <ng-content />
    </alt-core-collapse>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AltCollapse implements IAltNgCollapseProps {
  @Input() @DefaultValue(value) value: IAltNgCollapseProps['value'] = value
  @Input() @DefaultValue(type) type: IAltNgCollapseProps['type'] = type
  @Input() @DefaultValue(variant) variant: IAltNgCollapseProps['variant'] = variant
  @Input() @DefaultValue(draggable) draggable: IAltNgCollapseProps['draggable'] = draggable
  @Input() @DefaultValue(draggable) allowCrossLevelMove: IAltNgCollapseProps['allowCrossLevelMove'] = allowCrossLevelMove

  @Output('collapse-change') collapseChange = new EventEmitter<CollapseChangeEvent>()

  @Output('collapse-move') collapseMove = new EventEmitter<CollapseMoveEvent>()

  handleCollapseMoveEvent(event: Event) {
    this.collapseMove.emit(event as CollapseMoveEvent)
  }

  handleCollapseChangeEvent(event: Event) {
    this.collapseChange.emit(event as CollapseChangeEvent)
  }
}
