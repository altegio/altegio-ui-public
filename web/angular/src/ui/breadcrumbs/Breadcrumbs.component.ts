import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/breadcrumbs'
import {
  createNgBreadcrumbsProps,
  type IAltNgBreadcrumbsProps,
} from '~ng/ui/breadcrumbs/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { accessibleName } = createNgBreadcrumbsProps()

/**
 * Holds `AltBreadcrumbsItem` elements.
 */
@Component({
  selector: 'AltBreadcrumbs',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  template: `
    <alt-core-breadcrumbs [accessibleName]="accessibleName">
      <ng-content />
    </alt-core-breadcrumbs>
  `,
})
export class AltBreadcrumbs implements IAltNgBreadcrumbsProps {
  @Input() @DefaultValue(accessibleName) accessibleName: IAltNgBreadcrumbsProps['accessibleName'] = accessibleName
}
