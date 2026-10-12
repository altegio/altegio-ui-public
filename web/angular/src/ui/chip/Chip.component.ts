import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import { DefaultValue } from '~ng/utils/default-value.decorator'
import type { IYNgChipProps } from '~ng/ui/chip/models/types'
import { createNgChipProps } from '~ng/ui/chip/models/types'
import '~core/ui/chip'

const { labelText, iconLeft, size, active, disabled } = createNgChipProps()

@Component({
  selector: 'YChip',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <y-core-chip
      [labelText]="labelText"
      [iconLeft]="iconLeft"
      [size]="size"
      [active]="active"
      [disabled]="disabled"
    ></y-core-chip>
  `,
})
export class YChip implements IYNgChipProps {
  @Input() @DefaultValue(labelText) labelText: IYNgChipProps['labelText'] = labelText
  @Input() @DefaultValue(iconLeft) iconLeft: IYNgChipProps['iconLeft'] = iconLeft
  @Input() @DefaultValue(size) size: IYNgChipProps['size'] = size
  @Input() @DefaultValue(active) active: IYNgChipProps['active'] = active
  @Input() @DefaultValue(disabled) disabled: IYNgChipProps['disabled'] = disabled
}
