import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/radioButtonGroup'
import {
  createNgRadioButtonGroupProps,
  type IAltNgRadioButtonGroupProps,
  type RadioButtonGroupChangeEvent,
  type TAltNgRadioButtonGroupEvents,
} from '~ng/ui/radioButtonGroup/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { value, size, direction, alignment, labelText, labelTooltipText, labelDebounce, labelTooltipActive } = createNgRadioButtonGroupProps()

@Component({
  selector: 'AltRadioButtonGroup',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-radio-button-group
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
    </alt-core-radio-button-group>
  `,
})
export class AltRadioButtonGroup implements IAltNgRadioButtonGroupProps {
  @Input() @DefaultValue(value) value: IAltNgRadioButtonGroupProps['value'] = value
  @Input() @DefaultValue(size) size: IAltNgRadioButtonGroupProps['size'] = size
  @Input() @DefaultValue(direction) direction: IAltNgRadioButtonGroupProps['direction'] = direction
  @Input() @DefaultValue(alignment) alignment: IAltNgRadioButtonGroupProps['alignment'] = alignment
  @Input() @DefaultValue(labelText) labelText: IAltNgRadioButtonGroupProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IAltNgRadioButtonGroupProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IAltNgRadioButtonGroupProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(labelTooltipActive) labelTooltipActive: IAltNgRadioButtonGroupProps['labelTooltipActive'] = labelTooltipActive

  @Output() changeEvent = new EventEmitter<TAltNgRadioButtonGroupEvents['value']>()
  handleChangeEvent(event: Event) {
    const changeEvent = event as RadioButtonGroupChangeEvent
    this.changeEvent.emit(changeEvent.detail.value)
  }
}
