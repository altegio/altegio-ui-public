import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/multipleSelectField'
import {
  createNgMultipleSelectFieldProps,
  type IAltNgMultipleSelectFieldProps,
  type AltNgMultipleSelectFieldFocusEvent,
  type AltNgMultipleSelectFieldInputEvent,
  type AltNgMultipleSelectFieldSelectEvent,
} from '~ng/ui/multipleSelectField/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { value, name, placeholder, autofocus, disabled, readonly, error, errors, size, required, labelText, labelTooltipText, annotationText, labelDebounce, isMapOptions, items, itemLabel, itemValue, isCustomFilter, isFilterable, filterValue, filterCallback } = createNgMultipleSelectFieldProps()

@Component({
  selector: 'AltMultipleSelectField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-multiple-select-field
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
    </alt-core-multiple-select-field>
  `,
})

export class AltMultipleSelectField implements IAltNgMultipleSelectFieldProps {
  @Input() @DefaultValue(value) value: IAltNgMultipleSelectFieldProps['value'] = value
  @Input() @DefaultValue(name) name: IAltNgMultipleSelectFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IAltNgMultipleSelectFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IAltNgMultipleSelectFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IAltNgMultipleSelectFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IAltNgMultipleSelectFieldProps['readonly'] = readonly
  @Input() @DefaultValue(required) required: IAltNgMultipleSelectFieldProps['required'] = required
  @Input() @DefaultValue(errors) errors: IAltNgMultipleSelectFieldProps['errors'] = errors
  @Input() @DefaultValue(error) error: IAltNgMultipleSelectFieldProps['error'] = error
  @Input() @DefaultValue(size) size: IAltNgMultipleSelectFieldProps['size'] = size
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgMultipleSelectFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(isMapOptions) isMapOptions: IAltNgMultipleSelectFieldProps['isMapOptions'] = isMapOptions
  @Input() @DefaultValue(labelText) labelText: IAltNgMultipleSelectFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgMultipleSelectFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(annotationText) annotationText: IAltNgMultipleSelectFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(items) items: IAltNgMultipleSelectFieldProps['items'] = items
  @Input() @DefaultValue(itemLabel) itemLabel: IAltNgMultipleSelectFieldProps['itemLabel'] = itemLabel
  @Input() @DefaultValue(itemValue) itemValue: IAltNgMultipleSelectFieldProps['itemValue'] = itemValue
  @Input() @DefaultValue(isCustomFilter) isCustomFilter: IAltNgMultipleSelectFieldProps['isCustomFilter'] = isCustomFilter
  @Input() @DefaultValue(isFilterable) isFilterable: IAltNgMultipleSelectFieldProps['isFilterable'] = isFilterable
  @Input() @DefaultValue(filterValue) filterValue: IAltNgMultipleSelectFieldProps['filterValue'] = filterValue
  @Input() @DefaultValue(filterCallback) filterCallback: IAltNgMultipleSelectFieldProps['filterCallback'] = filterCallback

  @Output() focus = new EventEmitter<AltNgMultipleSelectFieldFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as AltNgMultipleSelectFieldFocusEvent)
  }

  @Output() select = new EventEmitter<AltNgMultipleSelectFieldSelectEvent>()
  handleSelectEvent(event: Event) {
    this.select.emit(event as AltNgMultipleSelectFieldSelectEvent)
  }

  @Output() input = new EventEmitter<AltNgMultipleSelectFieldInputEvent>()
  handleInputEvent(event: Event) {
    this.input.emit(event as AltNgMultipleSelectFieldInputEvent)
  }

  protected cleanupHTML = cleanupInnerHTML
}
