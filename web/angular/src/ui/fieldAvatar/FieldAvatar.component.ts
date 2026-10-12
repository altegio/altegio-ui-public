import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/fieldAvatar'
import {
  createNgFieldAvatarProps,
  type IYNgFieldAvatarProps,
} from '~ng/ui/fieldAvatar/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, photo, initials, icon } = createNgFieldAvatarProps()

@Component({
  selector: 'YFieldAvatar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-field-avatar
      [disabled]="disabled"
      [size]="size"
      [photo]="photo"
      [initials]="initials"
      [icon]="icon"
    ></y-core-field-avatar>
  `,
})

export class YFieldAvatar implements IYNgFieldAvatarProps {
  @Input() @DefaultValue(disabled) disabled: IYNgFieldAvatarProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgFieldAvatarProps['size'] = size
  @Input() @DefaultValue(photo) photo: IYNgFieldAvatarProps['photo'] = photo
  @Input() @DefaultValue(initials) initials: IYNgFieldAvatarProps['initials'] = initials
  @Input() @DefaultValue(icon) icon: IYNgFieldAvatarProps['icon'] = icon
}
