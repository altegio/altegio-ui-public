import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ContentChild,
  forwardRef,
  type TemplateRef,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import '~core/ui/toggle'
import {
  createNgToggleProps,
  type IAltNgToggleProps,
  type ToggleCheckedEvent,
  type TAltNgToggleModel,
} from '~ng/ui/toggle/models/types'
import { DEFAULT_CHECKED_VALUE } from '~core/ui/simpleToggle/models/types'

import { DefaultValue } from '~ng/utils/default-value.decorator'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'

const {
  disabled,
  labelText,
  labelTooltipText,
  annotationText,
  labelOverflowDebounce,
  alignment,
  size,
} = createNgToggleProps()

@Component({
  selector: 'AltToggle',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, NgTemplateOutlet],
  template: `
    <alt-core-toggle
      (checked)="handleCheckedEvent($event)"
      [checked]="isChecked"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelOverflowDebounce]="labelOverflowDebounce"
      [annotationText]="annotationText"
      [disabled]="disabled"
      [alignment]="alignment"
      [size]="size"
    >
      @if (annotationRef) {
        <div slot="annotation">
          <ng-container *ngTemplateOutlet="annotationRef" />
        </div>
      }

      @if (tooltipContentRef) {
        <div slot="tooltip-content">
          <ng-container *ngTemplateOutlet="tooltipContentRef" />
        </div>
      }
    </alt-core-toggle>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltToggle),
      multi: true,
    },
  ],
})

export class AltToggle extends ControlValueAccessorBase<TAltNgToggleModel> implements IAltNgToggleProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgToggleProps['disabled'] = disabled
  @Input() @DefaultValue(labelText) labelText: IAltNgToggleProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgToggleProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(annotationText) annotationText: IAltNgToggleProps['annotationText'] = annotationText
  @Input() @DefaultValue(labelOverflowDebounce) labelOverflowDebounce: IAltNgToggleProps['labelOverflowDebounce'] = labelOverflowDebounce
  @Input() @DefaultValue(alignment) alignment: IAltNgToggleProps['alignment'] = alignment
  @Input() @DefaultValue(size) size: IAltNgToggleProps['size'] = size

  @ContentChild('annotation') annotationRef: TemplateRef<unknown> | undefined
  @ContentChild('tooltipContent') tooltipContentRef: TemplateRef<unknown> | undefined

  isChecked: boolean = DEFAULT_CHECKED_VALUE

  writeValue(value: boolean) {
    this.isChecked = value
  }

  handleCheckedEvent(event: Event) {
    event.stopPropagation()

    const checkedEvent = event as ToggleCheckedEvent
    const checked = checkedEvent.detail.checked

    this.isChecked = checked
    this.onChange(checked)
    this.onTouched()
  }
}
