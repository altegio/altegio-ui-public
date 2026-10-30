import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/button'

import {
  createNgButtonProps,
  type IAltNgButtonProps,
} from '~ng/ui/button/models/types'

import { DefaultValue } from '~ng/utils/default-value.decorator'
import { AltCoreButton } from '~core/ui/button'
import { AltCoreButtonTagName } from '~web/shared/constants'
import { defineCustomElement } from '~web/shared/utils/components'

const { disabled, href, iconLeft, iconRight, label, loading, size, target, alignment, variant, fullWidth } = createNgButtonProps()

defineCustomElement(AltCoreButtonTagName, AltCoreButton)

@Component({
  selector: 'AltButton',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <alt-core-button
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
    </alt-core-button>
  `,
})
export class AltButton implements IAltNgButtonProps {
  @Input() @DefaultValue(label) label: IAltNgButtonProps['label'] = label
  @Input() @DefaultValue(href) href: IAltNgButtonProps['href'] = href
  @Input() @DefaultValue(target) target: IAltNgButtonProps['target'] = target
  @Input() @DefaultValue(size) size: IAltNgButtonProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgButtonProps['variant'] = variant
  @Input() @DefaultValue(disabled) disabled: IAltNgButtonProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IAltNgButtonProps['loading'] = loading
  @Input() @DefaultValue(fullWidth) fullWidth: IAltNgButtonProps['fullWidth'] = fullWidth
  @Input() @DefaultValue(alignment) alignment: IAltNgButtonProps['alignment'] = alignment
  @Input() @DefaultValue(iconLeft) iconLeft: IAltNgButtonProps['iconLeft'] = iconLeft
  @Input() @DefaultValue(iconRight) iconRight: IAltNgButtonProps['iconRight'] = iconRight
}
