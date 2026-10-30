import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/popover'
import {
  createNgPopoverProps,
  type IAltNgPopoverProps,
  type TAltPopoverEmits,
} from '~ng/ui/popover/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils/helpers'

const { trigger, isOpen, offset, padding, placement, strategy, type, transition, submitText, cancelText, disabled, inline } = createNgPopoverProps()

@Component({
  selector: 'AltPopover',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-popover
      [trigger]="trigger"
      [isOpen]="isOpen"
      [offset]="offset"
      [padding]="padding"
      [placement]="placement"
      [strategy]="strategy"
      [type]="type"
      [disabled]="disabled"
      [inline]="inline"
      [transition]="transition"
      [cancelText]="cancelText"
      [submitText]="submitText"
      (cancel)="handleCancel()"
      (submit)="handleSubmit()"
    >
      <div hidden #activator>
        <ng-content select="[popover-activator]" />
      </div>

      @if (cleanupHTML(activator)) {
        <div
          slot="activator"
          [innerHTML]="cleanupHTML(activator)"
        ></div>
      }

      <div hidden #content>
        <ng-content select="[popover-content]" />
      </div>

      @if (cleanupHTML(content)) {
        <div
          slot="content"
          [innerHTML]="cleanupHTML(content)"
        ></div>
      }

      <div hidden #actions>
        <ng-content select="[popover-actions]" />
      </div>

      @if (cleanupHTML(actions)) {
        <div
          slot="actions"
          [innerHTML]="cleanupHTML(actions)"
        ></div>
      }
    </alt-core-popover>
  `,
})

export class AltPopover implements IAltNgPopoverProps {
  @Input() @DefaultValue(trigger) trigger: IAltNgPopoverProps['trigger'] = trigger
  @Input() @DefaultValue(isOpen) isOpen: IAltNgPopoverProps['isOpen'] = isOpen
  @Input() @DefaultValue(offset) offset: IAltNgPopoverProps['offset'] = offset
  @Input() @DefaultValue(padding) padding: IAltNgPopoverProps['padding'] = padding
  @Input() @DefaultValue(placement) placement: IAltNgPopoverProps['placement'] = placement
  @Input() @DefaultValue(strategy) strategy: IAltNgPopoverProps['strategy'] = strategy
  @Input() @DefaultValue(type) type: IAltNgPopoverProps['type'] = type
  @Input() @DefaultValue(transition) transition: IAltNgPopoverProps['transition'] = transition
  @Input() @DefaultValue(submitText) submitText: IAltNgPopoverProps['submitText'] = submitText
  @Input() @DefaultValue(cancelText) cancelText: IAltNgPopoverProps['cancelText'] = cancelText
  @Input() @DefaultValue(disabled) disabled: IAltNgPopoverProps['disabled'] = disabled
  @Input() @DefaultValue(inline) inline: IAltNgPopoverProps['inline'] = inline

  @Output() cancel = new EventEmitter<TAltPopoverEmits['onCancel']>()
  handleCancel() {
    this.cancel.emit()
  }

  @Output() submit = new EventEmitter<TAltPopoverEmits['onSubmit']>()
  handleSubmit() {
    this.submit.emit()
  }

  cleanupHTML = cleanupInnerHTML
}
