import type { ElementRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core'

import '~core/ui/stepper'
import type { AltCoreStepper } from '~core/ui/stepper'
import type { StepperChangeEvent } from '~core/ui/stepper/models/types'
import type { TAltCoreStepName } from '~core/ui/step/models/types'
import {
  createNgStepperProps,
  type IAltNgStepperProps,
} from '~ng/ui/stepper/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { value, orientation, headerNav, accessibleName } = createNgStepperProps()

/**
 * Holds `AltStep` elements. Works with `[(value)]`; `next()` and `previous()` open the neighbouring enabled step.
 */
@Component({
  selector: 'AltStepper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  template: `
    <alt-core-stepper
      #coreStepper
      [value]="value"
      [orientation]="orientation"
      [headerNav]="headerNav"
      [accessibleName]="accessibleName"
      (change)="handleChange($event)"
    >
      <ng-content />
    </alt-core-stepper>
  `,
})
export class AltStepper implements IAltNgStepperProps {
  @Input() @DefaultValue(value) value: IAltNgStepperProps['value'] = value
  @Input() @DefaultValue(orientation) orientation: IAltNgStepperProps['orientation'] = orientation
  @Input() @DefaultValue(headerNav) headerNav: IAltNgStepperProps['headerNav'] = headerNav
  @Input() @DefaultValue(accessibleName) accessibleName: IAltNgStepperProps['accessibleName'] = accessibleName

  @Output() valueChange = new EventEmitter<TAltCoreStepName>()

  @ViewChild('coreStepper') coreStepper?: ElementRef<AltCoreStepper>

  /** Opens the next step that is not disabled */
  next() {
    this.coreStepper?.nativeElement.next()
  }

  /** Opens the previous step that is not disabled */
  previous() {
    this.coreStepper?.nativeElement.previous()
  }

  handleChange(event: Event) {
    // The output replaces the native event, which would otherwise reach a (change) listener on the host as well
    event.stopPropagation()

    const { value: stepValue } = (event as StepperChangeEvent).detail

    this.value = stepValue
    this.valueChange.emit(stepValue)
  }
}
