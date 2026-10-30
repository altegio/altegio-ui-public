import { NgTemplateOutlet } from '@angular/common'
import type { TemplateRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, forwardRef, ContentChild, signal } from '@angular/core'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import '~core/ui/checkbox'
import { AltCoreCheckbox } from '~core/ui/checkbox'
import type { TAltNgCheckboxModel } from '~ng/ui/checkbox/models/types'
import { createNgCheckboxProps, type IAltNgCheckboxProps, type CheckboxCheckedEvent } from '~ng/ui/checkbox/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { AltCoreCheckboxTagName } from '~web/shared/constants'
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

defineCustomElement(AltCoreCheckboxTagName, AltCoreCheckbox)

@Component({
  selector: 'AltCheckbox',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, NgTemplateOutlet],
  template: `
    <alt-core-checkbox
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
    </alt-core-checkbox>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltCheckbox),
      multi: true,
    },
  ],
})
export class AltCheckbox extends ControlValueAccessorBase<TAltNgCheckboxModel> implements IAltNgCheckboxProps {
  @Input() @DefaultValue(labelText) labelText: IAltNgCheckboxProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgCheckboxProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelOverflowDebounce) labelOverflowDebounce: IAltNgCheckboxProps['labelOverflowDebounce'] = labelOverflowDebounce
  @Input() @DefaultValue(annotationText) annotationText: IAltNgCheckboxProps['annotationText'] = annotationText
  @Input() @DefaultValue(size) size: IAltNgCheckboxProps['size'] = size
  @Input() @DefaultValue(disabled) disabled: IAltNgCheckboxProps['disabled'] = disabled
  @Input() @DefaultValue(required) required: IAltNgCheckboxProps['required'] = required
  @Input() @DefaultValue(indeterminate) indeterminate: IAltNgCheckboxProps['indeterminate'] = indeterminate
  @Input() @DefaultValue(errors) errors: IAltNgCheckboxProps['errors'] = errors
  @Input() @DefaultValue(alignment) alignment: IAltNgCheckboxProps['alignment'] = alignment
  @Input() @DefaultValue(labelTooltipPlacement) labelTooltipPlacement: IAltNgCheckboxProps['labelTooltipPlacement'] = labelTooltipPlacement

  @ContentChild('checkboxLabel') checkboxLabelRef: TemplateRef<unknown> | undefined
  @ContentChild('checkboxAnnotation') checkboxAnnotationRef: TemplateRef<unknown> | undefined
  @ContentChild('tooltipContent') tooltipContentRef: TemplateRef<unknown> | undefined

  modelValue = signal<TAltNgCheckboxModel>(false)

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
