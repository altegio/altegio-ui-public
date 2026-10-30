import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, forwardRef, Input, Output, signal, ChangeDetectionStrategy } from '@angular/core'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'

import '~core/ui/textField'
import '~core/ui/fieldIcon'
import { AltCoreTextField } from '~core/ui/textField'
import type { AltCoreFieldIcon } from '~core/ui/fieldIcon'

import type { IAltIcon } from './models/types'
import {
  type IAltNgSearchFieldProps,
  type FocusEvent,
  type ClearEvent,
  type BlurEvent,
  type InputEvent,
  type TAltNgSearchFieldModel,
  createNgSearchFieldProps,
  SEARCH_FIELD_ICON,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { preventAndStopEvent } from '~web/shared/utils'
import { defineCustomElement } from '~web/shared/utils/components'
import { AltCoreTextFieldTagName } from '~web/shared/constants'

const { placeholder, autofocus, disabled, errors, error, size, labelText, labelTooltipText, labelDebounce, annotationText, locatorClearIcon } = createNgSearchFieldProps()

defineCustomElement(AltCoreTextFieldTagName, AltCoreTextField)

@Component({
  selector: 'AltSearchField',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltSearchField),
      multi: true,
    },
  ],
  template: `
    <alt-core-text-field
      (input)="handleInputEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (clear)="handleClearEvent($event)"
      [value]="searchFieldValue()"
      [placeholder]="placeholder"
      [autofocus]="autofocus"
      [disabled]="disabled"
      [error]="error"
      [errors]="errors"
      [clearable]="true"
      [size]="size"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [annotationText]="annotationText"
      [locatorClearIcon]="locatorClearIcon"
    >
      <alt-core-field-icon
        (click)="handleSearchIconClickEvent($event)"
        [icon]="searchIcon"
        slot="before"
        clickable
      />
    </alt-core-text-field>
  `,
})
export class AltSearchField extends ControlValueAccessorBase<TAltNgSearchFieldModel> implements IAltNgSearchFieldProps {
  @Input() @DefaultValue(placeholder) placeholder: IAltNgSearchFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IAltNgSearchFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IAltNgSearchFieldProps['disabled'] = disabled
  @Input() @DefaultValue(error) error: IAltNgSearchFieldProps['error'] = error
  @Input() @DefaultValue(errors) errors: IAltNgSearchFieldProps['errors'] = errors
  @Input() @DefaultValue(size) size: IAltNgSearchFieldProps['size'] = size
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgSearchFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(labelText) labelText: IAltNgSearchFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgSearchFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(annotationText) annotationText: IAltNgSearchFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(locatorClearIcon) locatorClearIcon: IAltNgSearchFieldProps['locatorClearIcon'] = locatorClearIcon

  @Output() focus = new EventEmitter<FocusEvent>()
  @Output() blur = new EventEmitter<BlurEvent>()
  @Output() clear = new EventEmitter<ClearEvent>()
  @Output() searchIconClick = new EventEmitter<Event>()

  readonly searchIcon: IAltIcon = SEARCH_FIELD_ICON

  searchFieldValue = signal<TAltNgSearchFieldModel>('')

  writeValue(value: TAltNgSearchFieldModel) {
    this.searchFieldValue.set(value)
  }

  handleInputEvent(event: Event) {
    preventAndStopEvent(event)

    const { value } = (event as InputEvent).detail
    this.searchFieldValue.set(value)

    this.onChange(value)
    this.onTouched()
  }

  handleFocusEvent(event: Event) {
    preventAndStopEvent(event)
    this.focus.emit(event as FocusEvent)
  }


  handleBlurEvent(event: Event) {
    preventAndStopEvent(event)
    this.blur.emit(event as BlurEvent)
  }

  handleClearEvent(event: Event) {
    preventAndStopEvent(event)
    this.clear.emit(event as ClearEvent)
  }

  handleSearchIconClickEvent(event: Event) {
    const fieldIcon = event.target as AltCoreFieldIcon
    const textField = fieldIcon.parentElement as AltCoreTextField

    textField.fieldInput?.inputElement?.focus()
    this.searchIconClick.emit(event)
  }
}
