import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core'

import '~core/ui/dropdownList'
import {
  createNgDropdownListProps,
  type IAltNgDropdownListProps,
  type AltNgDropdownListItemClickEvent,
} from '~ng/ui/dropdownList/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils/helpers'

const { items, itemLabel, minWidth, noMaxHeight } = createNgDropdownListProps()
@Component({
  selector: 'AltDropdownList',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-dropdown-list
      [items]="items"
      [itemLabel]="itemLabel"
      [minWidth]="minWidth"
      [noMaxHeight]="noMaxHeight"
      (item-click)="handleItemClick($event)"
    >
      <div hidden #top>
        <ng-content select="[dropdown-list-top]" />
      </div>

      @if (cleanupHTML(top)) {
        <div
          slot="top"
          [innerHTML]="cleanupHTML(top)"
        ></div>
      }

      <div hidden #list>
        <ng-content select="[dropdown-list-list]" />
      </div>

      @if (cleanupHTML(list)) {
        <div
          slot="list"
          [innerHTML]="cleanupHTML(list)"
        ></div>
      }

      <div hidden #bottom>
        <ng-content select="[dropdown-list-bottom]" />
      </div>

      @if (cleanupHTML(bottom)) {
        <div
          slot="bottom"
          [innerHTML]="cleanupHTML(bottom)"
        ></div>
      }
    </alt-core-dropdown-list>
  `,
})

export class AltDropdownList implements IAltNgDropdownListProps {
  @Input() @DefaultValue(items) items: IAltNgDropdownListProps['items'] = items
  @Input() @DefaultValue(itemLabel) itemLabel: IAltNgDropdownListProps['itemLabel'] = itemLabel
  @Input() @DefaultValue(minWidth) minWidth: IAltNgDropdownListProps['minWidth'] = minWidth
  @Input() @DefaultValue(noMaxHeight) noMaxHeight: IAltNgDropdownListProps['noMaxHeight'] = noMaxHeight

  @Output('item-click') itemClick = new EventEmitter<AltNgDropdownListItemClickEvent>()

  handleItemClick(event: Event) {
    this.itemClick.emit(event as AltNgDropdownListItemClickEvent)
  }

  protected cleanupHTML = cleanupInnerHTML
}
