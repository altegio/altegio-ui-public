import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/button'

import {
  createNgButtonProps,
  type IYNgButtonProps,
} from '~ng/ui/button/models/types'

import { DefaultValue } from '~ng/utils/default-value.decorator'
import { YCoreButton } from '~core/ui/button'
import { YCoreButtonTagName } from '~web/shared/constants'
import { defineCustomElement } from '~web/shared/utils/components'

const { disabled, href, iconLeft, iconRight, label, loading, size, target, alignment, variant, fullWidth } = createNgButtonProps()

defineCustomElement(YCoreButtonTagName, YCoreButton)

@Component({
  selector: 'YButton',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <y-core-button
      [label]="label"
      [href]="href"
      [target]="target"
      [size]="size"
      [variant]="variant"
      [disabled]="disabled"
      [loading]="loading"
      [alignment]="alignment"
      [attr.full-width]="fullWidth"
      [iconLeft]="iconLeft"
      [iconRight]="iconRight"
    >
    </y-core-button>
  `,
})
export class YButton implements IYNgButtonProps {
  @Input() @DefaultValue(label) label: IYNgButtonProps['label'] = label
  @Input() @DefaultValue(href) href: IYNgButtonProps['href'] = href
  @Input() @DefaultValue(target) target: IYNgButtonProps['target'] = target
  @Input() @DefaultValue(size) size: IYNgButtonProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgButtonProps['variant'] = variant
  @Input() @DefaultValue(disabled) disabled: IYNgButtonProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IYNgButtonProps['loading'] = loading
  @Input() @DefaultValue(fullWidth) fullWidth: IYNgButtonProps['fullWidth'] = fullWidth
  @Input() @DefaultValue(alignment) alignment: IYNgButtonProps['alignment'] = alignment
  @Input() @DefaultValue(iconLeft) iconLeft: IYNgButtonProps['iconLeft'] = iconLeft
  @Input() @DefaultValue(iconRight) iconRight: IYNgButtonProps['iconRight'] = iconRight
}
