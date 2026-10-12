import type { AfterViewInit, ElementRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild, signal } from '@angular/core'

import '~core/ui/tooltip'

import { createNgTooltipProps, type IYNgTooltipProps } from '~ng/ui/tooltip/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { text, disabled, placement, type } = createNgTooltipProps()

@Component({
  selector: 'YTooltip',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-tooltip [text]="text" [disabled]="isTooltipDisabled" [placement]="placement" [type]="type">
      <div slot="activator">
        <ng-content select="[activator]" />
      </div>

      <div #content>
        <ng-content select="[content]" />
      </div>

      @if (cleanupHTML(content)) {
        <div slot="content" [innerHTML]="cleanupHTML(content)"></div>
      }
    </y-core-tooltip>
  `,
})
export class YTooltip implements IYNgTooltipProps, AfterViewInit {
  @Input({ required: false }) @DefaultValue(text) text: IYNgTooltipProps['text'] = text
  @Input({ required: false }) @DefaultValue(disabled) disabled: IYNgTooltipProps['disabled'] = disabled
  @Input({ required: false }) @DefaultValue(placement) placement: IYNgTooltipProps['placement'] = placement
  @Input({ required: false }) @DefaultValue(type) type: IYNgTooltipProps['type'] = type

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
