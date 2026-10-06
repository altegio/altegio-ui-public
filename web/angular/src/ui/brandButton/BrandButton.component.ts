import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/brandButton'
import {
  createNgBrandButtonProps,
  type IYNgBrandButtonProps,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { variant, text, disabled, loading, size } = createNgBrandButtonProps()

@Component({
  selector: 'YBrandButton',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-brand-button
      [variant]="variant"
      [text]="text"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
    >
    </y-core-brand-button>
  `,
})

export class YBrandButton implements IYNgBrandButtonProps {
  @Input() @DefaultValue(variant) variant: IYNgBrandButtonProps['variant'] = variant
  @Input() @DefaultValue(text) text: IYNgBrandButtonProps['text'] = text
  @Input() @DefaultValue(disabled) disabled: IYNgBrandButtonProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IYNgBrandButtonProps['loading'] = loading
  @Input() @DefaultValue(size) size: IYNgBrandButtonProps['size'] = size
}
