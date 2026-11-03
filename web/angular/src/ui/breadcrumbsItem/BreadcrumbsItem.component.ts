import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/breadcrumbsItem'
import {
  createNgBreadcrumbsItemProps,
  type IAltNgBreadcrumbsItemProps,
} from '~ng/ui/breadcrumbsItem/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { href, target, current } = createNgBreadcrumbsItemProps()

/**
 * One page of `AltBreadcrumbs`. With the Angular router, handle `(click)` on it: call
 * `$event.preventDefault()` and `router.navigateByUrl()`.
 */
@Component({
  selector: 'AltBreadcrumbsItem',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: contents;' },
  template: `
    <alt-core-breadcrumbs-item [href]="href" [target]="target" [current]="current">
      <ng-content />
    </alt-core-breadcrumbs-item>
  `,
})
export class AltBreadcrumbsItem implements IAltNgBreadcrumbsItemProps {
  @Input() @DefaultValue(href) href: IAltNgBreadcrumbsItemProps['href'] = href
  @Input() @DefaultValue(target) target: IAltNgBreadcrumbsItemProps['target'] = target
  @Input() @DefaultValue(current) current: IAltNgBreadcrumbsItemProps['current'] = current
}
