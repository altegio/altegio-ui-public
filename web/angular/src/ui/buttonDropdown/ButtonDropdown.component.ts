import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils/helpers'

import {
  createNgButtonDropdownProps,
  type IAltNgButtonDropdownProps,
  type IAltNgButtonDropdownPropsEmits,
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
  selector: 'AltButtonDropdown',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <alt-core-button-dropdown
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
    </alt-core-button-dropdown>
  `,
})
export class AltButtonDropdown implements IAltNgButtonDropdownProps {
  @Input() @DefaultValue(label) label: IAltNgButtonDropdownProps['label'] = label
  @Input() @DefaultValue(variant) variant: IAltNgButtonDropdownProps['variant'] = variant
  @Input() @DefaultValue(size) size: IAltNgButtonDropdownProps['size'] = size
  @Input() @DefaultValue(disabled) disabled: IAltNgButtonDropdownProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IAltNgButtonDropdownProps['loading'] = loading
  @Input() @DefaultValue(fullWidth) fullWidth: IAltNgButtonDropdownProps['fullWidth'] = fullWidth
  @Input() @DefaultValue(isOpen) isOpen: IAltNgButtonDropdownProps['isOpen'] = isOpen
  @Input() @DefaultValue(autoClose) autoClose: IAltNgButtonDropdownProps['autoClose'] = autoClose
  @Input() @DefaultValue(alignment) alignment: IAltNgButtonDropdownProps['alignment'] = alignment
  @Input() @DefaultValue(items) items: IAltNgButtonDropdownProps['items'] = items
  @Input() @DefaultValue(iconType) iconType: IAltNgButtonDropdownProps['iconType'] = iconType

  @Output('item-click') itemClick = new EventEmitter<IAltNgButtonDropdownPropsEmits['item-click']['detail']['item']>()
  @Output('change-visible') changeVisible = new EventEmitter<IAltNgButtonDropdownPropsEmits['change-visible']['detail']['value']>()

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
