import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/banner'
import {
  createNgBannerProps,
  type IAltNgBannerProps,
} from '~ng/ui/banner/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const {
  variant,
  layout,
  title,
  description,
  icon,
  hideIcon,
  closable,
  closeLabel,
} = createNgBannerProps()

/**
 * Projected content without a `slot` attribute becomes the message;
 * elements with `slot="actions"` become the action buttons.
 */
@Component({
  selector: 'AltBanner',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-banner
      [variant]="variant"
      [layout]="layout"
      [title]="title"
      [description]="description"
      [icon]="icon"
      [hideIcon]="hideIcon"
      [closable]="closable"
      [closeLabel]="closeLabel"
      (close)="handleClose($event)"
    >
      <ng-content />
    </alt-core-banner>
  `,
})
export class AltBanner implements IAltNgBannerProps {
  @Input() @DefaultValue(variant) variant: IAltNgBannerProps['variant'] = variant
  @Input() @DefaultValue(layout) layout: IAltNgBannerProps['layout'] = layout
  @Input() @DefaultValue(title) title: IAltNgBannerProps['title'] = title
  @Input() @DefaultValue(description) description: IAltNgBannerProps['description'] = description
  @Input() @DefaultValue(icon) icon: IAltNgBannerProps['icon'] = icon
  @Input() @DefaultValue(hideIcon) hideIcon: IAltNgBannerProps['hideIcon'] = hideIcon
  @Input() @DefaultValue(closable) closable: IAltNgBannerProps['closable'] = closable
  @Input() @DefaultValue(closeLabel) closeLabel: IAltNgBannerProps['closeLabel'] = closeLabel

  @Output() close = new EventEmitter<void>()

  handleClose(event: Event) {
    // The output replaces the native event, which would otherwise reach the (close) listener a second time
    event.stopPropagation()
    this.close.emit()
  }
}
