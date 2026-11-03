import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/step'
import {
  createNgStepProps,
  type IAltNgStepProps,
} from '~ng/ui/step/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { name, title, caption, done, error, disabled } = createNgStepProps()

/**
 * One step of `AltStepper`; projected content shows while the step is current.
 */
@Component({
  selector: 'AltStep',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: contents;' },
  template: `
    <alt-core-step
      [name]="name"
      [title]="title"
      [caption]="caption"
      [done]="done"
      [error]="error"
      [disabled]="disabled"
    >
      <ng-content />
    </alt-core-step>
  `,
})
export class AltStep implements IAltNgStepProps {
  @Input() @DefaultValue(name) name: IAltNgStepProps['name'] = name
  @Input() @DefaultValue(title) title: IAltNgStepProps['title'] = title
  @Input() @DefaultValue(caption) caption: IAltNgStepProps['caption'] = caption
  @Input() @DefaultValue(done) done: IAltNgStepProps['done'] = done
  @Input() @DefaultValue(error) error: IAltNgStepProps['error'] = error
  @Input() @DefaultValue(disabled) disabled: IAltNgStepProps['disabled'] = disabled
}
