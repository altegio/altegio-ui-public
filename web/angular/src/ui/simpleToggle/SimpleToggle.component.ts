import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/simpleToggle'
import { type IAltNgSimpleToggleProps, type SimpleToggleCheckedEvent, createNgSimpleToggleProps } from '~ng/ui/simpleToggle/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import type { IAltCoreSimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types'

const { checked, disabled, size, hovered } = createNgSimpleToggleProps()

@Component({
  selector: 'AltSimpleToggle',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-simple-toggle
      [checked]="checked"
      [disabled]="disabled"
      [size]="size"
      [hovered]="hovered"
      (checked)="handleCheckedEvent($event)"
    >
    </alt-core-simple-toggle>
  `,
})

export class AltSimpleToggle implements IAltNgSimpleToggleProps {
  @Input() @DefaultValue(checked) checked: IAltNgSimpleToggleProps['checked'] = checked
  @Input() @DefaultValue(disabled) disabled: IAltNgSimpleToggleProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgSimpleToggleProps['size'] = size
  @Input() @DefaultValue(hovered) hovered: IAltNgSimpleToggleProps['hovered'] = hovered

  @Output() checkedEvent = new EventEmitter<IAltCoreSimpleToggleCheckedEvent['checked']>()
  handleCheckedEvent(event: Event) {
    const checkedEvent = event as SimpleToggleCheckedEvent
    this.checkedEvent.emit(checkedEvent.detail.checked)
  }
}
