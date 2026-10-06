import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/tip'
import {
  createNgTipProps,
  type IYNgTipProps,
} from '~ng/ui/tip/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils/helpers'

const { trigger, isOpen, offset, padding, placement, strategy, type, transition, disabled, inline } = createNgTipProps()

@Component({
  selector: 'YTip',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-tip
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
    </y-core-tip>
  `,
})

export class YTip implements IYNgTipProps {
  @Input() @DefaultValue(trigger) trigger: IYNgTipProps['trigger'] = trigger
  @Input() @DefaultValue(isOpen) isOpen: IYNgTipProps['isOpen'] = isOpen
  @Input() @DefaultValue(offset) offset: IYNgTipProps['offset'] = offset
  @Input() @DefaultValue(padding) padding: IYNgTipProps['padding'] = padding
  @Input() @DefaultValue(placement) placement: IYNgTipProps['placement'] = placement
  @Input() @DefaultValue(strategy) strategy: IYNgTipProps['strategy'] = strategy
  @Input() @DefaultValue(type) type: IYNgTipProps['type'] = type
  @Input() @DefaultValue(transition) transition: IYNgTipProps['transition'] = transition
  @Input() @DefaultValue(disabled) disabled: IYNgTipProps['disabled'] = disabled
  @Input() @DefaultValue(inline) inline: IYNgTipProps['inline'] = inline

  cleanupHTML = cleanupInnerHTML
}
