import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/link'
import { createNgLinkProps, type IAltNgLinkProps } from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { href, target, textWrap } = createNgLinkProps()

@Component({
  selector: 'AltLink',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-link
      [href]="href"
      [target]="target"
      [textWrap]="textWrap"
    >
      <ng-content></ng-content>
    </alt-core-link>
  `,
})
export class AltLink implements IAltNgLinkProps {
  @Input() @DefaultValue(href) href: IAltNgLinkProps['href'] = href
  @Input() @DefaultValue(target) target: IAltNgLinkProps['target'] = target
  @Input() @DefaultValue(target) textWrap: IAltNgLinkProps['textWrap'] = textWrap
}
