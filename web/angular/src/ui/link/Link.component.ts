import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/link'
import { createNgLinkProps, type IYNgLinkProps } from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { href, target, textWrap } = createNgLinkProps()

@Component({
  selector: 'YLink',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-link
      [href]="href"
      [target]="target"
      [textWrap]="textWrap"
    >
      <ng-content></ng-content>
    </y-core-link>
  `,
})
export class YLink implements IYNgLinkProps {
  @Input() @DefaultValue(href) href: IYNgLinkProps['href'] = href
  @Input() @DefaultValue(target) target: IYNgLinkProps['target'] = target
  @Input() @DefaultValue(target) textWrap: IYNgLinkProps['textWrap'] = textWrap
}
