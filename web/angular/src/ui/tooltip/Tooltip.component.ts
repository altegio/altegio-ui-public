import type { AfterViewInit, ElementRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild, signal } from '@angular/core'

import '~core/ui/tooltip'

import { createNgTooltipProps, type IAltNgTooltipProps } from '~ng/ui/tooltip/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { text, disabled, placement, type } = createNgTooltipProps()

@Component({
  selector: 'AltTooltip',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-tooltip [text]="text" [disabled]="isTooltipDisabled" [placement]="placement" [type]="type">
      <div slot="activator">
        <ng-content select="[activator]" />
      </div>

      <div #content>
        <ng-content select="[content]" />
      </div>

      @if (cleanupHTML(content)) {
        <div slot="content" [innerHTML]="cleanupHTML(content)"></div>
      }
    </alt-core-tooltip>
  `,
})
export class AltTooltip implements IAltNgTooltipProps, AfterViewInit {
  @Input({ required: false }) @DefaultValue(text) text: IAltNgTooltipProps['text'] = text
  @Input({ required: false }) @DefaultValue(disabled) disabled: IAltNgTooltipProps['disabled'] = disabled
  @Input({ required: false }) @DefaultValue(placement) placement: IAltNgTooltipProps['placement'] = placement
  @Input({ required: false }) @DefaultValue(type) type: IAltNgTooltipProps['type'] = type

  @ViewChild('content') contentRef!: ElementRef<HTMLElement>
  protected cleanupHTML = cleanupInnerHTML

  protected hasContent = signal(false)

  ngAfterViewInit() {
    this.hasContent.set(!!this.cleanupHTML(this.contentRef.nativeElement))
  }

  get isTooltipDisabled(): boolean {
    return this.disabled || !this.hasContent() && !this.text
  }
}
