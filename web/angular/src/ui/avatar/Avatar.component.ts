import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/avatar'
import {
  createNgAvatarProps,
  type IYNgAvatarProps,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { photo, initials, icon, size, disabled } = createNgAvatarProps()

@Component({
  selector: 'YAvatar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-avatar
      [photo]="photo"
      [initials]="initials"
      [disabled]="disabled"
      [size]="size"
      [icon]="icon"
    />
  `,
})

export class YAvatar implements IYNgAvatarProps {
  @Input() @DefaultValue(photo) photo: IYNgAvatarProps['photo'] = photo
  @Input() @DefaultValue(initials) initials: IYNgAvatarProps['initials'] = initials
  @Input() @DefaultValue(icon) icon: IYNgAvatarProps['icon'] = icon
  @Input() @DefaultValue(size) size: IYNgAvatarProps['size'] = size
  @Input() @DefaultValue(disabled) disabled: IYNgAvatarProps['disabled'] = disabled
}
