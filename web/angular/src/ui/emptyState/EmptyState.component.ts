import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/emptyState'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import {
  createNgEmptyStateProps,
  type IAltNgEmptyStateProps,
} from '~ng/ui/emptyState/models/types'

const {
  size,
  title,
  description,
  icon,
} = createNgEmptyStateProps()

@Component({
  selector: 'AltEmptyState',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-empty-state
      [title]="title"
      [description]="description"
      [icon]="icon"
      [size]="size"
    >
      <div slot="actions">
        <ng-content></ng-content>
      </div>
    </alt-core-empty-state>
  `,
})
export class AltEmptyState implements IAltNgEmptyStateProps {
  @Input() @DefaultValue(title) title: IAltNgEmptyStateProps['title'] = title
  @Input() @DefaultValue(description) description: IAltNgEmptyStateProps['description'] = description
  @Input() @DefaultValue(size) size: IAltNgEmptyStateProps['size'] = size
  @Input() @DefaultValue(icon) icon: IAltNgEmptyStateProps['icon'] = icon
}
