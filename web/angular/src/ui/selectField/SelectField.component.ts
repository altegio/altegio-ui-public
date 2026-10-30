import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/selectField'
import {
  createNgSelectFieldProps,
  type IAltNgSelectFieldProps,
  type AltNgSelectFieldFocusEvent,
  type AltNgSelectFieldInputEvent,
  type AltNgSelectFieldSelectEvent,
  type AltNgSelectFieldBlurEvent,
} from '~ng/ui/selectField/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { value, name, placeholder, autofocus, disabled, readonly, error, errors, size, required, labelText, labelTooltipText, annotationText, labelDebounce, isMapOptions, items, itemLabel, itemValue, isCustomFilter, isFilterable, filterValue, filterCallback } = createNgSelectFieldProps()

@Component({
  selector: 'AltSelectField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-select-field
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
    </alt-core-select-field>
  `,
})

export class AltSelectField implements IAltNgSelectFieldProps {
  @Input() @DefaultValue(value) value: IAltNgSelectFieldProps['value'] = value
  @Input() @DefaultValue(name) name: IAltNgSelectFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IAltNgSelectFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IAltNgSelectFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IAltNgSelectFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IAltNgSelectFieldProps['readonly'] = readonly
  @Input() @DefaultValue(required) required: IAltNgSelectFieldProps['required'] = required
  @Input() @DefaultValue(errors) errors: IAltNgSelectFieldProps['errors'] = errors
  @Input() @DefaultValue(size) size: IAltNgSelectFieldProps['size'] = size
  @Input() @DefaultValue(error) error: IAltNgSelectFieldProps['error'] = error
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgSelectFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(isMapOptions) isMapOptions: IAltNgSelectFieldProps['isMapOptions'] = isMapOptions
  @Input() @DefaultValue(labelText) labelText: IAltNgSelectFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgSelectFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(annotationText) annotationText: IAltNgSelectFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(items) items: IAltNgSelectFieldProps['items'] = items
  @Input() @DefaultValue(itemLabel) itemLabel: IAltNgSelectFieldProps['itemLabel'] = itemLabel
  @Input() @DefaultValue(itemValue) itemValue: IAltNgSelectFieldProps['itemValue'] = itemValue
  @Input() @DefaultValue(isCustomFilter) isCustomFilter: IAltNgSelectFieldProps['isCustomFilter'] = isCustomFilter
  @Input() @DefaultValue(filterValue) filterValue: IAltNgSelectFieldProps['filterValue'] = filterValue
  @Input() @DefaultValue(isFilterable) isFilterable: IAltNgSelectFieldProps['isFilterable'] = isFilterable
  @Input() @DefaultValue(filterCallback) filterCallback: IAltNgSelectFieldProps['filterCallback'] = filterCallback

  @Output() focus = new EventEmitter<AltNgSelectFieldFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as AltNgSelectFieldFocusEvent)
  }

  @Output() select = new EventEmitter<AltNgSelectFieldSelectEvent>()
  handleSelectEvent(event: Event) {
    this.select.emit(event as AltNgSelectFieldSelectEvent)
  }

  @Output() input = new EventEmitter<AltNgSelectFieldInputEvent>()
  handleInputEvent(event: Event) {
    this.input.emit(event as AltNgSelectFieldInputEvent)
  }

  @Output() blur = new EventEmitter<AltNgSelectFieldBlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as AltNgSelectFieldBlurEvent)
  }

  protected cleanupHTML = cleanupInnerHTML
}
