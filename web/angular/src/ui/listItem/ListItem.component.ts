import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/listItem'
import {
  createNgListItemProps,
  type IAltNgListItemProps,
} from '~ng/ui/listItem/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const {
  label,
  caption,
  clickable,
  href,
  target,
  disabled,
  active,
  align,
} = createNgListItemProps()

/**
 * Projected content without a `slot` attribute replaces the label;
 * elements with `slot="start"`, `slot="caption"` or `slot="end"` fill those sections.
 * Listen to the native `(click)`: it does not fire while the item is disabled.
 */
@Component({
  selector: 'AltListItem',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  template: `
    <alt-core-list-item
      [label]="label"
      [caption]="caption"
      [clickable]="clickable"
      [href]="href"
      [target]="target"
      [disabled]="disabled"
      [active]="active"
      [align]="align"
    >
      <ng-content />
    </alt-core-list-item>
  `,
})
export class AltListItem implements IAltNgListItemProps {
  @Input() @DefaultValue(label) label: IAltNgListItemProps['label'] = label
  @Input() @DefaultValue(caption) caption: IAltNgListItemProps['caption'] = caption
  @Input() @DefaultValue(clickable) clickable: IAltNgListItemProps['clickable'] = clickable
  @Input() @DefaultValue(href) href: IAltNgListItemProps['href'] = href
  @Input() @DefaultValue(target) target: IAltNgListItemProps['target'] = target
  @Input() @DefaultValue(disabled) disabled: IAltNgListItemProps['disabled'] = disabled
  @Input() @DefaultValue(active) active: IAltNgListItemProps['active'] = active
  @Input() @DefaultValue(align) align: IAltNgListItemProps['align'] = align
}
