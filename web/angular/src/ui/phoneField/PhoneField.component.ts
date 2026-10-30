import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/phoneField'
import {
  type IAltNgPhoneFieldProps,
  type AltNgPhoneFieldFocusEvent,
  type AltNgPhoneFieldBlurEvent,
  type AltNgPhoneFieldChangeEvent,
  type AltNgPhoneFieldSelectOptionEvent,
  createNgPhoneFieldProps,
} from '~ng/ui/phoneField/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const {
  value,
  name,
  placeholder,
  autofocus,
  disabled,
  readonly,
  errors,
  error,
  size,
  required,
  labelText,
  labelTooltipText,
  labelDebounce,
  annotationText,
  minSearchLength,
  withoutCodeSelection,
  disabledAutocomplete,
  searchFunction,
  countries,
  defaultCountryId,
  emptyStateTitle,
  emptyStateIcon,
  emptyStateDescription,
  optionPhonePrivacyEnabled,
} = createNgPhoneFieldProps()

@Component({
  selector: 'AltPhoneField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-phone-field
      [value]="value"
      [name]="name"
      [placeholder]="placeholder"
      [autofocus]="autofocus"
      [disabled]="disabled"
      [readonly]="readonly"
      [errors]="errors"
      [size]="size"
      [required]="required"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [annotationText]="annotationText"
      [minSearchLength]="minSearchLength"
      [withoutCodeSelection]="withoutCodeSelection"
      [disabledAutocomplete]="disabledAutocomplete"
      [searchFunction]="searchFunction"
      [countries]="countries"
      [defaultCountryId]="defaultCountryId"
      [emptyStateDescription]="emptyStateDescription"
      [emptyStateTitle]="emptyStateTitle"
      [emptyStateIcon]="emptyStateIcon"
      [optionPhonePrivacyEnabled]="optionPhonePrivacyEnabled"
      (change)="handleChangeEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (select-option)="handleSelectOptionEvent($event)"
    >
      <div hidden #list>
        <ng-content select="[phone-field-list]" />
      </div>

      @if (cleanupHTML(list)) {
        <div
          slot="list"
          [innerHTML]="cleanupHTML(list)"
        ></div>
      }

      <div hidden #annotation>
        <ng-content select="[phone-field-annotation]" />
      </div>

      @if (cleanupHTML(annotation)) {
        <div
          slot="annotation"
          [innerHTML]="cleanupHTML(annotation)"
        ></div>
      }
    </alt-core-phone-field>
  `,
})
export class AltPhoneField implements IAltNgPhoneFieldProps {
  @Input() @DefaultValue(value) value: IAltNgPhoneFieldProps['value'] = value
  @Input() @DefaultValue(name) name: IAltNgPhoneFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IAltNgPhoneFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IAltNgPhoneFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IAltNgPhoneFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IAltNgPhoneFieldProps['readonly'] = readonly
  @Input() @DefaultValue(required) required: IAltNgPhoneFieldProps['required'] = required
  @Input() @DefaultValue(errors) errors: IAltNgPhoneFieldProps['errors'] = errors
  @Input() @DefaultValue(error) error: IAltNgPhoneFieldProps['error'] = error
  @Input() @DefaultValue(size) size: IAltNgPhoneFieldProps['size'] = size
  @Input() @DefaultValue(labelText) labelText: IAltNgPhoneFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgPhoneFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgPhoneFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(minSearchLength) minSearchLength: IAltNgPhoneFieldProps['minSearchLength'] = minSearchLength
  @Input() @DefaultValue(withoutCodeSelection) withoutCodeSelection: IAltNgPhoneFieldProps['withoutCodeSelection'] = withoutCodeSelection
  @Input() @DefaultValue(disabledAutocomplete) disabledAutocomplete: IAltNgPhoneFieldProps['disabledAutocomplete'] = disabledAutocomplete
  @Input() @DefaultValue(searchFunction) searchFunction: IAltNgPhoneFieldProps['searchFunction'] = searchFunction
  @Input() @DefaultValue(annotationText) annotationText: IAltNgPhoneFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(countries) countries: IAltNgPhoneFieldProps['countries'] = countries
  @Input() @DefaultValue(defaultCountryId) defaultCountryId: IAltNgPhoneFieldProps['defaultCountryId'] = defaultCountryId
  @Input() @DefaultValue(emptyStateIcon) emptyStateIcon: IAltNgPhoneFieldProps['emptyStateIcon'] = emptyStateIcon
  @Input() @DefaultValue(emptyStateTitle) emptyStateTitle: IAltNgPhoneFieldProps['emptyStateTitle'] = emptyStateTitle
  @Input() @DefaultValue(emptyStateDescription) emptyStateDescription: IAltNgPhoneFieldProps['emptyStateDescription'] = emptyStateDescription
  @Input() @DefaultValue(optionPhonePrivacyEnabled) optionPhonePrivacyEnabled: IAltNgPhoneFieldProps['optionPhonePrivacyEnabled'] = optionPhonePrivacyEnabled

  @Output() focus = new EventEmitter<AltNgPhoneFieldFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as AltNgPhoneFieldFocusEvent)
  }

  @Output() blur = new EventEmitter<AltNgPhoneFieldBlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as AltNgPhoneFieldBlurEvent)
  }

  @Output() change = new EventEmitter<AltNgPhoneFieldChangeEvent>()
  handleChangeEvent(event: Event) {
    this.change.emit(event as AltNgPhoneFieldChangeEvent)
  }

  @Output('select-option') selectOption = new EventEmitter<AltNgPhoneFieldSelectOptionEvent>()
  handleSelectOptionEvent(event: Event) {
    this.selectOption.emit(event as AltNgPhoneFieldSelectOptionEvent)
  }

  protected cleanupHTML = cleanupInnerHTML
}
