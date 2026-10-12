import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import { DefaultValue } from '~ng/utils/default-value.decorator'

import '~core/ui/loader'

import {
  createNgLoaderProps,
  type IYNgLoaderProps,
} from '~ng/ui/loader/models/types'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreLoaderTagName } from '~web/shared/constants'
import { YCoreLoader } from '~core/ui/loader'

const { size, variant } = createNgLoaderProps()

defineCustomElement(YCoreLoaderTagName, YCoreLoader)

@Component({
  selector: 'YLoader',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-loader
      [size]="size"
      [variant]="variant"
    >
    </y-core-loader>
  `,
})

export class YLoader implements IYNgLoaderProps {
  @Input() @DefaultValue(size) size: IYNgLoaderProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgLoaderProps['variant'] = variant
}
