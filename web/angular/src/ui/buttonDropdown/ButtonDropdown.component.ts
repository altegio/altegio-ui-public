import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils/helpers'

import {
  createNgButtonDropdownProps,
  type IYNgButtonDropdownProps,
  type IYNgButtonDropdownPropsEmits,
  type ItemClickEvent,
  type VisibleEvent,
} from '~ng/ui/buttonDropdown/models/types'

import '~core/ui/buttonDropdown'

const {
  label,
  variant,
  size,
  disabled,
  loading,
  fullWidth,
  isOpen,
  autoClose,
  items,
  iconType,
  alignment,
} = createNgButtonDropdownProps()

@Component({
  selector: 'YButtonDropdown',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <y-core-button-dropdown
      (item-click)="handleItemClick($event)"
      (change-visible)="handleChangeVisible($event)"
      [label]="label"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [fullWidth]="fullWidth"
      [isOpen]="isOpen"
      [autoClose]="autoClose"
      [items]="items"
      [iconType]="iconType"
      [alignment]="alignment"
    >
      <div #activator hidden>
        <ng-content select="[activator]" />
      </div>

      @if (cleanupHTML(activator)) {
        <div
          [innerHTML]="cleanupHTML(activator)"
          slot="activator"
        ></div>
      }

      <div #content hidden>
        <ng-content select="[content]" />
      </div>

      @if (cleanupHTML(content)) {
        <div
          [innerHTML]="cleanupHTML(content)"
          slot="content"
        ></div>
      }
    </y-core-button-dropdown>
  `,
})
export class YButtonDropdown implements IYNgButtonDropdownProps {
  @Input() @DefaultValue(label) label: IYNgButtonDropdownProps['label'] = label
  @Input() @DefaultValue(variant) variant: IYNgButtonDropdownProps['variant'] = variant
  @Input() @DefaultValue(size) size: IYNgButtonDropdownProps['size'] = size
  @Input() @DefaultValue(disabled) disabled: IYNgButtonDropdownProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IYNgButtonDropdownProps['loading'] = loading
  @Input() @DefaultValue(fullWidth) fullWidth: IYNgButtonDropdownProps['fullWidth'] = fullWidth
  @Input() @DefaultValue(isOpen) isOpen: IYNgButtonDropdownProps['isOpen'] = isOpen
  @Input() @DefaultValue(autoClose) autoClose: IYNgButtonDropdownProps['autoClose'] = autoClose
  @Input() @DefaultValue(alignment) alignment: IYNgButtonDropdownProps['alignment'] = alignment
  @Input() @DefaultValue(items) items: IYNgButtonDropdownProps['items'] = items
  @Input() @DefaultValue(iconType) iconType: IYNgButtonDropdownProps['iconType'] = iconType

  @Output('item-click') itemClick = new EventEmitter<IYNgButtonDropdownPropsEmits['item-click']['detail']['item']>()
  @Output('change-visible') changeVisible = new EventEmitter<IYNgButtonDropdownPropsEmits['change-visible']['detail']['value']>()

  protected handleItemClick(event: Event) {
    const itemClickEvent = event as ItemClickEvent
    this.itemClick.emit(itemClickEvent.detail.item)
  }

  protected handleChangeVisible(event: Event) {
    const visibleEvent = event as VisibleEvent
    this.changeVisible.emit(visibleEvent.detail.value)
  }

  protected cleanupHTML = cleanupInnerHTML
}
