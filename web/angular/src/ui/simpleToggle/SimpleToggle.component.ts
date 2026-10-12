import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/simpleToggle'
import { type IYNgSimpleToggleProps, type SimpleToggleCheckedEvent, createNgSimpleToggleProps } from '~ng/ui/simpleToggle/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import type { IYCoreSimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types'

const { checked, disabled, size, hovered } = createNgSimpleToggleProps()

@Component({
  selector: 'YSimpleToggle',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-simple-toggle
      [checked]="checked"
      [disabled]="disabled"
      [size]="size"
      [hovered]="hovered"
      (checked)="handleCheckedEvent($event)"
    >
    </y-core-simple-toggle>
  `,
})

export class YSimpleToggle implements IYNgSimpleToggleProps {
  @Input() @DefaultValue(checked) checked: IYNgSimpleToggleProps['checked'] = checked
  @Input() @DefaultValue(disabled) disabled: IYNgSimpleToggleProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgSimpleToggleProps['size'] = size
  @Input() @DefaultValue(hovered) hovered: IYNgSimpleToggleProps['hovered'] = hovered

  @Output() checkedEvent = new EventEmitter<IYCoreSimpleToggleCheckedEvent['checked']>()
  handleCheckedEvent(event: Event) {
    const checkedEvent = event as SimpleToggleCheckedEvent
    this.checkedEvent.emit(checkedEvent.detail.checked)
  }
}
