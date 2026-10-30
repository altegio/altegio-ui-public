import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/fieldAvatar'
import {
  createNgFieldAvatarProps,
  type IAltNgFieldAvatarProps,
} from '~ng/ui/fieldAvatar/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, size, photo, initials, icon } = createNgFieldAvatarProps()

@Component({
  selector: 'AltFieldAvatar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-field-avatar
      [disabled]="disabled"
      [size]="size"
      [photo]="photo"
      [initials]="initials"
      [icon]="icon"
    ></alt-core-field-avatar>
  `,
})

export class AltFieldAvatar implements IAltNgFieldAvatarProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgFieldAvatarProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IAltNgFieldAvatarProps['size'] = size
  @Input() @DefaultValue(photo) photo: IAltNgFieldAvatarProps['photo'] = photo
  @Input() @DefaultValue(initials) initials: IAltNgFieldAvatarProps['initials'] = initials
  @Input() @DefaultValue(icon) icon: IAltNgFieldAvatarProps['icon'] = icon
}
