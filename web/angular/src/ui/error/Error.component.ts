import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/error'
import { createNgErrorProps, type IYNgErrorProps } from '~ng/ui/error/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { errors } = createNgErrorProps()

@Component({
  selector: 'YError',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-error
      [errors]="errors"
    >
    </y-core-error>
  `,
})
export class YError implements IYNgErrorProps {
  @Input() @DefaultValue(errors) errors: IYNgErrorProps['errors'] = errors
}
