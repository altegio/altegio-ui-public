import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/multipleSelectField'
import {
  createNgMultipleSelectFieldProps,
  type IYNgMultipleSelectFieldProps,
  type YNgMultipleSelectFieldFocusEvent,
  type YNgMultipleSelectFieldInputEvent,
  type YNgMultipleSelectFieldSelectEvent,
} from '~ng/ui/multipleSelectField/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { value, name, placeholder, autofocus, disabled, readonly, error, errors, size, required, labelText, labelTooltipText, annotationText, labelDebounce, isMapOptions, items, itemLabel, itemValue, isCustomFilter, isFilterable, filterValue, filterCallback } = createNgMultipleSelectFieldProps()

@Component({
  selector: 'YMultipleSelectField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-multiple-select-field
      [value]="value"
      [name]="name"
      [placeholder]="placeholder"
      [autofocus]="autofocus"
      [disabled]="disabled"
      [readonly]="readonly"
      [required]="required"
      [errors]="errors"
      [error]="error"
      [size]="size"
      [labelDebounce]="labelDebounce"
      [isMapOptions]="isMapOptions"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [annotationText]="annotationText"
      [items]="items"
      [itemLabel]="itemLabel"
      [itemValue]="itemValue"
      [isCustomFilter]="isCustomFilter"
      [isFilterable]="isFilterable"
      [filterValue]="filterValue"
      [filterCallback]="filterCallback"
      (input)="handleInputEvent($event)"
      (focus)="handleFocusEvent($event)"
      (select)="handleSelectEvent($event)"
    >
      <div hidden #annotation>
        <ng-content select="[annotation]" />
      </div>

      @if (cleanupHTML(annotation)) {
        <div
          slot="annotation"
          [innerHTML]="cleanupHTML(annotation)"
        ></div>
      }

      <div hidden #dropdownListTop>
        <ng-content select="[dropdown-list-top]" />
      </div>

      @if (cleanupHTML(dropdownListTop)) {
        <div
          slot="dropdown-list-top"
          [innerHTML]="cleanupHTML(dropdownListTop)"
        ></div>
      }

      <div hidden #list>
        <ng-content select="[list]" />
      </div>

      @if (cleanupHTML(list)) {
        <div
          slot="list"
          [innerHTML]="cleanupHTML(list)"
        ></div>
      }

      <div hidden #dropdownListBottom>
        <ng-content select="[dropdown-list-bottom]" />
      </div>

      @if (cleanupHTML(dropdownListBottom)) {
        <div
          slot="dropdown-list-bottom"
          [innerHTML]="cleanupHTML(dropdownListBottom)"
        ></div>
      }
    </y-core-multiple-select-field>
  `,
})

export class YMultipleSelectField implements IYNgMultipleSelectFieldProps {
  @Input() @DefaultValue(value) value: IYNgMultipleSelectFieldProps['value'] = value
  @Input() @DefaultValue(name) name: IYNgMultipleSelectFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IYNgMultipleSelectFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IYNgMultipleSelectFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IYNgMultipleSelectFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IYNgMultipleSelectFieldProps['readonly'] = readonly
  @Input() @DefaultValue(required) required: IYNgMultipleSelectFieldProps['required'] = required
  @Input() @DefaultValue(errors) errors: IYNgMultipleSelectFieldProps['errors'] = errors
  @Input() @DefaultValue(error) error: IYNgMultipleSelectFieldProps['error'] = error
  @Input() @DefaultValue(size) size: IYNgMultipleSelectFieldProps['size'] = size
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgMultipleSelectFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(isMapOptions) isMapOptions: IYNgMultipleSelectFieldProps['isMapOptions'] = isMapOptions
  @Input() @DefaultValue(labelText) labelText: IYNgMultipleSelectFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgMultipleSelectFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(annotationText) annotationText: IYNgMultipleSelectFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(items) items: IYNgMultipleSelectFieldProps['items'] = items
  @Input() @DefaultValue(itemLabel) itemLabel: IYNgMultipleSelectFieldProps['itemLabel'] = itemLabel
  @Input() @DefaultValue(itemValue) itemValue: IYNgMultipleSelectFieldProps['itemValue'] = itemValue
  @Input() @DefaultValue(isCustomFilter) isCustomFilter: IYNgMultipleSelectFieldProps['isCustomFilter'] = isCustomFilter
  @Input() @DefaultValue(isFilterable) isFilterable: IYNgMultipleSelectFieldProps['isFilterable'] = isFilterable
  @Input() @DefaultValue(filterValue) filterValue: IYNgMultipleSelectFieldProps['filterValue'] = filterValue
  @Input() @DefaultValue(filterCallback) filterCallback: IYNgMultipleSelectFieldProps['filterCallback'] = filterCallback

  @Output() focus = new EventEmitter<YNgMultipleSelectFieldFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as YNgMultipleSelectFieldFocusEvent)
  }

  @Output() select = new EventEmitter<YNgMultipleSelectFieldSelectEvent>()
  handleSelectEvent(event: Event) {
    this.select.emit(event as YNgMultipleSelectFieldSelectEvent)
  }

  @Output() input = new EventEmitter<YNgMultipleSelectFieldInputEvent>()
  handleInputEvent(event: Event) {
    this.input.emit(event as YNgMultipleSelectFieldInputEvent)
  }

  protected cleanupHTML = cleanupInnerHTML
}
