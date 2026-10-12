import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core'

import '~core/ui/dropdownList'
import {
  createNgDropdownListProps,
  type IYNgDropdownListProps,
  type YNgDropdownListItemClickEvent,
} from '~ng/ui/dropdownList/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils/helpers'

const { items, itemLabel, minWidth, noMaxHeight } = createNgDropdownListProps()
@Component({
  selector: 'YDropdownList',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-dropdown-list
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
    </y-core-dropdown-list>
  `,
})

export class YDropdownList implements IYNgDropdownListProps {
  @Input() @DefaultValue(items) items: IYNgDropdownListProps['items'] = items
  @Input() @DefaultValue(itemLabel) itemLabel: IYNgDropdownListProps['itemLabel'] = itemLabel
  @Input() @DefaultValue(minWidth) minWidth: IYNgDropdownListProps['minWidth'] = minWidth
  @Input() @DefaultValue(noMaxHeight) noMaxHeight: IYNgDropdownListProps['noMaxHeight'] = noMaxHeight

  @Output('item-click') itemClick = new EventEmitter<YNgDropdownListItemClickEvent>()

  handleItemClick(event: Event) {
    this.itemClick.emit(event as YNgDropdownListItemClickEvent)
  }

  protected cleanupHTML = cleanupInnerHTML
}
