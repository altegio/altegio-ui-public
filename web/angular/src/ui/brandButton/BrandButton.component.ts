import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/brandButton'
import {
  createNgBrandButtonProps,
  type IAltNgBrandButtonProps,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { variant, text, disabled, loading, size } = createNgBrandButtonProps()

@Component({
  selector: 'AltBrandButton',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-brand-button
      [variant]="variant"
      [text]="text"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
    >
    </alt-core-brand-button>
  `,
})

export class AltBrandButton implements IAltNgBrandButtonProps {
  @Input() @DefaultValue(variant) variant: IAltNgBrandButtonProps['variant'] = variant
  @Input() @DefaultValue(text) text: IAltNgBrandButtonProps['text'] = text
  @Input() @DefaultValue(disabled) disabled: IAltNgBrandButtonProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IAltNgBrandButtonProps['loading'] = loading
  @Input() @DefaultValue(size) size: IAltNgBrandButtonProps['size'] = size
}
