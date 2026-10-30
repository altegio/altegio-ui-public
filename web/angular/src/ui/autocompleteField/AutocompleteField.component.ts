import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core'

import '~core/ui/autocompleteField'
import {
  type IAltNgAutocompleteFieldProps,
  type AutocompleteFieldFocusEvent,
  type AutocompleteFieldBlurEvent,
  type AutocompleteFieldChangeEvent,
  type AutocompleteFieldSelectOptionEvent,
  createNgAutocompleteFieldProps,
} from '~ng/ui/autocompleteField/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'
import type { TAltCoreAutocompleteFieldAutocompleteOption } from '~core/ui/autocompleteField/models/types'

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
  selector: 'AltAutocompleteField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-autocomplete-field
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
    </alt-core-autocomplete-field>
  `,
})
export class AltAutocompleteField implements IAltNgAutocompleteFieldProps {
  @Input() @DefaultValue(value) value: IAltNgAutocompleteFieldProps['value'] = value
  @Input() @DefaultValue(name) name: IAltNgAutocompleteFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IAltNgAutocompleteFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IAltNgAutocompleteFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IAltNgAutocompleteFieldProps['disabled'] = disabled
  @Input() @DefaultValue(required) required: IAltNgAutocompleteFieldProps['required'] = required
  @Input() @DefaultValue(errors) errors: IAltNgAutocompleteFieldProps['errors'] = errors
  @Input() @DefaultValue(error) error: IAltNgAutocompleteFieldProps['error'] = error
  @Input() @DefaultValue(size) size: IAltNgAutocompleteFieldProps['size'] = size
  @Input() @DefaultValue(labelText) labelText: IAltNgAutocompleteFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgAutocompleteFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgAutocompleteFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(minSearchLength) minSearchLength: IAltNgAutocompleteFieldProps['minSearchLength'] = minSearchLength
  @Input() @DefaultValue(disabledAutocomplete) disabledAutocomplete: IAltNgAutocompleteFieldProps['disabledAutocomplete'] = disabledAutocomplete
  @Input() @DefaultValue(searchFunction) searchFunction: IAltNgAutocompleteFieldProps['searchFunction'] = searchFunction
  @Input() @DefaultValue(annotationText) annotationText: IAltNgAutocompleteFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(emptyStateIcon) emptyStateIcon: IAltNgAutocompleteFieldProps['emptyStateIcon'] = emptyStateIcon
  @Input() @DefaultValue(emptyStateTitle) emptyStateTitle: IAltNgAutocompleteFieldProps['emptyStateTitle'] = emptyStateTitle
  @Input() @DefaultValue(emptyStateDescription) emptyStateDescription: IAltNgAutocompleteFieldProps['emptyStateDescription'] = emptyStateDescription

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

  autocompleteOptions: TAltCoreAutocompleteFieldAutocompleteOption[] = []

  @ViewChild('customOptionTemplate', { read: TemplateRef }) customOptionTemplate!: TemplateRef<unknown>
  private customOptionTemplates = new Map<string | number, TemplateRef<unknown>>()

  getCustomOptionTemplate(optionId: string | number) {
    return this.customOptionTemplates.get(optionId) || this.customOptionTemplate
  }
}
