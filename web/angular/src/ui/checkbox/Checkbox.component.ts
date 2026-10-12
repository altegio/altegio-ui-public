import { NgTemplateOutlet } from '@angular/common'
import type { TemplateRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, forwardRef, ContentChild, signal } from '@angular/core'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import '~core/ui/checkbox'
import { YCoreCheckbox } from '~core/ui/checkbox'
import type { TYNgCheckboxModel } from '~ng/ui/checkbox/models/types'
import { createNgCheckboxProps, type IYNgCheckboxProps, type CheckboxCheckedEvent } from '~ng/ui/checkbox/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { YCoreCheckboxTagName } from '~web/shared/constants'
import { defineCustomElement } from '~web/shared/utils/components'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'

const {
  labelText,
  labelTooltipText,
  annotationText,
  size,
  disabled,
  required,
  indeterminate,
  errors,
  alignment,
  labelOverflowDebounce,
  labelTooltipPlacement,
} = createNgCheckboxProps()

defineCustomElement(YCoreCheckboxTagName, YCoreCheckbox)

@Component({
  selector: 'YCheckbox',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, NgTemplateOutlet],
  template: `
    <y-core-checkbox
      (checked)="handleCheckedEvent($event)"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [annotationText]="annotationText"
      [size]="size"
      [checked]="modelValue()"
      [disabled]="disabled"
      [required]="required"
      [indeterminate]="indeterminate"
      [errors]="errors"
      [alignment]="alignment"
      [labelOverflowDebounce]="labelOverflowDebounce"
      [labelTooltipPlacement]="labelTooltipPlacement"
    >
      @if (checkboxLabelRef) {
        <div slot="label">
          <ng-container *ngTemplateOutlet="checkboxLabelRef" />
        </div>
      }

      @if (checkboxAnnotationRef) {
        <div slot="annotation">
          <ng-container *ngTemplateOutlet="checkboxAnnotationRef" />
        </div>
      }

      @if (tooltipContentRef) {
        <div slot="tooltip-content">
          <ng-container *ngTemplateOutlet="tooltipContentRef" />
        </div>
      }
    </y-core-checkbox>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YCheckbox),
      multi: true,
    },
  ],
})
export class YCheckbox extends ControlValueAccessorBase<TYNgCheckboxModel> implements IYNgCheckboxProps {
  @Input() @DefaultValue(labelText) labelText: IYNgCheckboxProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgCheckboxProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelOverflowDebounce) labelOverflowDebounce: IYNgCheckboxProps['labelOverflowDebounce'] = labelOverflowDebounce
  @Input() @DefaultValue(annotationText) annotationText: IYNgCheckboxProps['annotationText'] = annotationText
  @Input() @DefaultValue(size) size: IYNgCheckboxProps['size'] = size
  @Input() @DefaultValue(disabled) disabled: IYNgCheckboxProps['disabled'] = disabled
  @Input() @DefaultValue(required) required: IYNgCheckboxProps['required'] = required
  @Input() @DefaultValue(indeterminate) indeterminate: IYNgCheckboxProps['indeterminate'] = indeterminate
  @Input() @DefaultValue(errors) errors: IYNgCheckboxProps['errors'] = errors
  @Input() @DefaultValue(alignment) alignment: IYNgCheckboxProps['alignment'] = alignment
  @Input() @DefaultValue(labelTooltipPlacement) labelTooltipPlacement: IYNgCheckboxProps['labelTooltipPlacement'] = labelTooltipPlacement

  @ContentChild('checkboxLabel') checkboxLabelRef: TemplateRef<unknown> | undefined
  @ContentChild('checkboxAnnotation') checkboxAnnotationRef: TemplateRef<unknown> | undefined
  @ContentChild('tooltipContent') tooltipContentRef: TemplateRef<unknown> | undefined

  modelValue = signal<TYNgCheckboxModel>(false)

  writeValue(value: boolean) {
    this.modelValue.set(value)
  }

  handleCheckedEvent(event: Event) {
    event.stopPropagation()

    const checkedEvent = event as CheckboxCheckedEvent
    const checked = checkedEvent.detail.checked

    this.modelValue.set(checked)
    this.onChange(checked)
    this.onTouched()
  }
}
