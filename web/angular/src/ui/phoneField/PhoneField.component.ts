import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/phoneField'
import {
  type IYNgPhoneFieldProps,
  type YNgPhoneFieldFocusEvent,
  type YNgPhoneFieldBlurEvent,
  type YNgPhoneFieldChangeEvent,
  type YNgPhoneFieldSelectOptionEvent,
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
  selector: 'YPhoneField',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-phone-field
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
    </y-core-phone-field>
  `,
})
export class YPhoneField implements IYNgPhoneFieldProps {
  @Input() @DefaultValue(value) value: IYNgPhoneFieldProps['value'] = value
  @Input() @DefaultValue(name) name: IYNgPhoneFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IYNgPhoneFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IYNgPhoneFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IYNgPhoneFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IYNgPhoneFieldProps['readonly'] = readonly
  @Input() @DefaultValue(required) required: IYNgPhoneFieldProps['required'] = required
  @Input() @DefaultValue(errors) errors: IYNgPhoneFieldProps['errors'] = errors
  @Input() @DefaultValue(error) error: IYNgPhoneFieldProps['error'] = error
  @Input() @DefaultValue(size) size: IYNgPhoneFieldProps['size'] = size
  @Input() @DefaultValue(labelText) labelText: IYNgPhoneFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgPhoneFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgPhoneFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(minSearchLength) minSearchLength: IYNgPhoneFieldProps['minSearchLength'] = minSearchLength
  @Input() @DefaultValue(withoutCodeSelection) withoutCodeSelection: IYNgPhoneFieldProps['withoutCodeSelection'] = withoutCodeSelection
  @Input() @DefaultValue(disabledAutocomplete) disabledAutocomplete: IYNgPhoneFieldProps['disabledAutocomplete'] = disabledAutocomplete
  @Input() @DefaultValue(searchFunction) searchFunction: IYNgPhoneFieldProps['searchFunction'] = searchFunction
  @Input() @DefaultValue(annotationText) annotationText: IYNgPhoneFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(countries) countries: IYNgPhoneFieldProps['countries'] = countries
  @Input() @DefaultValue(defaultCountryId) defaultCountryId: IYNgPhoneFieldProps['defaultCountryId'] = defaultCountryId
  @Input() @DefaultValue(emptyStateIcon) emptyStateIcon: IYNgPhoneFieldProps['emptyStateIcon'] = emptyStateIcon
  @Input() @DefaultValue(emptyStateTitle) emptyStateTitle: IYNgPhoneFieldProps['emptyStateTitle'] = emptyStateTitle
  @Input() @DefaultValue(emptyStateDescription) emptyStateDescription: IYNgPhoneFieldProps['emptyStateDescription'] = emptyStateDescription
  @Input() @DefaultValue(optionPhonePrivacyEnabled) optionPhonePrivacyEnabled: IYNgPhoneFieldProps['optionPhonePrivacyEnabled'] = optionPhonePrivacyEnabled

  @Output() focus = new EventEmitter<YNgPhoneFieldFocusEvent>()
  handleFocusEvent(event: Event) {
    this.focus.emit(event as YNgPhoneFieldFocusEvent)
  }

  @Output() blur = new EventEmitter<YNgPhoneFieldBlurEvent>()
  handleBlurEvent(event: Event) {
    this.blur.emit(event as YNgPhoneFieldBlurEvent)
  }

  @Output() change = new EventEmitter<YNgPhoneFieldChangeEvent>()
  handleChangeEvent(event: Event) {
    this.change.emit(event as YNgPhoneFieldChangeEvent)
  }

  @Output('select-option') selectOption = new EventEmitter<YNgPhoneFieldSelectOptionEvent>()
  handleSelectOptionEvent(event: Event) {
    this.selectOption.emit(event as YNgPhoneFieldSelectOptionEvent)
  }

  protected cleanupHTML = cleanupInnerHTML
}
