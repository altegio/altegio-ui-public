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
  type IYNgCollapseProps,
  type CollapseChangeEvent,
  type CollapseMoveEvent,
} from '~ng/ui/collapse/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { value, type, variant, draggable, allowCrossLevelMove } = createNgCollapseProps()

@Component({
  selector: 'YCollapse',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-collapse
      [value]="value"
      [type]="type"
      [variant]="variant"
      [draggable]="draggable"
      [allowCrossLevelMove]="allowCrossLevelMove"
      (collapse-change)="handleCollapseChangeEvent($event)"
      (collapse-move)="handleCollapseMoveEvent($event)"
    >
      <ng-content />
    </y-core-collapse>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class YCollapse implements IYNgCollapseProps {
  @Input() @DefaultValue(value) value: IYNgCollapseProps['value'] = value
  @Input() @DefaultValue(type) type: IYNgCollapseProps['type'] = type
  @Input() @DefaultValue(variant) variant: IYNgCollapseProps['variant'] = variant
  @Input() @DefaultValue(draggable) draggable: IYNgCollapseProps['draggable'] = draggable
  @Input() @DefaultValue(draggable) allowCrossLevelMove: IYNgCollapseProps['allowCrossLevelMove'] = allowCrossLevelMove

  @Output('collapse-change') collapseChange = new EventEmitter<CollapseChangeEvent>()

  @Output('collapse-move') collapseMove = new EventEmitter<CollapseMoveEvent>()

  handleCollapseMoveEvent(event: Event) {
    this.collapseMove.emit(event as CollapseMoveEvent)
  }

  handleCollapseChangeEvent(event: Event) {
    this.collapseChange.emit(event as CollapseChangeEvent)
  }
}
