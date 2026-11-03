import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/error'
import { createNgErrorProps, type IAltNgErrorProps } from '~ng/ui/error/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { errors } = createNgErrorProps()

@Component({
  selector: 'AltError',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-error
      [errors]="errors"
    >
    </alt-core-error>
  `,
})
export class AltError implements IAltNgErrorProps {
  @Input() @DefaultValue(errors) errors: IAltNgErrorProps['errors'] = errors
}
