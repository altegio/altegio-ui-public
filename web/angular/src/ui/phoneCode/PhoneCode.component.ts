import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/phoneCode'
import {
  createNgPhoneCodeProps,
  type IAltNgPhoneCodeProps,
} from '~ng/ui/phoneCode/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { code, disabled, size } = createNgPhoneCodeProps()

@Component({
  selector: 'AltPhoneCode',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-phone-code
      [code]="code"
      [disabled]="disabled"
      [size]="size"
    ></alt-core-phone-code>
  `,
})

export class AltPhoneCode implements IAltNgPhoneCodeProps {
  @Input() @DefaultValue(code) code: IAltNgPhoneCodeProps['code'] = code
  @Input() @DefaultValue(disabled) disabled: IAltNgPhoneCodeProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgPhoneCodeProps['size'] = size
}
