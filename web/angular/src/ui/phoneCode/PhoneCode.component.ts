import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/phoneCode'
import {
  createNgPhoneCodeProps,
  type IYNgPhoneCodeProps,
} from '~ng/ui/phoneCode/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { code, disabled, size } = createNgPhoneCodeProps()

@Component({
  selector: 'YPhoneCode',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-phone-code
      [code]="code"
      [disabled]="disabled"
      [size]="size"
    ></y-core-phone-code>
  `,
})

export class YPhoneCode implements IYNgPhoneCodeProps {
  @Input() @DefaultValue(code) code: IYNgPhoneCodeProps['code'] = code
  @Input() @DefaultValue(disabled) disabled: IYNgPhoneCodeProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgPhoneCodeProps['size'] = size
}
