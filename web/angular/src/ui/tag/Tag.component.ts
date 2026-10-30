import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/tag'
import { AltCoreTag } from '~core/ui/tag'
import {
  createNgTagProps,
  type IAltNgTagProps,
} from '~ng/ui/tag/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { AltCoreTagTagName } from '~web/shared/constants'
import { defineCustomElement } from '~web/shared/utils/components'

const { size, variant, iconLeft, disabled, locator, locatorLabel, locatorIcon } = createNgTagProps()

defineCustomElement(AltCoreTagTagName, AltCoreTag)

@Component({
  selector: 'AltTag',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-tag
      [size]="size"
      [variant]="variant"
      [iconLeft]="iconLeft"
      [disabled]="disabled"
      [locator]="locator"
      [locatorLabel]="locatorLabel"
      [locatorIcon]="locatorIcon"
    >
      <ng-content />
    </alt-core-tag>
  `,
})

export class AltTag implements IAltNgTagProps {
  @Input() @DefaultValue(locator) locator: IAltNgTagProps['locator'] = locator
  @Input() @DefaultValue(size) size: IAltNgTagProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgTagProps['variant'] = variant
  @Input() @DefaultValue(iconLeft) iconLeft: IAltNgTagProps['iconLeft'] = iconLeft
  @Input() @DefaultValue(disabled) disabled: IAltNgTagProps['disabled'] = disabled
  @Input() @DefaultValue(locatorLabel) locatorLabel: IAltNgTagProps['locatorLabel'] = locatorLabel
  @Input() @DefaultValue(locatorIcon) locatorIcon: IAltNgTagProps['locatorIcon'] = locatorIcon
}
