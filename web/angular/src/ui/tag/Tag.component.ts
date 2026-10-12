import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/tag'
import { YCoreTag } from '~core/ui/tag'
import {
  createNgTagProps,
  type IYNgTagProps,
} from '~ng/ui/tag/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { YCoreTagTagName } from '~web/shared/constants'
import { defineCustomElement } from '~web/shared/utils/components'

const { size, variant, iconLeft, disabled, locator, locatorLabel, locatorIcon } = createNgTagProps()

defineCustomElement(YCoreTagTagName, YCoreTag)

@Component({
  selector: 'YTag',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-tag
      [size]="size"
      [variant]="variant"
      [iconLeft]="iconLeft"
      [disabled]="disabled"
      [locator]="locator"
      [locatorLabel]="locatorLabel"
      [locatorIcon]="locatorIcon"
    >
      <ng-content />
    </y-core-tag>
  `,
})

export class YTag implements IYNgTagProps {
  @Input() @DefaultValue(locator) locator: IYNgTagProps['locator'] = locator
  @Input() @DefaultValue(size) size: IYNgTagProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgTagProps['variant'] = variant
  @Input() @DefaultValue(iconLeft) iconLeft: IYNgTagProps['iconLeft'] = iconLeft
  @Input() @DefaultValue(disabled) disabled: IYNgTagProps['disabled'] = disabled
  @Input() @DefaultValue(locatorLabel) locatorLabel: IYNgTagProps['locatorLabel'] = locatorLabel
  @Input() @DefaultValue(locatorIcon) locatorIcon: IYNgTagProps['locatorIcon'] = locatorIcon
}
