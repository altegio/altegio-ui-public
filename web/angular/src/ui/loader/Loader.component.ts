import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import { DefaultValue } from '~ng/utils/default-value.decorator'

import '~core/ui/loader'

import {
  createNgLoaderProps,
  type IAltNgLoaderProps,
} from '~ng/ui/loader/models/types'
import { defineCustomElement } from '~web/shared/utils/components'
import { AltCoreLoaderTagName } from '~web/shared/constants'
import { AltCoreLoader } from '~core/ui/loader'

const { size, variant } = createNgLoaderProps()

defineCustomElement(AltCoreLoaderTagName, AltCoreLoader)

@Component({
  selector: 'AltLoader',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-loader
      [size]="size"
      [variant]="variant"
    >
    </alt-core-loader>
  `,
})

export class AltLoader implements IAltNgLoaderProps {
  @Input() @DefaultValue(size) size: IAltNgLoaderProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgLoaderProps['variant'] = variant
}
