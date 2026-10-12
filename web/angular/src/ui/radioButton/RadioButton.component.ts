import type { TemplateRef } from '@angular/core'
import { Component, ContentChild, CUSTOM_ELEMENTS_SCHEMA, forwardRef, Input } from '@angular/core'

import '~core/ui/radioButton'
import type { TYNgRadioButtonModel, RadioButtonCheckedEvent } from '~ng/ui/radioButton/models/types'
import { createNgRadioButtonProps, type IYNgRadioButtonProps } from '~ng/ui/radioButton/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { DEFAULT_CHECKED_VALUE } from './models/constants'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { NgTemplateOutlet } from '@angular/common'

const {
  labelText,
  labelTooltipText,
  annotationText,
  size,
  value,
  disabled,
  required,
  name,
  errors,
  alignment,
  labelOverflowDebounce,
} = createNgRadioButtonProps()

@Component({
  selector: 'YRadioButton',
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YRadioButton),
      multi: true,
    },
  ],
  template: `
    <y-core-radio-button
      (checked)="handleCheckedEvent($event)"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [annotationText]="annotationText"
      [size]="size"
      [checked]="isChecked"
      [value]="value"
      [disabled]="disabled"
      [required]="required"
      [name]="name"
      [errors]="errors"
      [alignment]="alignment"
      [labelOverflowDebounce]="labelOverflowDebounce"
    >

      @if (radioButtonAnnotationRef) {
        <div slot="annotation">
          <ng-container *ngTemplateOutlet="radioButtonAnnotationRef" />
        </div>
      }

      @if (radioButtonTooltipContentRef) {
        <div slot="tooltip-content">
          <ng-container *ngTemplateOutlet="radioButtonTooltipContentRef" />
        </div>
      }
    </y-core-radio-button>
  `,
})
export class YRadioButton extends ControlValueAccessorBase<TYNgRadioButtonModel> implements IYNgRadioButtonProps {
  @Input() @DefaultValue(labelText) labelText: IYNgRadioButtonProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgRadioButtonProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelOverflowDebounce) labelOverflowDebounce: IYNgRadioButtonProps['labelOverflowDebounce'] = labelOverflowDebounce
  @Input() @DefaultValue(annotationText) annotationText: IYNgRadioButtonProps['annotationText'] = annotationText
  @Input() @DefaultValue(size) size: IYNgRadioButtonProps['size'] = size
  @Input() @DefaultValue(value) value: IYNgRadioButtonProps['value'] = value
  @Input() @DefaultValue(disabled) disabled: IYNgRadioButtonProps['disabled'] = disabled
  @Input() @DefaultValue(required) required: IYNgRadioButtonProps['required'] = required
  @Input() @DefaultValue(name) name: IYNgRadioButtonProps['name'] = name
  @Input() @DefaultValue(errors) errors: IYNgRadioButtonProps['errors'] = errors
  @Input() @DefaultValue(alignment) alignment: IYNgRadioButtonProps['alignment'] = alignment


  @ContentChild('radioButtonAnnotation') radioButtonAnnotationRef: TemplateRef<unknown> | undefined
  @ContentChild('radioButtonTooltipContent') radioButtonTooltipContentRef: TemplateRef<unknown> | undefined

  isChecked: TYNgRadioButtonModel = DEFAULT_CHECKED_VALUE

  writeValue(value: TYNgRadioButtonModel) {
    this.isChecked = value
  }

  handleCheckedEvent(event: Event) {
    event.stopPropagation()

    const { checked } = (event as RadioButtonCheckedEvent).detail

    this.isChecked = checked

    this.onChange(checked)
    this.onTouched()
  }
}
