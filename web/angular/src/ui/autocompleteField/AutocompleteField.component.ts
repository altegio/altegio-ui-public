import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import '~core/ui/autocompleteField'
import {
  type IYNgAutocompleteFieldProps,
  type AutocompleteFieldFocusEvent,
  type AutocompleteFieldBlurEvent,
  type AutocompleteFieldChangeEvent,
  type AutocompleteFieldSelectOptionEvent,
  createNgAutocompleteFieldProps,
} from '~ng/ui/autocompleteField/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'
import type { TYCoreAutocompleteFieldAutocompleteOption } from '~core/ui/autocompleteField/models/types'

const {
  value,
  name,
  placeholder,
  autofocus,
  disabled,
  errors,
  error,
  size,
  required,
  labelText,
  labelTooltipText,
  labelDebounce,
  annotationText,
  minSearchLength,
  disabledAutocomplete,
  searchFunction,
  emptyStateTitle,
  emptyStateIcon,
  emptyStateDescription,
} = createNgAutocompleteFieldProps()

@Component({
  selector: 'YAutocompleteField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
    <y-core-autocomplete-field
      [value]="value"
      [name]="name"
      [placeholder]="placeholder"
      [autofocus]="autofocus"
      [disabled]="disabled"
      [errors]="errors"
      [size]="size"
      [required]="required"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [annotationText]="annotationText"
      [minSearchLength]="minSearchLength"
      [disabledAutocomplete]="disabledAutocomplete"
      [searchFunction]="searchFunction"
      [emptyStateDescription]="emptyStateDescription"
      [emptyStateTitle]="emptyStateTitle"
      [emptyStateIcon]="emptyStateIcon"
      (change)="handleChangeEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (select-option)="handleSelectOptionEvent($event)"
    >
      <div hidden #list>
        <ng-content select="[autocomplete-field-list]" />
      </div>

      @if (cleanupHTML(list)) {
        <div
          slot="list"
          [innerHTML]="cleanupHTML(list)"
        ></div>
      }

      <div hidden #annotation>
        <ng-content select="[autocomplete-field-annotation]" />
      </div>

      @if (cleanupHTML(annotation)) {
        <div
          slot="annotation"
          [innerHTML]="cleanupHTML(annotation)"
        ></div>
      }
    </y-core-autocomplete-field>
  `,
})
export class YAutocompleteField implements IYNgAutocompleteFieldProps {
  @Input() @DefaultValue(value) value: IYNgAutocompleteFieldProps['value'] = value
  @Input() @DefaultValue(name) name: IYNgAutocompleteFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IYNgAutocompleteFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IYNgAutocompleteFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IYNgAutocompleteFieldProps['disabled'] = disabled
  @Input() @DefaultValue(required) required: IYNgAutocompleteFieldProps['required'] = required
  @Input() @DefaultValue(errors) errors: IYNgAutocompleteFieldProps['errors'] = errors
  @Input() @DefaultValue(error) error: IYNgAutocompleteFieldProps['error'] = error
  @Input() @DefaultValue(size) size: IYNgAutocompleteFieldProps['size'] = size
  @Input() @DefaultValue(labelText) labelText: IYNgAutocompleteFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgAutocompleteFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgAutocompleteFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(minSearchLength) minSearchLength: IYNgAutocompleteFieldProps['minSearchLength'] = minSearchLength
  @Input() @DefaultValue(disabledAutocomplete) disabledAutocomplete: IYNgAutocompleteFieldProps['disabledAutocomplete'] = disabledAutocomplete
  @Input() @DefaultValue(searchFunction) searchFunction: IYNgAutocompleteFieldProps['searchFunction'] = searchFunction
  @Input() @DefaultValue(annotationText) annotationText: IYNgAutocompleteFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(emptyStateIcon) emptyStateIcon: IYNgAutocompleteFieldProps['emptyStateIcon'] = emptyStateIcon
  @Input() @DefaultValue(emptyStateTitle) emptyStateTitle: IYNgAutocompleteFieldProps['emptyStateTitle'] = emptyStateTitle
  @Input() @DefaultValue(emptyStateDescription) emptyStateDescription: IYNgAutocompleteFieldProps['emptyStateDescription'] = emptyStateDescription

  @Output() focus = new EventEmitter<AutocompleteFieldFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as AutocompleteFieldFocusEvent)
  }

  @Output() blur = new EventEmitter<AutocompleteFieldBlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as AutocompleteFieldBlurEvent)
  }

  @Output() change = new EventEmitter<AutocompleteFieldChangeEvent>()
  handleChangeEvent(event: Event) {
    this.change.emit(event as AutocompleteFieldChangeEvent)
  }

  @Output('select-option') selectOption = new EventEmitter<AutocompleteFieldSelectOptionEvent>()
  handleSelectOptionEvent(event: Event) {
    this.selectOption.emit(event as AutocompleteFieldSelectOptionEvent)
  }

  protected cleanupHTML = cleanupInnerHTML

  autocompleteOptions: TYCoreAutocompleteFieldAutocompleteOption[] = []

  @ViewChild('customOptionTemplate', { read: TemplateRef }) customOptionTemplate!: TemplateRef<unknown>
  private customOptionTemplates = new Map<string | number, TemplateRef<unknown>>()

  getCustomOptionTemplate(optionId: string | number) {
    return this.customOptionTemplates.get(optionId) || this.customOptionTemplate
  }
}
