import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, forwardRef, Input, Output, signal, ChangeDetectionStrategy } from '@angular/core'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'

import '~core/ui/textField'
import '~core/ui/fieldIcon'
import { YCoreTextField } from '~core/ui/textField'
import type { YCoreFieldIcon } from '~core/ui/fieldIcon'

import type { IYIcon } from './models/types'
import {
  type IYNgSearchFieldProps,
  type FocusEvent,
  type ClearEvent,
  type BlurEvent,
  type InputEvent,
  type TYNgSearchFieldModel,
  createNgSearchFieldProps,
  SEARCH_FIELD_ICON,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { preventAndStopEvent } from '~web/shared/utils'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreTextFieldTagName } from '~web/shared/constants'

const { placeholder, autofocus, disabled, errors, error, size, labelText, labelTooltipText, labelDebounce, annotationText, locatorClearIcon } = createNgSearchFieldProps()

defineCustomElement(YCoreTextFieldTagName, YCoreTextField)

@Component({
  selector: 'YSearchField',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YSearchField),
      multi: true,
    },
  ],
  template: `
    <y-core-text-field
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
      <y-core-field-icon
        (click)="handleSearchIconClickEvent($event)"
        [icon]="searchIcon"
        slot="before"
        clickable
      />
    </y-core-text-field>
  `,
})
export class YSearchField extends ControlValueAccessorBase<TYNgSearchFieldModel> implements IYNgSearchFieldProps {
  @Input() @DefaultValue(placeholder) placeholder: IYNgSearchFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IYNgSearchFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(disabled) disabled: IYNgSearchFieldProps['disabled'] = disabled
  @Input() @DefaultValue(error) error: IYNgSearchFieldProps['error'] = error
  @Input() @DefaultValue(errors) errors: IYNgSearchFieldProps['errors'] = errors
  @Input() @DefaultValue(size) size: IYNgSearchFieldProps['size'] = size
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgSearchFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(labelText) labelText: IYNgSearchFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgSearchFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(annotationText) annotationText: IYNgSearchFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(locatorClearIcon) locatorClearIcon: IYNgSearchFieldProps['locatorClearIcon'] = locatorClearIcon

  @Output() focus = new EventEmitter<FocusEvent>()
  @Output() blur = new EventEmitter<BlurEvent>()
  @Output() clear = new EventEmitter<ClearEvent>()
  @Output() searchIconClick = new EventEmitter<Event>()

  readonly searchIcon: IYIcon = SEARCH_FIELD_ICON

  searchFieldValue = signal<TYNgSearchFieldModel>('')

  writeValue(value: TYNgSearchFieldModel) {
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
    const fieldIcon = event.target as YCoreFieldIcon
    const textField = fieldIcon.parentElement as YCoreTextField

    textField.fieldInput?.inputElement?.focus()
    this.searchIconClick.emit(event)
  }
}
