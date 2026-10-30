import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import { DefaultValue } from '~ng/utils/default-value.decorator'
import type { IAltNgChipProps } from '~ng/ui/chip/models/types'
import { createNgChipProps } from '~ng/ui/chip/models/types'
import '~core/ui/chip'

const { labelText, iconLeft, size, active, disabled } = createNgChipProps()

@Component({
  selector: 'AltChip',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <alt-core-chip
      [labelText]="labelText"
      [iconLeft]="iconLeft"
      [size]="size"
      [active]="active"
      [disabled]="disabled"
    ></alt-core-chip>
  `,
})
export class AltChip implements IAltNgChipProps {
  @Input() @DefaultValue(labelText) labelText: IAltNgChipProps['labelText'] = labelText
  @Input() @DefaultValue(iconLeft) iconLeft: IAltNgChipProps['iconLeft'] = iconLeft
  @Input() @DefaultValue(size) size: IAltNgChipProps['size'] = size
  @Input() @DefaultValue(active) active: IAltNgChipProps['active'] = active
  @Input() @DefaultValue(disabled) disabled: IAltNgChipProps['disabled'] = disabled
}
