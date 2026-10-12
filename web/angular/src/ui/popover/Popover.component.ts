import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/popover'
import {
  createNgPopoverProps,
  type IYNgPopoverProps,
  type TYPopoverEmits,
} from '~ng/ui/popover/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils/helpers'

const { trigger, isOpen, offset, padding, placement, strategy, type, transition, submitText, cancelText, disabled, inline } = createNgPopoverProps()

@Component({
  selector: 'YPopover',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-popover
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
    </y-core-popover>
  `,
})

export class YPopover implements IYNgPopoverProps {
  @Input() @DefaultValue(trigger) trigger: IYNgPopoverProps['trigger'] = trigger
  @Input() @DefaultValue(isOpen) isOpen: IYNgPopoverProps['isOpen'] = isOpen
  @Input() @DefaultValue(offset) offset: IYNgPopoverProps['offset'] = offset
  @Input() @DefaultValue(padding) padding: IYNgPopoverProps['padding'] = padding
  @Input() @DefaultValue(placement) placement: IYNgPopoverProps['placement'] = placement
  @Input() @DefaultValue(strategy) strategy: IYNgPopoverProps['strategy'] = strategy
  @Input() @DefaultValue(type) type: IYNgPopoverProps['type'] = type
  @Input() @DefaultValue(transition) transition: IYNgPopoverProps['transition'] = transition
  @Input() @DefaultValue(submitText) submitText: IYNgPopoverProps['submitText'] = submitText
  @Input() @DefaultValue(cancelText) cancelText: IYNgPopoverProps['cancelText'] = cancelText
  @Input() @DefaultValue(disabled) disabled: IYNgPopoverProps['disabled'] = disabled
  @Input() @DefaultValue(inline) inline: IYNgPopoverProps['inline'] = inline

  @Output() cancel = new EventEmitter<TYPopoverEmits['onCancel']>()
  handleCancel() {
    this.cancel.emit()
  }

  @Output() submit = new EventEmitter<TYPopoverEmits['onSubmit']>()
  handleSubmit() {
    this.submit.emit()
  }

  cleanupHTML = cleanupInnerHTML
}
