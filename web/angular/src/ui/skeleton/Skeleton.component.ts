import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/skeleton'
import {
  createNgSkeletonProps,
  type IAltNgSkeletonProps,
} from '~ng/ui/skeleton/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, shape, width, height } = createNgSkeletonProps()

@Component({
  selector: 'AltSkeleton',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // A block host lets a class on <AltSkeleton> set the width; the height comes from size or height
  host: { style: 'display: block;' },
  template: `
    <alt-core-skeleton
      [size]="size"
      [shape]="shape"
      [width]="width"
      [height]="height"
    ></alt-core-skeleton>
  `,
})
export class AltSkeleton implements IAltNgSkeletonProps {
  @Input() @DefaultValue(size) size: IAltNgSkeletonProps['size'] = size
  @Input() @DefaultValue(shape) shape: IAltNgSkeletonProps['shape'] = shape
  @Input() @DefaultValue(width) width: IAltNgSkeletonProps['width'] = width
  @Input() @DefaultValue(height) height: IAltNgSkeletonProps['height'] = height
}
