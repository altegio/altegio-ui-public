import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/emptyState'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import {
  createNgEmptyStateProps,
  type IYNgEmptyStateProps,
} from '~ng/ui/emptyState/models/types'

const {
  size,
  title,
  description,
  icon,
} = createNgEmptyStateProps()

@Component({
  selector: 'YEmptyState',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-empty-state
      [title]="title"
      [description]="description"
      [icon]="icon"
      [size]="size"
    >
      <div slot="actions">
        <ng-content></ng-content>
      </div>
    </y-core-empty-state>
  `,
})
export class YEmptyState implements IYNgEmptyStateProps {
  @Input() @DefaultValue(title) title: IYNgEmptyStateProps['title'] = title
  @Input() @DefaultValue(description) description: IYNgEmptyStateProps['description'] = description
  @Input() @DefaultValue(size) size: IYNgEmptyStateProps['size'] = size
  @Input() @DefaultValue(icon) icon: IYNgEmptyStateProps['icon'] = icon
}
