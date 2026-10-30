import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/tip'
import {
  createNgTipProps,
  type IAltNgTipProps,
} from '~ng/ui/tip/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils/helpers'

const { trigger, isOpen, offset, padding, placement, strategy, type, transition, disabled, inline } = createNgTipProps()

@Component({
  selector: 'AltTip',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-tip
      [trigger]="trigger"
      [isOpen]="isOpen"
      [offset]="offset"
      [padding]="padding"
      [placement]="placement"
      [strategy]="strategy"
      [type]="type"
      [transition]="transition"
      [disabled]="disabled"
      [inline]="inline"
    >
      <div hidden #activator>
        <ng-content select="[tip-activator]" />
      </div>

      @if (cleanupHTML(activator)) {
        <div
          slot="activator"
          [innerHTML]="cleanupHTML(activator)"
        ></div>
      }

      <div hidden #content>
        <ng-content select="[tip-content]" />
      </div>

      @if (cleanupHTML(content)) {
        <div
          slot="content"
          [innerHTML]="cleanupHTML(content)"
        ></div>
      }
    </alt-core-tip>
  `,
})

export class AltTip implements IAltNgTipProps {
  @Input() @DefaultValue(trigger) trigger: IAltNgTipProps['trigger'] = trigger
  @Input() @DefaultValue(isOpen) isOpen: IAltNgTipProps['isOpen'] = isOpen
  @Input() @DefaultValue(offset) offset: IAltNgTipProps['offset'] = offset
  @Input() @DefaultValue(padding) padding: IAltNgTipProps['padding'] = padding
  @Input() @DefaultValue(placement) placement: IAltNgTipProps['placement'] = placement
  @Input() @DefaultValue(strategy) strategy: IAltNgTipProps['strategy'] = strategy
  @Input() @DefaultValue(type) type: IAltNgTipProps['type'] = type
  @Input() @DefaultValue(transition) transition: IAltNgTipProps['transition'] = transition
  @Input() @DefaultValue(disabled) disabled: IAltNgTipProps['disabled'] = disabled
  @Input() @DefaultValue(inline) inline: IAltNgTipProps['inline'] = inline

  cleanupHTML = cleanupInnerHTML
}
