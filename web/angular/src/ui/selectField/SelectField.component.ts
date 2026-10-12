import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/selectField'
import {
  createNgSelectFieldProps,
  type IYNgSelectFieldProps,
  type YNgSelectFieldFocusEvent,
  type YNgSelectFieldInputEvent,
  type YNgSelectFieldSelectEvent,
  type YNgSelectFieldBlurEvent,
} from '~ng/ui/selectField/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { value, name, placeholder, autofocus, disabled, readonly, error, errors, size, required, labelText, labelTooltipText, annotationText, labelDebounce, isMapOptions, items, itemLabel, itemValue, isCustomFilter, isFilterable, filterValue, filterCallback } = createNgSelectFieldProps()

@Component({
  selector: 'YSelectField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-select-field
      [value]="value"
      [name]="name"
      [placeholder]="placeholder"
      [autofocus]="autofocus"
      [disabled]="disabled"
      [readonly]="readonly"
      [required]="required"
      [errors]="errors"
      [size]="size"
      [error]="error"
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
      (blur)="handleBlurEvent($event)"
      (select)="handleSelectEvent($event)"
    >
      <div hidden #before>
        <ng-content select="[before]" />
      </div>

      @if (cleanupHTML(before)) {
        <div
          slot="before"
          [innerHTML]="cleanupHTML(before)"
        ></div>
      }

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

      <div hidden #dropdownListBottom>
        <ng-content select="[dropdown-list-bottom]" />
      </div>

      @if (cleanupHTML(dropdownListBottom)) {
        <div
          slot="dropdown-list-bottom"
          [innerHTML]="cleanupHTML(dropdownListBottom)"
        ></div>
      }
    >
      <ng-content />
    </y-core-select-field>
  `,
})

export class YSelectField implements IYNgSelectFieldProps {
  @Input() @DefaultValue(value) value: IYNgSelectFieldProps['value'] = value
  @Input() @DefaultValue(name) name: IYNgSelectFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IYNgSelectFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IYNgSelectFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IYNgSelectFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IYNgSelectFieldProps['readonly'] = readonly
  @Input() @DefaultValue(required) required: IYNgSelectFieldProps['required'] = required
  @Input() @DefaultValue(errors) errors: IYNgSelectFieldProps['errors'] = errors
  @Input() @DefaultValue(size) size: IYNgSelectFieldProps['size'] = size
  @Input() @DefaultValue(error) error: IYNgSelectFieldProps['error'] = error
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgSelectFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(isMapOptions) isMapOptions: IYNgSelectFieldProps['isMapOptions'] = isMapOptions
  @Input() @DefaultValue(labelText) labelText: IYNgSelectFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgSelectFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(annotationText) annotationText: IYNgSelectFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(items) items: IYNgSelectFieldProps['items'] = items
  @Input() @DefaultValue(itemLabel) itemLabel: IYNgSelectFieldProps['itemLabel'] = itemLabel
  @Input() @DefaultValue(itemValue) itemValue: IYNgSelectFieldProps['itemValue'] = itemValue
  @Input() @DefaultValue(isCustomFilter) isCustomFilter: IYNgSelectFieldProps['isCustomFilter'] = isCustomFilter
  @Input() @DefaultValue(filterValue) filterValue: IYNgSelectFieldProps['filterValue'] = filterValue
  @Input() @DefaultValue(isFilterable) isFilterable: IYNgSelectFieldProps['isFilterable'] = isFilterable
  @Input() @DefaultValue(filterCallback) filterCallback: IYNgSelectFieldProps['filterCallback'] = filterCallback

  @Output() focus = new EventEmitter<YNgSelectFieldFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as YNgSelectFieldFocusEvent)
  }

  @Output() select = new EventEmitter<YNgSelectFieldSelectEvent>()
  handleSelectEvent(event: Event) {
    this.select.emit(event as YNgSelectFieldSelectEvent)
  }

  @Output() input = new EventEmitter<YNgSelectFieldInputEvent>()
  handleInputEvent(event: Event) {
    this.input.emit(event as YNgSelectFieldInputEvent)
  }

  @Output() blur = new EventEmitter<YNgSelectFieldBlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as YNgSelectFieldBlurEvent)
  }

  protected cleanupHTML = cleanupInnerHTML
}
