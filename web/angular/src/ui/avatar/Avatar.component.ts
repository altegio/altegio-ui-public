import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/avatar'
import {
  createNgAvatarProps,
  type IAltNgAvatarProps,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { photo, initials, icon, size, disabled } = createNgAvatarProps()

@Component({
  selector: 'AltAvatar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-avatar
      [photo]="photo"
      [initials]="initials"
      [disabled]="disabled"
      [size]="size"
      [icon]="icon"
    />
  `,
})

export class AltAvatar implements IAltNgAvatarProps {
  @Input() @DefaultValue(photo) photo: IAltNgAvatarProps['photo'] = photo
  @Input() @DefaultValue(initials) initials: IAltNgAvatarProps['initials'] = initials
  @Input() @DefaultValue(icon) icon: IAltNgAvatarProps['icon'] = icon
  @Input() @DefaultValue(size) size: IAltNgAvatarProps['size'] = size
  @Input() @DefaultValue(disabled) disabled: IAltNgAvatarProps['disabled'] = disabled
}
