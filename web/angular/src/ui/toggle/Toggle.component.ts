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
  type IYNgToggleProps,
  type ToggleCheckedEvent,
  type TYNgToggleModel,
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
  selector: 'YToggle',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, NgTemplateOutlet],
  template: `
    <y-core-toggle
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
    </y-core-toggle>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YToggle),
      multi: true,
    },
  ],
})

export class YToggle extends ControlValueAccessorBase<TYNgToggleModel> implements IYNgToggleProps {
  @Input() @DefaultValue(disabled) disabled: IYNgToggleProps['disabled'] = disabled
  @Input() @DefaultValue(labelText) labelText: IYNgToggleProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgToggleProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(annotationText) annotationText: IYNgToggleProps['annotationText'] = annotationText
  @Input() @DefaultValue(labelOverflowDebounce) labelOverflowDebounce: IYNgToggleProps['labelOverflowDebounce'] = labelOverflowDebounce
  @Input() @DefaultValue(alignment) alignment: IYNgToggleProps['alignment'] = alignment
  @Input() @DefaultValue(size) size: IYNgToggleProps['size'] = size

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
