import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/radioButtonGroup'
import {
  createNgRadioButtonGroupProps,
  type IYNgRadioButtonGroupProps,
  type RadioButtonGroupChangeEvent,
  type TYNgRadioButtonGroupEvents,
} from '~ng/ui/radioButtonGroup/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { value, size, direction, alignment, labelText, labelTooltipText, labelDebounce, labelTooltipActive } = createNgRadioButtonGroupProps()

@Component({
  selector: 'YRadioButtonGroup',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-radio-button-group
      [value]="value"
      [size]="size"
      [direction]="direction"
      [alignment]="alignment"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [labelTooltipActive]="labelTooltipActive"
      (change)="handleChangeEvent($event)"
    >
      <ng-content/>
    </y-core-radio-button-group>
  `,
})
export class YRadioButtonGroup implements IYNgRadioButtonGroupProps {
  @Input() @DefaultValue(value) value: IYNgRadioButtonGroupProps['value'] = value
  @Input() @DefaultValue(size) size: IYNgRadioButtonGroupProps['size'] = size
  @Input() @DefaultValue(direction) direction: IYNgRadioButtonGroupProps['direction'] = direction
  @Input() @DefaultValue(alignment) alignment: IYNgRadioButtonGroupProps['alignment'] = alignment
  @Input() @DefaultValue(labelText) labelText: IYNgRadioButtonGroupProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgRadioButtonGroupProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgRadioButtonGroupProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(labelTooltipActive) labelTooltipActive: IYNgRadioButtonGroupProps['labelTooltipActive'] = labelTooltipActive

  @Output() changeEvent = new EventEmitter<TYNgRadioButtonGroupEvents['value']>()
  handleChangeEvent(event: Event) {
    const changeEvent = event as RadioButtonGroupChangeEvent
    this.changeEvent.emit(changeEvent.detail.value)
  }
}
